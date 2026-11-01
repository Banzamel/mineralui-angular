import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MLanguageSwitcher} from '@banzamel/mineralui-angular/controls/language-switcher'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-language-switcher-unavailable',
    imports: [MLanguageSwitcher, MStack, MText],
    template: `
        <m-stack align="start">
            <!-- English is listed but cannot be chosen yet; the description is read with its name. -->
            <m-language-switcher
                detached
                display="name"
                ariaLabel="Panel language"
                unavailableText="Coming soon"
                [locales]="['pl', 'en']"
                [disabledLocales]="['en']"
                [(locale)]="menuLanguage"
            />
            <m-language-switcher
                detached
                variant="segmented"
                size="sm"
                ariaLabel="Panel language"
                unavailableText="Coming soon"
                [locales]="['pl', 'en', 'de']"
                [disabledLocales]="['en']"
                [(locale)]="segmentedLanguage"
            />
            <p mText size="sm" tone="muted">Menu: {{ menuLanguage() }} · Segmented: {{ segmentedLanguage() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherUnavailableExample {
    protected readonly menuLanguage = signal<string | undefined>('pl')
    protected readonly segmentedLanguage = signal<string | undefined>('pl')
}
