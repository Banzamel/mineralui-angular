import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MHidden} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-hidden-any-element',
    imports: [MHidden, MInline, MText],
    template: `
        <m-inline justify="between" fullWidth>
            <strong mText>MineralUI</strong>
            <!-- mHidden works on any element, not only on MineralUI components. -->
            <!-- TEMP: replace with MButton (etap 3) -->
            <button type="button" mHidden hiddenUpTo="md">Desktop CTA</button>
        </m-inline>
    `,
    styles: ':host { display: block; width: 100%; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HiddenAnyElementExample {}
