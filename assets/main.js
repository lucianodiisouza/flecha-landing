// Flecha landing: scales the app drawing, runs the command bar demo and the copy button.

/* ---- scale the window drawing to the column ---------------------------- */

const frame = document.querySelector('.mock-frame');
const canvas = document.querySelector('.mock-canvas');
const CANVAS_W = 1200;
const CANVAS_H = 712;

function fitDrawing() {
  const s = Math.min(1, frame.clientWidth / CANVAS_W);
  canvas.style.setProperty('--s', s);
  frame.style.height = `${Math.ceil(CANVAS_H * s)}px`;
}
if (frame && canvas) {
  new ResizeObserver(fitDrawing).observe(frame);
  fitDrawing();
}

/* ---- command bar demo -------------------------------------------------- */
// Same rules as src/renderer/devCommands.ts in the app.

const SEARCHES = {
  npm: { name: 'npm', url: (q) => (/^\S+$/.test(q) ? `https://www.npmjs.com/package/${q}` : `https://www.npmjs.com/search?q=${encodeURIComponent(q)}`) },
  mdn: { name: 'MDN', url: (q) => `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(q)}` },
  caniuse: { name: 'Can I use', url: (q) => `https://caniuse.com/?search=${encodeURIComponent(q)}` },
  so: { name: 'Stack Overflow', url: (q) => `https://stackoverflow.com/search?q=${encodeURIComponent(q)}` },
};

function devSuggestions(query) {
  const q = query.trim();
  const [keyword, ...rest] = q.split(/\s+/);
  const arg = rest.join(' ');

  if (keyword === 'gh' && arg) return [github(arg)];
  const search = SEARCHES[keyword?.toLowerCase()];
  if (search && arg) return [{ label: arg, sub: `Open in ${search.name}`, url: search.url(arg) }];

  const jwt = decodeJwt(q);
  if (jwt) return [jwt];
  const time = decodeTimestamp(q);
  if (time) return [time];
  return [];
}

function github(arg) {
  if (/^[\w.-]+\/[\w.-]+$/.test(arg)) return { label: arg, sub: 'Open on GitHub', url: `https://github.com/${arg}` };
  if (/^#?\d+$/.test(arg)) {
    return { label: `#${arg.replace('#', '')}`, sub: 'Opens in the repo of your current tab', url: 'https://github.com/lucianodiisouza/flecha-browser/pulls' };
  }
  return { label: arg, sub: 'Search GitHub', url: `https://github.com/search?q=${encodeURIComponent(arg)}` };
}

function decodeJwt(text) {
  const parts = text.split('.');
  if (parts.length !== 3 || !/^eyJ/.test(parts[0])) return undefined;
  try {
    const decode = (part) => JSON.parse(atob(part.replace(/-/g, '+').replace(/_/g, '/')));
    const header = decode(parts[0]);
    const payload = decode(parts[1]);
    const facts = [header.alg && `alg ${header.alg}`, payload.sub && `sub ${payload.sub}`, expiry(payload.exp)].filter(Boolean);
    return { label: `JWT · ${facts.join(' · ') || 'decoded'}`, sub: 'Copy decoded JSON', copy: JSON.stringify({ header, payload }, null, 2) };
  } catch {
    return undefined;
  }
}

function expiry(exp) {
  if (typeof exp !== 'number') return undefined;
  const ms = exp * 1000 - Date.now();
  return ms < 0 ? `expired ${relative(-ms)} ago` : `expires in ${relative(ms)}`;
}

function decodeTimestamp(text) {
  if (!/^\d{10}(\d{3})?$/.test(text)) return undefined;
  const date = new Date(text.length === 10 ? Number(text) * 1000 : Number(text));
  const ms = date.getTime() - Date.now();
  return {
    label: `${date.toLocaleString()} · ${ms < 0 ? `${relative(-ms)} ago` : `in ${relative(ms)}`}`,
    sub: 'Copy ISO date',
    copy: date.toISOString(),
  };
}

function relative(ms) {
  const units = [[86_400_000, 'd'], [3_600_000, 'h'], [60_000, 'm']];
  for (const [size, unit] of units) if (ms >= size) return `${Math.floor(ms / size)}${unit}`;
  return `${Math.floor(ms / 1000)}s`;
}

