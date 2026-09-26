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
    primitives: () => import('@pages/getting-started/primitives/primitives.page').then((m) => m.PrimitivesPage),
    'keyboard-nav': () =>
        import('@pages/getting-started/keyboard-nav/keyboard-nav.page').then((m) => m.KeyboardNavPage),

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
    autocomplete: () => import('@pages/forms/autocomplete/autocomplete.page').then((m) => m.AutocompletePage),
    calendar: () => import('@pages/forms/calendar/calendar.page').then((m) => m.CalendarPage),
    'date-picker': () => import('@pages/forms/date-picker/date-picker.page').then((m) => m.DatePickerPage),
    'date-range-picker': () =>
        import('@pages/forms/date-range-picker/date-range-picker.page').then((m) => m.DateRangePickerPage),
    form: () => import('@pages/forms/form/form.page').then((m) => m.FormPage),
    'ghost-text': () => import('@pages/forms/ghost-text/ghost-text.page').then((m) => m.GhostTextPage),
    input: () => import('@pages/forms/input/input.page').then((m) => m.InputPage),
    'input-group': () => import('@pages/forms/input-group/input-group.page').then((m) => m.InputGroupPage),
    select: () => import('@pages/forms/select/select.page').then((m) => m.SelectPage),
    textarea: () => import('@pages/forms/textarea/textarea.page').then((m) => m.TextareaPage),
    'time-picker': () => import('@pages/forms/time-picker/time-picker.page').then((m) => m.TimePickerPage),

    // Specialized Inputs
    'input-credit-card': () =>
        import('@pages/specialized-inputs/input-credit-card/input-credit-card.page').then((m) => m.InputCreditCardPage),
    'input-currency': () =>
        import('@pages/specialized-inputs/input-currency/input-currency.page').then((m) => m.InputCurrencyPage),
    'input-cvc': () => import('@pages/specialized-inputs/input-cvc/input-cvc.page').then((m) => m.InputCvcPage),
    'input-date': () => import('@pages/specialized-inputs/input-date/input-date.page').then((m) => m.InputDatePage),
    'input-exp-date': () =>
        import('@pages/specialized-inputs/input-exp-date/input-exp-date.page').then((m) => m.InputExpDatePage),
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
    alert: () => import('@pages/feedback/alert/alert.page').then((m) => m.AlertPage),
    badge: () => import('@pages/feedback/badge/badge.page').then((m) => m.BadgePage),
    banner: () => import('@pages/feedback/banner/banner.page').then((m) => m.BannerPage),
    loader: () => import('@pages/feedback/loader/loader.page').then((m) => m.LoaderPage),
    'progress-ring': () => import('@pages/feedback/progress-ring/progress-ring.page').then((m) => m.ProgressRingPage),
    skeleton: () => import('@pages/feedback/skeleton/skeleton.page').then((m) => m.SkeletonPage),
    spinner: () => import('@pages/feedback/spinner/spinner.page').then((m) => m.SpinnerPage),
    toast: () => import('@pages/feedback/toast/toast.page').then((m) => m.ToastPage),

    // Navigation
    breadcrumb: () => import('@pages/navigation/breadcrumb/breadcrumb.page').then((m) => m.BreadcrumbPage),
    'header-footer': () => import('@pages/navigation/header-footer/header-footer.page').then((m) => m.HeaderFooterPage),
    navbar: () => import('@pages/navigation/navbar/navbar.page').then((m) => m.NavbarPage),
    navs: () => import('@pages/navigation/navs/navs.page').then((m) => m.NavsPage),
    pagination: () => import('@pages/navigation/pagination/pagination.page').then((m) => m.PaginationPage),
    sidebar: () => import('@pages/navigation/sidebar/sidebar.page').then((m) => m.SidebarPage),
    tabs: () => import('@pages/navigation/tabs/tabs.page').then((m) => m.TabsPage),
    topbar: () => import('@pages/navigation/topbar/topbar.page').then((m) => m.TopbarPage),

    // Overlays
    'command-palette': () =>
        import('@pages/overlays/command-palette/command-palette.page').then((m) => m.CommandPalettePage),
    drawer: () => import('@pages/overlays/drawer/drawer.page').then((m) => m.DrawerPage),
    'dropdown-menu': () => import('@pages/overlays/dropdown-menu/dropdown-menu.page').then((m) => m.DropdownMenuPage),
    modal: () => import('@pages/overlays/modal/modal.page').then((m) => m.ModalPage),
    popconfirm: () => import('@pages/overlays/popconfirm/popconfirm.page').then((m) => m.PopconfirmPage),
    sheet: () => import('@pages/overlays/sheet/sheet.page').then((m) => m.SheetPage),
    tooltip: () => import('@pages/overlays/tooltip/tooltip.page').then((m) => m.TooltipPage),

    // Display
    accordion: () => import('@pages/display/accordion/accordion.page').then((m) => m.AccordionPage),
    blur: () => import('@pages/display/blur/blur.page').then((m) => m.BlurPage),
    'code-block': () => import('@pages/display/code-block/code-block.page').then((m) => m.CodeBlockPage),
    'color-picker': () => import('@pages/display/color-picker/color-picker.page').then((m) => m.ColorPickerPage),
    'count-up': () => import('@pages/display/count-up/count-up.page').then((m) => m.CountUpPage),
    'empty-state': () => import('@pages/display/empty-state/empty-state.page').then((m) => m.EmptyStatePage),
    'detail-list': () => import('@pages/display/detail-list/detail-list.page').then((m) => m.DetailListPage),
    icons: () => import('@pages/display/icons/icons.page').then((m) => m.IconsPage),
    'icons-v2': () => import('@pages/display/icons-v2/icons-v2.page').then((m) => m.IconsV2Page),
    illustrations: () => import('@pages/display/illustrations/illustrations.page').then((m) => m.IllustrationsPage),
    'progress-bar': () => import('@pages/display/progress-bar/progress-bar.page').then((m) => m.ProgressBarPage),
    'qr-code': () => import('@pages/display/qr-code/qr-code.page').then((m) => m.QrCodePage),
    rating: () => import('@pages/display/rating/rating.page').then((m) => m.RatingPage),
    reveal: () => import('@pages/display/reveal/reveal.page').then((m) => m.RevealPage),
    stepper: () => import('@pages/display/stepper/stepper.page').then((m) => m.StepperPage),
    'time-ago': () => import('@pages/display/time-ago/time-ago.page').then((m) => m.TimeAgoPage),
    timeline: () => import('@pages/display/timeline/timeline.page').then((m) => m.TimelinePage),

    // Media
    avatar: () => import('@pages/media/avatar/avatar.page').then((m) => m.AvatarPage),
    'avatar-stack': () => import('@pages/media/avatar-stack/avatar-stack.page').then((m) => m.AvatarStackPage),
    carousel: () => import('@pages/media/carousel/carousel.page').then((m) => m.CarouselPage),
    gallery: () => import('@pages/media/gallery/gallery.page').then((m) => m.GalleryPage),
    image: () => import('@pages/media/image/image.page').then((m) => m.ImagePage),
    masonry: () => import('@pages/media/masonry/masonry.page').then((m) => m.MasonryPage),
    'showcase-carousel': () =>
        import('@pages/media/showcase-carousel/showcase-carousel.page').then((m) => m.ShowcaseCarouselPage),

    // Cards
    card: () => import('@pages/cards/card/card.page').then((m) => m.CardPage),
    'card-action-area': () =>
        import('@pages/cards/card-action-area/card-action-area.page').then((m) => m.CardActionAreaPage),
    'card-business': () => import('@pages/cards/card-business/card-business.page').then((m) => m.CardBusinessPage),
    'masonry-cards': () => import('@pages/cards/masonry-cards/masonry-cards.page').then((m) => m.MasonryCardsPage),
    'card-payment': () => import('@pages/cards/card-payment/card-payment.page').then((m) => m.CardPaymentPage),
    'card-payment-method': () =>
        import('@pages/cards/card-payment-method/card-payment-method.page').then((m) => m.CardPaymentMethodPage),
    'card-offer': () => import('@pages/cards/card-offer/card-offer.page').then((m) => m.CardOfferPage),
    'card-course': () => import('@pages/cards/card-course/card-course.page').then((m) => m.CardCoursePage),
    'card-tile': () => import('@pages/cards/card-tile/card-tile.page').then((m) => m.CardTilePage),
    'card-product': () => import('@pages/cards/card-product/card-product.page').then((m) => m.CardProductPage),
    'card-event': () => import('@pages/cards/card-event/card-event.page').then((m) => m.CardEventPage),
    'card-widget': () => import('@pages/cards/card-widget/card-widget.page').then((m) => m.CardWidgetPage),
    'card-stat': () => import('@pages/cards/card-stat/card-stat.page').then((m) => m.CardStatPage),
    'card-day-schedule': () =>
        import('@pages/cards/card-day-schedule/card-day-schedule.page').then((m) => m.CardDaySchedulePage),
    'showcase-carousel-cards': () =>
        import('@pages/cards/showcase-carousel-cards/showcase-carousel-cards.page').then(
            (m) => m.ShowcaseCarouselCardsPage
        ),
}

/** Old or shared docIds redirected to their page (counterpart of `canonicalDocIdMap` in docs-react). */
export const DOC_ALIASES: Readonly<Record<string, string>> = {
    tag: 'badge',
    'stat-card': 'card-stat',
}
