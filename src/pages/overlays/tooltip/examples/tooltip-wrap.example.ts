import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MTooltip} from '@banzamel/mineralui-angular/overlays/tooltip'

@Component({
    selector: 'app-tooltip-wrap',
    imports: [MButton, MInline, MTooltip],
    template: `
        <m-inline>
            <!-- tooltipWrap: several lines within 20rem (at most the viewport width). -->
            <button mButton variant="outlined" [mTooltip]="explanation" tooltipWrap>Wrapped explanation</button>
            <button mButton variant="outlined" [mTooltip]="'Short hints stay on one line'" tooltipWrap>
                Short hint
            </button>
        </m-inline>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipWrapExample {
    protected readonly explanation =
        'Profit is the sale price minus the purchase price and the auction house cut (5%). ' +
        'Items you cannot buy at the moment are left out of the calculation.'
}
