import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCard} from '@banzamel/mineralui-angular/cards/card'
import {MGrid, MGridItem} from '@banzamel/mineralui-angular/layout/grid'

@Component({
    selector: 'app-hidden-swap',
    imports: [MCard, MGrid, MGridItem],
    template: `
        <!-- Same breakpoint on both: exactly one of the two is visible at any width. -->
        <m-grid>
            <m-grid-item [sm]="12" hiddenUpTo="lg">
                <m-card padded>Desktop layout (visible above lg)</m-card>
            </m-grid-item>
            <m-grid-item [sm]="12" hiddenAbove="lg">
                <m-card padded tone="subtle">Compact layout (visible at lg and below)</m-card>
            </m-grid-item>
        </m-grid>
    `,
    styles: ':host { display: block; width: 100%; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HiddenSwapExample {}
