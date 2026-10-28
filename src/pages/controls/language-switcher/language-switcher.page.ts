import {DOCUMENT} from '@angular/common'
import {
    ChangeDetectionStrategy,
    Component,
    createEnvironmentInjector,
    DestroyRef,
    EnvironmentInjector,
    inject,
} from '@angular/core'
import {MI18nService, provideMineralI18n} from '@banzamel/mineralui-angular/i18n'
import languageSwitcherDetached from '@generated/examples/controls/language-switcher/language-switcher-detached'
import languageSwitcherMenu from '@generated/examples/controls/language-switcher/language-switcher-menu'
import languageSwitcherSegmented from '@generated/examples/controls/language-switcher/language-switcher-segmented'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

// The demo locales. `mineralui.languageSwitcher.label` translates the switcher's accessible name.
const DEMO_LOCALES = {
    en: {greeting: 'Hello!', mineralui: {languageSwitcher: {label: 'Language'}}},
    pl: {greeting: 'Cześć!', mineralui: {languageSwitcher: {label: 'Język'}}},
    de: {greeting: 'Hallo!', mineralui: {languageSwitcher: {label: 'Sprache'}}},
    uk: {greeting: 'Привіт!', mineralui: {languageSwitcher: {label: 'Мова'}}},
}

@Component({
    selector: 'doc-language-switcher-page',
    imports: [DocArticle, DocSection, DocPreview, DocPropsTable],
    template: `
        <doc-article
            title="MLanguageSwitcher"
            description="Language switcher for MI18nService: a menu button with one radio item per locale, or a segmented control. Each language is named in itself (“Polski”, “Deutsch”) and marked with its lang."
        >
            <doc-section
                title="Menu button"
                description='With provideMineralI18n() the switcher lists its locales and calls setLocale() — the service updates <html lang>, the stored choice and every mT text. The button shows the code (display="code", default) or the name, with a globe icon (showIcon); its accessible name is “Language: EN” (mineralui.languageSwitcher.label, or ariaLabel). Both switchers below share one service.'
            >
                <doc-preview [example]="examples.languageSwitcherMenu" [injector]="demoInjector" />
            </doc-section>

            <doc-section
                title="Segmented"
                description="For two to four languages: a radio group of codes, each option named “English (EN)”. locales picks and orders the offered locales."
            >
                <doc-preview [example]="examples.languageSwitcherSegmented" [injector]="demoInjector" />
            </doc-section>

            <doc-section
                title="Without the service"
                description="Give locales and bind [(locale)] — without MI18nService, or with detached when the choice is not the app language (the language of a post, a translation target). names overrides the names from Intl.DisplayNames."
            >
                <doc-preview [example]="examples.languageSwitcherDetached" />
            </doc-section>

            <doc-section title="MLanguageSwitcher API">
                <doc-props-table api="MLanguageSwitcher" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherPage {
    protected readonly examples = {languageSwitcherMenu, languageSwitcherSegmented, languageSwitcherDetached}

    /** The demos get their own MI18nService (the docs themselves are English-only). */
    protected readonly demoInjector = createEnvironmentInjector(
        [provideMineralI18n({locales: DEMO_LOCALES, defaultLocale: 'en', persist: false})],
        inject(EnvironmentInjector)
    )

    constructor() {
        const docsI18n = inject(MI18nService)
        const root = inject(DOCUMENT).documentElement
        inject(DestroyRef).onDestroy(() => {
            this.demoInjector.destroy()
            // Every MI18nService writes <html lang>; give it back to the docs' own service.
            root.lang = docsI18n.locale()
        })
    }
}
