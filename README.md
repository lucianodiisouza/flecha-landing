# flecha.dev

The website for [Flecha](https://github.com/lucianodiisouza/flecha-browser), the open-source browser for developers. Plain HTML, CSS and JavaScript with no build step.

## Preview

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080. Pages use root-relative paths (`/assets/styles.css`), so serve the folder; opening the files directly won't load the styles.

## Layout

| Path | Page |
| --- | --- |
| `index.html` | Home (English) |
| `pt-br/index.html` | Home (Português) |
| `privacy/`, `pt-br/privacidade/` | Privacy policy |
| `terms/`, `pt-br/termos/` | Terms of use |
| `404.html` | Not found, in both languages |
| `assets/styles.css` | Every style, Blueprint identity |
| `assets/main.js` | Command bar demo, drawing scale, motion |

`robots.txt`, `sitemap.xml` and `site.webmanifest` sit at the root with the icons.

## Keeping things in sync

- English and Portuguese pages are separate files. Change both.
- The command bar demo in `assets/main.js` ports `src/renderer/devCommands.ts` from the Flecha repo. Update it when those rules change.
- The privacy policy says the app sends nothing to Flecha. If the app ever adds an update check, crash reporting or any call to a Flecha server, update the policy and the Privacy section on both homes.
- If the site adds analytics, name the provider and what it collects in section 3 of both privacy pages.

## Brand

Blueprint identity: Ink `#0B2545`, Draft `#EEF2F6`, Grid `#3AA6D9`, Dimension `#E4572E`. Type: Archivo (wide) and JetBrains Mono. The icon sources live in the Flecha repo under `assets/icon/`.
