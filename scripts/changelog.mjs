// "What's new" / "Novidades": what changed in every published Flecha release, newest first. Same
// idea as engine.oprimo.dev and dock.oprimo.dev. Written for people who use the browser, not for
// whoever reads its code: no file names, no patch numbers, no "general improvements and fixes".
//
// Each entry holds both languages side by side, so a version can't be added in one and forgotten
// in the other. A new release is one more object at the top. Only list releases that shipped
// (on GitHub Releases and in the appcast). `code` spans are written between backticks.

/** @typedef {{ summary: string, items: string[] }} EntryText */
/** @typedef {{ version: string, date: string, en: EntryText, 'pt-br': EntryText }} ChangelogEntry */

/** @type {ChangelogEntry[]} */
export const CHANGELOG = [
  {
    version: '0.1.2',
    date: '2026-11-02',
    en: {
      summary: 'Your extensions in the sidebar, sites that stay signed in after importing, and video on X.',
      items: [
        'The site panel shows every installed extension, as in Arc. Pinned ones get a section at the bottom of the sidebar, in every Space, that you can collapse and reorder by dragging.',
        'Clicking an extension opens its popup beside the sidebar. Right-click for Pin, Options, Remove and Manage Extensions.',
        'Importing brings your logins: cookies now come over from Chromium browsers and Firefox, so sites stay signed in. macOS asks once per Chromium browser for its Safe Storage key. Safari’s cookies don’t come over yet. Thanks to @gitlherme.',
        'If you refuse the keychain prompt during an import, Flecha says the logins are missing and can try again for the cookies alone.',
        'Video that only comes as H.264/AAC, such as on X, now plays.',
        '⌥⌘M opens the responsive view. Thanks to @mattverlaque.',
        'The responsive view’s phone pane is as wide as the phone, and keeps that width when you resize the window. Thanks to @mattverlaque.',
        'Coding agents can read and drive a tab in the responsive view, and no longer knock its phone mirror back to desktop width. Thanks to @mattverlaque.',
      ],
    },
    'pt-br': {
      summary: 'Suas extensões na sidebar, sites que continuam logados depois de importar e vídeo no X.',
      items: [
        'O painel do site mostra todas as extensões instaladas, como no Arc. As fixadas ganham uma seção no fim da sidebar, em todos os Spaces, que você pode recolher e reordenar arrastando.',
        'Clicar numa extensão abre o popup dela ao lado da sidebar. O botão direito traz Fixar, Opções, Remover e Gerenciar extensões.',
        'A importação traz seus logins: os cookies agora vêm dos navegadores Chromium e do Firefox, então os sites continuam logados. O macOS pede uma vez, por navegador Chromium, a chave do Safe Storage dele. Os cookies do Safari ainda não vêm. Obrigado, @gitlherme.',
        'Se você recusar o pedido do Keychain durante a importação, o Flecha avisa que os logins ficaram de fora e pode tentar de novo só com os cookies.',
        'Vídeos que só existem em H.264/AAC, como os do X, agora tocam.',
        '⌥⌘M abre a visualização responsiva. Obrigado, @mattverlaque.',
        'O painel do celular na visualização responsiva tem a largura do celular e mantém essa largura quando você redimensiona a janela. Obrigado, @mattverlaque.',
        'Agentes de código conseguem ler e controlar uma aba na visualização responsiva, e não fazem mais o espelho do celular voltar à largura de desktop. Obrigado, @mattverlaque.',
      ],
    },
  },
  {
    version: '0.1.1',
    date: '2026-10-27',
    en: {
      summary: 'Import from more browsers, and a round of fixes.',
      items: [
        'Settings › Import lists the other browsers on your Mac and imports from each one. The command bar’s “Import from another browser” opens it.',
        'Import from Dia, including the encrypted bookmarks its newer versions keep. macOS asks once to let Flecha use “Dia Safe Storage”. Thanks to @steelzeh.',
        'Import from any Chromium browser, not only the ones Flecha knows by name.',
        'Import a bookmarks file exported from any browser. A file doesn’t carry history, so history still comes only from the browsers Flecha reads directly.',
        'Importing and the coding-agents (MCP) server work right after install: the app sets up its helper on its own, with no script to run.',
        'The top of the page no longer drags the window around.',
        'Chromium’s “search with Chromium from anywhere” prompt is gone, along with the other Google experiments Chromium turns on by default.',
        'When the helper behind importing and coding agents fails, Settings says why instead of showing “Starting…” or “no browsers found”, and a failed import offers to try again.',
        'Settings › Show Tour plays the welcome tour again, and the tour points to Settings › Import.',
        'Settings › Privacy names the lists the ad blocker uses: EasyList and EasyPrivacy.',
        'Copying a developer suggestion, such as a decoded JWT, says “Copied” instead of “Link copied”.',
        'Boosts: the tooltip and the tour say boosts live inside Flecha, and “Open Boosts Folder” is now “Open Boosts”.',
      ],
    },
    'pt-br': {
      summary: 'Importação de mais navegadores e uma leva de correções.',
      items: [
        'Configurações › Importar lista os outros navegadores do seu Mac e importa de cada um. O “Importar de outro navegador” da barra de comandos abre essa tela.',
        'Importação do Dia, inclusive dos favoritos criptografados que as versões novas guardam. O macOS pede uma vez para o Flecha usar o “Dia Safe Storage”. Obrigado, @steelzeh.',
        'Importação de qualquer navegador baseado no Chromium, não só dos que o Flecha conhece pelo nome.',
        'Importação de um arquivo de favoritos exportado de qualquer navegador. Arquivo não leva histórico, então o histórico continua vindo só dos navegadores que o Flecha lê direto.',
        'A importação e o servidor para agentes de código (MCP) funcionam logo depois de instalar: o app configura o próprio ajudante, sem script nenhum.',
        'O topo da página não arrasta mais a janela.',
        'Sumiu o aviso “search with Chromium” do Chromium, junto com os outros experimentos do Google que ele liga por padrão.',
        'Quando o ajudante da importação e dos agentes de código falha, as Configurações dizem o motivo em vez de “Starting…” ou “nenhum navegador encontrado”, e uma importação que falhou oferece tentar de novo.',
        'Configurações › Mostrar tour mostra o tour de boas-vindas de novo, e o tour aponta para Configurações › Importar.',
        'Configurações › Privacidade cita as listas que o bloqueador usa: EasyList e EasyPrivacy.',
        'Copiar uma sugestão para devs, como um JWT decodificado, mostra “Copiado” em vez de “Link copiado”.',
        'Boosts: a dica e o tour dizem que os boosts ficam dentro do Flecha, e “Open Boosts Folder” agora é “Open Boosts”.',
      ],
    },
  },
  {
    version: '0.1.0',
    date: '2026-10-23',
    en: {
      summary: 'The first release of Flecha as a Chromium browser. The Intel build followed on October 24.',
      items: [
        'A vertical sidebar with favorites, pinned tabs, folders and Today tabs that archive themselves.',
        'Spaces, each with its own color and emoji, and optionally its own cookies and logins.',
        'Peek, split view, and Flechinha, a small window for links from other apps.',
        'Real Chromium: Chrome Web Store extensions and Google sign-in on websites work.',
        'Built-in ad and tracker blocking, and incognito windows with Flecha’s look.',
        'Import from Arc, Chrome, Brave, Edge, Vivaldi, Opera, Firefox and Safari in the welcome tour.',
        'A command bar with `gh`, `npm`, `mdn`, `caniuse`, `so`, `env` and `boost`, plus JWT and timestamp decoding.',
        'Environments, a responsive view, local dev servers in the sidebar and console error badges.',
        'Boosts: your own TypeScript and CSS for any site.',
        'An MCP server so Claude Code, Cursor and other coding agents can read and drive your tabs.',
        'Keyboard shortcuts you can re-record, and signed, notarized builds that update themselves.',
      ],
    },
    'pt-br': {
      summary: 'A primeira versão do Flecha como navegador Chromium. A versão para Intel saiu em 24 de outubro.',
      items: [
        'Sidebar vertical com favoritos, abas fixadas, pastas e abas Today que se arquivam sozinhas.',
        'Spaces, cada um com sua cor e emoji e, se você quiser, com cookies e logins separados.',
        'Peek, tela dividida e Flechinha, uma janela pequena para links que vêm de outros apps.',
        'Chromium de verdade: extensões da Chrome Web Store e login do Google nos sites funcionam.',
        'Bloqueio de anúncios e rastreadores embutido, e janelas anônimas com o visual do Flecha.',
        'Importação do Arc, Chrome, Brave, Edge, Vivaldi, Opera, Firefox e Safari no tour de boas-vindas.',
        'Barra de comandos com `gh`, `npm`, `mdn`, `caniuse`, `so`, `env` e `boost`, além de decodificar JWTs e timestamps.',
        'Ambientes, visualização responsiva, servidores de dev locais na sidebar e selos de erros do console.',
        'Boosts: seu próprio TypeScript e CSS para qualquer site.',
        'Um servidor MCP para o Claude Code, o Cursor e outros agentes de código lerem e controlarem suas abas.',
        'Atalhos de teclado que você pode regravar, e versões assinadas e notarizadas que se atualizam sozinhas.',
      ],
    },
  },
];

export const CHANGELOG_PATHS = { en: '/changelog/', 'pt-br': '/pt-br/novidades/' };
