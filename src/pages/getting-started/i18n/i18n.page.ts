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
import languageSwitcher from '@generated/examples/getting-started/i18n/language-switcher'
import * as snippets from '@generated/snippets/getting-started/i18n'
import {CodeBlock} from '@kit/code-block/code-block'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import {locales} from './snippets/locales'

@Component({
    selector: 'doc-i18n-page',
    imports: [CodeBlock, DocArticle, DocSection, DocPreview, DocPropsTable],
    templateUrl: './i18n.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class I18nPage {
    protected readonly snippets = snippets
    protected readonly languageSwitcher = languageSwitcher

    /** The live demo gets its own MI18nService with the snippet's locales (the docs themselves are English-only). */
    protected readonly demoInjector = createEnvironmentInjector(
        [provideMineralI18n({locales, defaultLocale: 'en', persist: false})],
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
