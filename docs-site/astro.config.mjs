// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Served at flecha.dev/docs/ next to the static landing page. scripts/build.mjs at the
// repo root builds this into dist/docs and copies the landing files around it.
export default defineConfig({
  site: 'https://flecha.dev',
  base: '/docs',
  trailingSlash: 'always',
  outDir: '../dist/docs',
  integrations: [
    starlight({
      title: 'Flecha Docs',
      description:
        'Documentation for Flecha, the open-source Chromium browser for developers: install, switch from Arc, the command bar, shortcuts and the MCP bridge for coding agents.',
      logo: { src: './src/flecha-mark.svg', alt: 'Flecha' },
      favicon: '/favicon.svg',
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        'pt-br': { label: 'Português', lang: 'pt-BR' },
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/lucianodiisouza/flecha-browser' },
      ],
      editLink: {
        baseUrl: 'https://github.com/lucianodiisouza/flecha-landing/edit/main/docs-site/',
      },
      lastUpdated: true,
      customCss: ['./src/styles/flecha.css'],
      components: {
        Head: './src/components/Head.astro',
      },
      head: [
        // Google Analytics 4, the same property as the landing page (see the privacy policy).
        {
          tag: 'script',
          attrs: { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-Y05X9Z4PQJ' },
        },
        {
          tag: 'script',
          content:
            "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-Y05X9Z4PQJ',{allow_google_signals:false,allow_ad_personalization_signals:false});",
        },
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'Flecha' } },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=JetBrains+Mono:wght@400;500;700&display=swap',
          },
        },
      ],
      sidebar: [
        {
          label: 'Start here',
          translations: { 'pt-BR': 'Comece aqui' },
          items: ['index', 'install', 'switch-from-arc'],
        },
        {
          label: 'Using Flecha',
          translations: { 'pt-BR': 'Usando o Flecha' },
          items: [
            'command-bar',
            'guides/tabs',
            'guides/spaces',
            'guides/peek-split-flechinha',
            'guides/developer-tools',
            'guides/boosts',
            'guides/privacy',
          ],
        },
        {
          label: 'Coding agents',
          translations: { 'pt-BR': 'Agentes de código' },
          items: ['agents/mcp', 'agents/claude-code', 'agents/cursor'],
        },
        {
          label: 'Compare',
          translations: { 'pt-BR': 'Comparações' },
          items: [
            'compare/arc-alternatives',
            'compare/flecha-vs-arc',
            'compare/flecha-vs-dia',
            'compare/flecha-vs-zen',
            'compare/flecha-vs-chrome',
          ],
        },
        {
          label: 'Reference',
          translations: { 'pt-BR': 'Referência' },
          items: [
            'shortcuts',
            // What's new lives on the website itself (scripts/changelog.mjs); /docs/changelog/ redirects there.
            { label: "What's new", translations: { 'pt-BR': 'Novidades' }, link: '/changelog/' },
          ],
        },
        {
          label: 'Development',
          translations: { 'pt-BR': 'Desenvolvimento' },
          items: ['development/architecture', 'development/build', 'development/release'],
        },
      ],
    }),
  ],
});
