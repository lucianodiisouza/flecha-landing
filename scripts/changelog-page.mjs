// Builds the "What's new" / "Novidades" pages from changelog.mjs. They take the privacy pages as
// their frame (head, nav, footer), so they stay in step with the rest of the site, and swap in
// their own title, links and <main>. Each release is a section with an anchor (/changelog/#0.1.1).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { CHANGELOG, CHANGELOG_PATHS } from './changelog.mjs';

const COPY = {
  en: {
    frame: 'privacy/index.html',
    framePath: '/privacy/',
    otherFramePath: '/pt-br/privacidade/',
    title: 'What’s new',
    description: 'What changes in every Flecha release, without “general improvements and bug fixes”.',
    eyebrow: 'Changelog',
    intro: 'What changes in every Flecha release, written for people who use it. Flecha updates itself; to check by hand, choose Flecha › Check for Updates…',
    archive: 'Every release, with its downloads, is also on <a href="https://github.com/lucianodiisouza/flecha-browser/releases">GitHub Releases</a>.',
    latest: 'Latest',
    navLabel: 'Project',
    nav: [['/changelog/', 'What’s new'], ['/docs/', 'Docs']],
    lang: 'en-US',
    dateLocale: 'en-US',
  },
  'pt-br': {
    frame: 'pt-br/privacidade/index.html',
    framePath: '/pt-br/privacidade/',
    otherFramePath: '/privacy/',
    title: 'Novidades',
    description: 'O que muda em cada versão do Flecha, sem “melhorias gerais e correções de bugs”.',
    eyebrow: 'Changelog',
    intro: 'O que muda em cada versão do Flecha, escrito para quem usa. O Flecha se atualiza sozinho; para verificar na mão, use Flecha › Check for Updates…',
    archive: 'Todas as versões, com os downloads, também ficam no <a href="https://github.com/lucianodiisouza/flecha-browser/releases">GitHub Releases</a>.',
    latest: 'Mais recente',
    navLabel: 'Projeto',
    nav: [['/pt-br/novidades/', 'Novidades'], ['/docs/pt-br/', 'Documentação']],
    lang: 'pt-BR',
    dateLocale: 'pt-BR',
  },
};

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** Plain text, with `code` between backticks. */
const inline = (s) => escape(s).replace(/`([^`]+)`/g, '<code>$1</code>');

function formatDate(locale, iso) {
  return new Intl.DateTimeFormat(COPY[locale].dateLocale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

/** Newest first, both languages filled in, real dates: a mistake here fails the build. */
export function checkChangelog() {
  const key = (v) => v.split('.').map((n) => n.padStart(6, '0')).join('.');
  CHANGELOG.forEach((entry, i) => {
    for (const locale of Object.keys(COPY)) {
      const text = entry[locale];
      if (!text?.summary || !text.items?.length) throw new Error(`changelog: ${entry.version} has no ${locale} text`);
    }
    if (Number.isNaN(Date.parse(entry.date))) throw new Error(`changelog: ${entry.version} has a bad date, ${entry.date}`);
    const next = CHANGELOG[i + 1];
    if (next && key(next.version) >= key(entry.version)) throw new Error(`changelog: ${entry.version} comes before ${next.version}; newest first`);
  });
}

export function changelogPage(root, locale) {
  const copy = COPY[locale];
  const other = locale === 'en' ? 'pt-br' : 'en';
  const path = CHANGELOG_PATHS[locale];
  const url = (p) => `https://flecha.dev${p}`;
  let html = readFileSync(join(root, copy.frame), 'utf8');

  const sections = CHANGELOG.map((entry, i) => {
    const text = entry[locale];
    const id = entry.version;
    return `        <section class="release" id="${id}">
          <h2>
            <a href="#${id}">${escape(entry.version)}</a>
            <time datetime="${entry.date}">${formatDate(locale, entry.date)}</time>${i === 0 ? `\n            <span class="release-tag">${copy.latest}</span>` : ''}
          </h2>
          <p class="release-summary">${inline(text.summary)}</p>
          <ul>
${text.items.map((item) => `            <li>${inline(item)}</li>`).join('\n')}
          </ul>
        </section>`;
  }).join('\n');

  const main = `<main class="legal-page changelog-page">
    <div class="inner legal-grid">
      <header class="legal-head">
        <p class="eyebrow">${copy.eyebrow}</p>
        <h1>${copy.title}</h1>
        <p class="changelog-intro">${escape(copy.intro)}</p>
      </header>
      <article class="legal changelog">
${sections}
        <p class="changelog-archive">${copy.archive}</p>
      </article>
    </div>
  </main>`;

  const swap = (from, to) => {
    const found = from instanceof RegExp ? from.test(html) : html.includes(from);
    if (!found) throw new Error(`changelog: ${copy.frame} has no ${from}`);
    html = html.replace(from, to);
  };
  swap(/<title>[^<]*<\/title>/, `<title>${copy.title} · Flecha</title>`);
  swap(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escape(copy.description)}">`);
  swap(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url(path)}">`);
  swap(/<link rel="alternate" hreflang="en" href="[^"]*">/, `<link rel="alternate" hreflang="en" href="${url(CHANGELOG_PATHS.en)}">`);
  swap(/<link rel="alternate" hreflang="pt-BR" href="[^"]*">/, `<link rel="alternate" hreflang="pt-BR" href="${url(CHANGELOG_PATHS['pt-br'])}">`);
  swap(
    /<nav class="nav-links" aria-label="[^"]*">[\s\S]*?<\/nav>/,
    `<nav class="nav-links" aria-label="${copy.navLabel}">\n${copy.nav.map(([href, label]) => `        <a href="${href}">${label}</a>`).join('\n')}\n      </nav>`,
  );
  swap(`<a class="lang" href="${copy.otherFramePath}"`, `<a class="lang" href="${CHANGELOG_PATHS[other]}"`);
  swap(/<main class="legal-page">[\s\S]*?<\/main>/, main);
  return html;
}
