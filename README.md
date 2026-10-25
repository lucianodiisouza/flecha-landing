<p align="center">
  <img src="icon.png" width="96" height="96" alt="Flecha icon">
</p>

<h1 align="center">flecha.dev</h1>

<p align="center">
  The website for <a href="https://github.com/lucianodiisouza/flecha-browser">Flecha</a>, the open-source browser for developers.<br>
  <a href="https://flecha.dev">flecha.dev</a> · <a href="https://flecha.dev/pt-br/">Português</a> · <a href="https://dl.flecha.dev/Flecha.dmg">Download</a>
</p>

---

## About Flecha

Flecha is a Chromium browser for macOS with a vertical sidebar, Spaces and a command bar that speaks developer. It runs entirely on your Mac: no account, no telemetry, no Flecha server. The browser itself lives at **[lucianodiisouza/flecha-browser](https://github.com/lucianodiisouza/flecha-browser)**. This repository is only the website.

### Features

- **Command bar** (`⌘T`): tabs, history and commands in one box, with `gh 482`, `npm`, `mdn`, `caniuse`, `so`, `env` and `boost` shortcuts. Paste a JWT or a Unix timestamp to decode it.
- **Environments** (`⌥⌘E`): move a page between local, staging and production with the same path, and see a LOCAL / STAGING / PROD badge in the address bar.
- **Responsive view** (`⌥⌘M`): a phone-sized page next to the desktop one, following every navigation.
- **Local dev servers** in the sidebar, with console error counts on local tabs.
- **Boosts** (`⌥⌘B`): your own TypeScript and CSS for any site, edited on Flecha’s Boosts page.
- **Coding agents over MCP**: Claude Code, Cursor and others can read and drive your tabs through a local, token-protected bridge.
- **Spaces** with their own cookies and logins, **pinned tabs and folders**, **favorites** and **today tabs** that archive themselves.
- **Flechinha** for links from other apps, **Peek**, and **split view** with up to four panes.
- **Real Chromium**: Google sign-in and Chrome Web Store extensions work, with ad and tracker blocking built in.
- **Import** from Arc, Chrome, Brave, Edge, Firefox and Safari.

### Download

Download the latest Flecha for Mac: [Apple silicon](https://dl.flecha.dev/Flecha.dmg) · [Intel](https://dl.flecha.dev/Flecha-x64.dmg). The app keeps itself up to date. Release notes are on [GitHub Releases](https://github.com/lucianodiisouza/flecha-browser/releases). Flecha is free and open source.

## About this repository

The landing page is plain HTML, CSS and JavaScript, with no framework. The docs at `/docs` are an [Astro Starlight](https://starlight.astro.build/) site in `docs-site/`, in English and Portuguese. `scripts/build.mjs` builds the docs into `dist/docs` and copies the landing page around them; Vercel serves `dist/`.

| Path | What it is |
| --- | --- |
| `index.html`, `pt-br/index.html` | Home, in English and Portuguese |
| `privacy/`, `pt-br/privacidade/` | Privacy policy |
| `terms/`, `pt-br/termos/` | Terms of use |
| `404.html` | Not found page, in both languages |
| `assets/styles.css` | All styles |
| `assets/main.js` | Command bar demo, drawing scale and motion |
| `llms.txt` | Summary of Flecha and its docs for AI assistants |
| `docs-site/` | The docs (Astro Starlight). Pages are in `src/content/docs/`, Portuguese in `src/content/docs/pt-br/` |
| `scripts/build.mjs` | Builds the whole site into `dist/` |

### Run it locally

```bash
git clone https://github.com/lucianodiisouza/flecha-landing
cd flecha-landing
python3 -m http.server 8080
```

Open http://localhost:8080. Pages use root-relative paths (`/assets/styles.css`), so serve the folder rather than opening the files directly.

To work on the docs:

```bash
npm ci --prefix docs-site
npm run dev --prefix docs-site    # http://localhost:4321/docs/
```

To build the whole site as Vercel does, run `node scripts/build.mjs` and serve `dist/`.

## Contributing

Fixes and improvements to the website are welcome.

- **Bugs or ideas for the browser** go to the [Flecha repository's issues](https://github.com/lucianodiisouza/flecha-browser/issues), not here.
- **Website issues** (typos, broken layout, accessibility, translations) can be opened in [this repository's issues](https://github.com/lucianodiisouza/flecha-landing/issues).
- **Pull requests** should be small and focused, one change per commit.

Before sending a change, please check:

- English and Portuguese pages are separate files, on the landing page and in the docs. Update both.
- The docs describe what the browser does on `main`. Check the code, not the README, before documenting a feature.
- The page works at phone width (about 375px) without sideways scrolling, in light and dark mode.
- Text keeps WCAG AA contrast (4.5:1) on the surface it sits on.
- Motion stays off when the system's "Reduce motion" setting is on.
- When a new build lands on dl.flecha.dev (Intel, for now), set it to `true` in `AVAILABLE` in `assets/main.js` so its download card turns on.
- The command bar demo in `assets/main.js` follows the rules in the browser's `src/renderer/devCommands.ts`. Keep them in sync.
- The privacy policy says the app sends nothing to Flecha, and names Google Analytics as the only analytics on the website. Any change to either claim must match what the browser and the site actually do.

## Brand

Blueprint identity: Ink `#0B2545`, Draft `#EEF2F6`, Grid `#3AA6D9`, Dimension `#E4572E`. Type: Archivo (wide) and JetBrains Mono. The icon sources live in the Flecha repository under `assets/icon/`.

---

<p align="center">Built with ❤️ by <a href="https://www.oprimo.dev">OPrimoDev</a></p>
