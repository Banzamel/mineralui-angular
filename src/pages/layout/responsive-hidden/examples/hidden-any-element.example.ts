import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MHidden} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-hidden-any-element',
    imports: [MButton, MHidden, MInline, MText],
    template: `
        <m-inline justify="between" fullWidth>
            <strong mText>MineralUI</strong>
            <!-- MineralUI components that compose MHidden take the inputs directly… -->
            <button mButton hiddenUpTo="md">Desktop CTA</button>
            <!-- …anything else gets the mHidden directive. -->
            <small mHidden hiddenAbove="md">Menu below</small>
        </m-inline>
    `,
    styles: ':host { display: block; width: 100%; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HiddenAnyElementExample {}
