import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {MLanguageSwitcher} from '@banzamel/mineralui-angular/controls/language-switcher'
import {MI18nService, MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MText} from '@banzamel/mineralui-angular/typography/text'

// The app registers provideMineralI18n({locales: {en, pl, de, uk}}); the switcher lists those locales.
@Component({
    selector: 'app-language-switcher-menu',
    imports: [MInline, MLanguageSwitcher, MText, MTranslatePipe],
    template: `
        <m-inline align="center">
            <m-language-switcher />
            <m-language-switcher display="name" buttonVariant="outlined" size="sm" />
        </m-inline>
        <p mText>{{ 'greeting' | mT }}</p>
        <p mText size="sm" tone="muted">Active locale: {{ i18n.locale() }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherMenuExample {
    protected readonly i18n = inject(MI18nService)
}
