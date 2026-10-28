import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MLanguageSwitcher} from '@banzamel/mineralui-angular/controls/language-switcher'
import {MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-language-switcher-segmented',
    imports: [MLanguageSwitcher, MStack, MText, MTranslatePipe],
    template: `
        <m-stack align="start">
            <m-language-switcher variant="segmented" size="sm" [locales]="['en', 'pl']" />
            <p mText>{{ 'greeting' | mT }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherSegmentedExample {}