function sampleJwt() {
  const b64 = (o) => btoa(JSON.stringify(o)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  const exp = Math.floor(Date.now() / 1000) + 2 * 3600;
  return `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ sub: 'user_42', role: 'admin', exp })}.c2lnbmF0dXJl`;
}

const PT = document.documentElement.lang === 'pt-BR';
const HINT = PT ? 'Tente gh, npm, mdn, caniuse ou so, ou cole um JWT' : 'Try gh, npm, mdn, caniuse or so, or paste a JWT';
const input = document.getElementById('try-input');
const results = document.getElementById('try-results');
const detail = document.getElementById('try-detail');
const chips = document.getElementById('try-chips');

function render() {
  const q = input.value;
  const items = devSuggestions(q);
  results.replaceChildren();
  detail.hidden = true;

  if (!items.length) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = q.trim() ? `Search the web for “${q.trim()}”` : HINT;
    results.append(li);
    return;
  }
  if (q.trim()) items.push({ label: `Search the web for “${q.trim()}”`, sub: 'Your search engine', web: true });
  for (const item of items) {
    const li = document.createElement('li');
    li.className = item.web ? 'web' : 'selected';
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = item.label;
    const sub = document.createElement('span');
    sub.className = 'sub';
    sub.textContent = item.sub;
    if (item.url) {
      const a = document.createElement('a');
      a.href = item.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.append(label, sub);
      li.append(a);
    } else {
      li.append(label, sub);
    }
    results.append(li);
    if (item.copy) {
      detail.textContent = item.copy;
      detail.hidden = false;
    }
  }
}

if (input) {
  input.addEventListener('input', () => {
    for (const b of chips.querySelectorAll('button')) b.removeAttribute('aria-pressed');
    render();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const link = results.querySelector('a');
    if (link) link.click();
  });
  chips.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    input.value = button.dataset.q === 'jwt' ? sampleJwt() : button.dataset.q;
    for (const b of chips.querySelectorAll('button')) b.toggleAttribute('aria-pressed', b === button);
    button.setAttribute('aria-pressed', 'true');
    render();
  });
  render();
}

/* ---- copy the build commands ------------------------------------------ */

const copyButton = document.getElementById('copy-build');
copyButton?.addEventListener('click', async () => {
  const label = copyButton.dataset.label || (copyButton.dataset.label = copyButton.textContent);
  const text = document.getElementById('build-cmds').textContent;
  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = copyButton.dataset.done || 'Copied';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('build-cmds'));
    getSelection().removeAllRanges();
    getSelection().addRange(range);
    copyButton.textContent = copyButton.dataset.selected || 'Selected';
  }
  setTimeout(() => (copyButton.textContent = label), 1600);
});

/* ---- motion: hero command bar, environments --------------------------- */

const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

const ARROW = '<svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
const favicon = (letter, color) => `<i class="fi" style="--c:${color}">${letter}</i>`;
const HERO_QUERIES = [
  { q: 'gh 483', rows: [[ARROW, 'oprimo/api#483', 'Open pull request or issue'], [favicon('G', '#1d1d1f'), 'Fix checkout redirect #482', 'Switch to tab'], [favicon('G', '#1d1d1f'), 'oprimo/api · Pull requests', 'History']] },
  { q: 'npm zod', rows: [[ARROW, 'zod', 'Open in npm'], [favicon('n', '#cb3837'), 'zod · npm', 'Switch to tab'], [favicon('n', '#cb3837'), 'zod-to-json-schema · npm', 'History']] },
  { q: 'caniuse :has()', rows: [[ARROW, ':has()', 'Open in Can I use'], [favicon('M', '#83d0f2'), ':has() · CSS · MDN', 'History']] },
  { q: '1761140000', rows: () => [[ARROW, decodeTimestamp('1761140000').label, 'Copy ISO date']] },
];

const heroInput = document.querySelector('.m-input');
const heroResults = document.querySelector('.m-results');

function heroRows(rows) {
  heroResults.innerHTML = rows
    .map(([icon, label, sub], i) => `<li class="${i ? '' : 'selected'}">${icon}<span class="label">${label}</span><span class="sub">${sub}</span></li>`)
    .join('');
}

