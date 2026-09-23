import type {Type} from '@angular/core'

/** docId → lazy page (counterpart of `pageMap` in docs-react `PageRenderer.jsx`). */
export const DOC_PAGES: Readonly<Record<string, () => Promise<Type<unknown>>>> = {
    // Getting Started
    installation: () => import('@pages/getting-started/installation/installation.page').then((m) => m.InstallationPage),
    'quick-start': () => import('@pages/getting-started/quick-start/quick-start.page').then((m) => m.QuickStartPage),
    theming: () => import('@pages/getting-started/theming/theming.page').then((m) => m.ThemingPage),
    i18n: () => import('@pages/getting-started/i18n/i18n.page').then((m) => m.I18nPage),

    // Typography
    code: () => import('@pages/typography/code/code.page').then((m) => m.CodePage),
    heading: () => import('@pages/typography/heading/heading.page').then((m) => m.HeadingPage),
    kbd: () => import('@pages/typography/kbd/kbd.page').then((m) => m.KbdPage),
    link: () => import('@pages/typography/link/link.page').then((m) => m.LinkPage),
    list: () => import('@pages/typography/list/list.page').then((m) => m.ListPage),
    'sub-text': () => import('@pages/typography/sub-text/sub-text.page').then((m) => m.SubTextPage),
    text: () => import('@pages/typography/text/text.page').then((m) => m.TextPage),

    // Layout
    divider: () => import('@pages/layout/divider/divider.page').then((m) => m.DividerPage),
    'layout-primitives': () =>
        import('@pages/layout/layout-primitives/layout-primitives.page').then((m) => m.LayoutPrimitivesPage),
    'simple-grid': () => import('@pages/layout/simple-grid/simple-grid.page').then((m) => m.SimpleGridPage),
    'stat-grid': () => import('@pages/layout/stat-grid/stat-grid.page').then((m) => m.StatGridPage),

    // Display
    icons: () => import('@pages/display/icons/icons.page').then((m) => m.IconsPage),
    'icons-v2': () => import('@pages/display/icons-v2/icons-v2.page').then((m) => m.IconsV2Page),
    illustrations: () => import('@pages/display/illustrations/illustrations.page').then((m) => m.IllustrationsPage),
}
