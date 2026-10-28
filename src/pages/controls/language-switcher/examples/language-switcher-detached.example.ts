import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MLanguageSwitcher} from '@banzamel/mineralui-angular/controls/language-switcher'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-language-switcher-detached',
    imports: [MLanguageSwitcher, MStack, MText],
    template: `
        <m-stack align="start">
            <!-- detached: the language of the content being edited, not of the app. -->
            <m-language-switcher
                detached
                display="name"
                buttonVariant="outlined"
                ariaLabel="Post language"
                [locales]="['en', 'pl', 'fr', 'ja']"
                [(locale)]="postLanguage"
            />
            <p mText size="sm" tone="muted">Post language: {{ postLanguage() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherDetachedExample {
    protected readonly postLanguage = signal<string | undefined>('pl')
}
