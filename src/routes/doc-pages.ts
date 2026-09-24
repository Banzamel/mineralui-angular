import type {Type} from '@angular/core'

/** docId → lazy page (counterpart of `pageMap` in docs-react `PageRenderer.jsx`). */
export const DOC_PAGES: Readonly<Record<string, () => Promise<Type<unknown>>>> = {
    // Getting Started
    installation: () => import('@pages/getting-started/installation/installation.page').then((m) => m.InstallationPage),
    'quick-start': () => import('@pages/getting-started/quick-start/quick-start.page').then((m) => m.QuickStartPage),
    theming: () => import('@pages/getting-started/theming/theming.page').then((m) => m.ThemingPage),
    'layout-system': () =>
        import('@pages/getting-started/layout-system/layout-system.page').then((m) => m.LayoutSystemPage),
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
    'responsive-hidden': () =>
        import('@pages/layout/responsive-hidden/responsive-hidden.page').then((m) => m.ResponsiveHiddenPage),
    utilities: () => import('@pages/layout/utilities/utilities.page').then((m) => m.UtilitiesPage),
    'sticky-panel': () => import('@pages/layout/sticky-panel/sticky-panel.page').then((m) => m.StickyPanelPage),

    // Controls
    button: () => import('@pages/controls/button/button.page').then((m) => m.ButtonPage),
    'button-group': () => import('@pages/controls/button-group/button-group.page').then((m) => m.ButtonGroupPage),
    checkbox: () => import('@pages/controls/checkbox/checkbox.page').then((m) => m.CheckboxPage),
    'load-more': () => import('@pages/controls/load-more/load-more.page').then((m) => m.LoadMorePage),
    'quick-actions': () => import('@pages/controls/quick-actions/quick-actions.page').then((m) => m.QuickActionsPage),
    radio: () => import('@pages/controls/radio/radio.page').then((m) => m.RadioPage),
    'scroll-top': () => import('@pages/controls/scroll-top/scroll-top.page').then((m) => m.ScrollTopPage),
    slider: () => import('@pages/controls/slider/slider.page').then((m) => m.SliderPage),
    'social-button': () => import('@pages/controls/social-button/social-button.page').then((m) => m.SocialButtonPage),
    toggle: () => import('@pages/controls/toggle/toggle.page').then((m) => m.TogglePage),

    // Forms
    form: () => import('@pages/forms/form/form.page').then((m) => m.FormPage),
    'ghost-text': () => import('@pages/forms/ghost-text/ghost-text.page').then((m) => m.GhostTextPage),
    input: () => import('@pages/forms/input/input.page').then((m) => m.InputPage),
    'input-group': () => import('@pages/forms/input-group/input-group.page').then((m) => m.InputGroupPage),
    textarea: () => import('@pages/forms/textarea/textarea.page').then((m) => m.TextareaPage),

    // Specialized Inputs
    'input-credit-card': () =>
        import('@pages/specialized-inputs/input-credit-card/input-credit-card.page').then((m) => m.InputCreditCardPage),
    'input-currency': () =>
        import('@pages/specialized-inputs/input-currency/input-currency.page').then((m) => m.InputCurrencyPage),
    'input-cvc': () => import('@pages/specialized-inputs/input-cvc/input-cvc.page').then((m) => m.InputCvcPage),
    'input-date': () => import('@pages/specialized-inputs/input-date/input-date.page').then((m) => m.InputDatePage),
    'input-email': () => import('@pages/specialized-inputs/input-email/input-email.page').then((m) => m.InputEmailPage),
    'input-file': () => import('@pages/specialized-inputs/input-file/input-file.page').then((m) => m.InputFilePage),
    'input-iban': () => import('@pages/specialized-inputs/input-iban/input-iban.page').then((m) => m.InputIbanPage),
    'input-name': () => import('@pages/specialized-inputs/input-name/input-name.page').then((m) => m.InputNamePage),
    'input-number': () =>
        import('@pages/specialized-inputs/input-number/input-number.page').then((m) => m.InputNumberPage),
    'input-otp': () => import('@pages/specialized-inputs/input-otp/input-otp.page').then((m) => m.InputOtpPage),
    'input-password': () =>
        import('@pages/specialized-inputs/input-password/input-password.page').then((m) => m.InputPasswordPage),
    'input-phone': () => import('@pages/specialized-inputs/input-phone/input-phone.page').then((m) => m.InputPhonePage),
    'input-post-code': () =>
        import('@pages/specialized-inputs/input-post-code/input-post-code.page').then((m) => m.InputPostCodePage),
    'input-search': () =>
        import('@pages/specialized-inputs/input-search/input-search.page').then((m) => m.InputSearchPage),
    'input-slider': () =>
        import('@pages/specialized-inputs/input-slider/input-slider.page').then((m) => m.InputSliderPage),
    'input-taxid': () => import('@pages/specialized-inputs/input-taxid/input-taxid.page').then((m) => m.InputTaxIdPage),
    'input-url': () => import('@pages/specialized-inputs/input-url/input-url.page').then((m) => m.InputUrlPage),

    // Feedback
    spinner: () => import('@pages/feedback/spinner/spinner.page').then((m) => m.SpinnerPage),

    // Navigation
    breadcrumb: () => import('@pages/navigation/breadcrumb/breadcrumb.page').then((m) => m.BreadcrumbPage),
    'header-footer': () => import('@pages/navigation/header-footer/header-footer.page').then((m) => m.HeaderFooterPage),
    navbar: () => import('@pages/navigation/navbar/navbar.page').then((m) => m.NavbarPage),
    navs: () => import('@pages/navigation/navs/navs.page').then((m) => m.NavsPage),
    pagination: () => import('@pages/navigation/pagination/pagination.page').then((m) => m.PaginationPage),
    tabs: () => import('@pages/navigation/tabs/tabs.page').then((m) => m.TabsPage),

    // Display
    icons: () => import('@pages/display/icons/icons.page').then((m) => m.IconsPage),
    'icons-v2': () => import('@pages/display/icons-v2/icons-v2.page').then((m) => m.IconsV2Page),
    illustrations: () => import('@pages/display/illustrations/illustrations.page').then((m) => m.IllustrationsPage),
}
