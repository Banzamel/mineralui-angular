import type {Type} from '@angular/core'

/** docId → lazy page (counterpart of `pageMap` in docs-react `PageRenderer.jsx`). */
export const DOC_PAGES: Readonly<Record<string, () => Promise<Type<unknown>>>> = {
    // Getting Started
    installation: () => import('@pages/getting-started/installation/installation.page').then((m) => m.InstallationPage),
    'quick-start': () => import('@pages/getting-started/quick-start/quick-start.page').then((m) => m.QuickStartPage),
    theming: () => import('@pages/getting-started/theming/theming.page').then((m) => m.ThemingPage),
    i18n: () => import('@pages/getting-started/i18n/i18n.page').then((m) => m.I18nPage),

    // Display
    icons: () => import('@pages/display/icons/icons.page').then((m) => m.IconsPage),
    'icons-v2': () => import('@pages/display/icons-v2/icons-v2.page').then((m) => m.IconsV2Page),
    illustrations: () => import('@pages/display/illustrations/illustrations.page').then((m) => m.IllustrationsPage),
}
