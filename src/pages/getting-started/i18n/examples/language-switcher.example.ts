import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MButtonGroup} from '@banzamel/mineralui-angular/controls/button-group'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MI18nService, MTranslatePipe} from '@banzamel/mineralui-angular/i18n'

@Component({
    selector: 'app-language-switcher',
    imports: [MButton, MButtonGroup, MInline, MTranslatePipe],
    template: `
        <m-button-group variant="outlined" color="neutral" size="sm" aria-label="Language">
            @for (locale of i18n.locales; track locale) {
                <button
                    mButton
                    [active]="i18n.locale() === locale"
                    [attr.aria-pressed]="i18n.locale() === locale"
                    (click)="i18n.setLocale(locale)"
                >
                    {{ locale.toUpperCase() }}
                </button>
            }
            <button mButton (click)="i18n.toggleLocale()">Next</button>
        </m-button-group>
        <p>Current locale: {{ i18n.locale() }}</p>
        <p>{{ 'greeting' | mT }}</p>
        <m-inline>
            <button mButton>{{ 'actions.save' | mT }}</button>
            <button mButton variant="ghost">{{ 'actions.cancel' | mT }}</button>
        </m-inline>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherExample {
    protected readonly i18n = inject(MI18nService)
}
