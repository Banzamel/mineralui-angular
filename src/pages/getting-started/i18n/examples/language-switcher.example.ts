import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {MI18nService, MTranslatePipe} from '@banzamel/mineralui-angular/i18n'

@Component({
    selector: 'app-language-switcher',
    imports: [MTranslatePipe],
    template: `
        <div role="group" aria-label="Language">
            @for (locale of i18n.locales; track locale) {
                <button type="button" [attr.aria-pressed]="i18n.locale() === locale" (click)="i18n.setLocale(locale)">
                    {{ locale.toUpperCase() }}
                </button>
            }
            <button type="button" (click)="i18n.toggleLocale()">Next</button>
        </div>
        <p>Current locale: {{ i18n.locale() }}</p>
        <p>{{ 'greeting' | mT }}</p>
        <div>
            <button type="button">{{ 'actions.save' | mT }}</button>
            <button type="button">{{ 'actions.cancel' | mT }}</button>
        </div>
    `,
    styles: `
        div {
            display: flex;
            gap: 0.5rem;
        }
        button[aria-pressed='true'] {
            outline: 2px solid var(--mineral-primary);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherExample {
    protected readonly i18n = inject(MI18nService)
}