async function typeHero(text) {
  const caret = heroInput.querySelector('.caret');
  for (let i = 0; i <= text.length; i++) {
    heroInput.firstChild.textContent = text.slice(0, i);
    await new Promise((r) => setTimeout(r, 55 + Math.random() * 45));
  }
  heroInput.append(caret);
}

async function cycleHero() {
  let index = 0;
  while (true) {
    await new Promise((r) => setTimeout(r, 3600));
    index = (index + 1) % HERO_QUERIES.length;
    const { q, rows } = HERO_QUERIES[index];
    heroResults.classList.add('swapping');
    await typeHero(q);
    heroRows(typeof rows === 'function' ? rows() : rows);
    heroResults.classList.remove('swapping');
  }
}
if (!calm && heroInput && heroResults) cycleHero();

const envRows = [...document.querySelectorAll('.env-row')];
if (!calm && envRows.length) {
  let current = envRows.findIndex((row) => row.classList.contains('on'));
  setInterval(() => {
    envRows[current].classList.remove('on');
    current = (current + 1) % envRows.length;
    envRows[current].classList.add('on');
  }, 2400);
}

/* ---- reveal on scroll ---------------------------------------------------- */
// Elements start visible; the hidden starting state only applies once this script has run,
// and anything already on screen is shown at once.

const REVEAL = [
  '.section-head', '.try-stage', '.tile', '.basics-list li', '.stack .layer', '.arch',
  '.ledger', '.privacy-points li', '.keys li', '.migrate', '.shell', '.source-copy', '.facts li', '.dl-card',
];
if (!calm && 'IntersectionObserver' in window) {
  const items = document.querySelectorAll(REVEAL.join(','));
  const seen = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        el.classList.add('in');
        // Once in place, hand the element back to its own hover transitions.
        el.addEventListener('transitionend', function done(event) {
          if (event.target !== el) return;
          el.removeEventListener('transitionend', done);
          el.classList.remove('reveal', 'in');
          el.style.removeProperty('--delay');
        });
        seen.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  for (const item of items) {
    // Siblings of the same kind come in one after another.
    const siblings = [...item.parentElement.children].filter((el) => el.matches(REVEAL.join(',')));
    item.style.setProperty('--delay', `${Math.min(siblings.indexOf(item), 6) * 60}ms`);
    item.classList.add('reveal');
    seen.observe(item);
  }
}

/* ---- download: pick the build for this computer -------------------------- */
// Chromium browsers report the CPU through userAgentData: arm gets Flecha.dmg, x86 gets
// Flecha-x64.dmg. Safari and Firefox always look like Intel, so a Mac there gets the
// Apple silicon build. Anything that isn't a Mac goes to the download section instead.

const DOWNLOADS = { arm: 'https://dl.flecha.dev/Flecha.dmg', x64: 'https://dl.flecha.dev/Flecha-x64.dmg' };

async function detectSystem() {
  const data = navigator.userAgentData;
  if (data?.getHighEntropyValues) {
    try {
      const { architecture, platform } = await data.getHighEntropyValues(['architecture']);
      if (platform !== 'macOS') return 'other';
      return architecture === 'x86' ? 'x64' : 'arm';
    } catch {
      // fall through to the user agent string
    }
  }
  // iPads ask for desktop pages as "Macintosh"; touch gives them away.
  const mac = /Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints < 2;
  return mac ? 'arm' : 'other';
}

detectSystem().then((system) => {
  if (system === 'other') {
    for (const link of document.querySelectorAll('[data-download]')) link.href = '#download';
    for (const text of document.querySelectorAll('[data-download-text]')) text.textContent = PT ? 'Ver downloads' : 'See downloads';
    for (const label of document.querySelectorAll('[data-download-label]')) label.textContent = 'macOS';
    return;
  }
  document.querySelector(`.dl-card[data-arch="${system}"]`)?.classList.add('is-detected');
  document.querySelector(`.dl-card[data-arch="${system}"] .dl-detected`)?.removeAttribute('hidden');
  for (const link of document.querySelectorAll('[data-download]')) link.href = DOWNLOADS[system];
  for (const label of document.querySelectorAll('[data-download-label]')) label.textContent = system === 'x64' ? 'Intel' : 'Apple silicon';
});
