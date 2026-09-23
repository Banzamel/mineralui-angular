import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MGrid, MGridItem} from '@banzamel/mineralui-angular/layout/grid'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'

@Component({
    selector: 'app-hidden-swap',
    imports: [MGrid, MGridItem, MSurface],
    template: `
        <!-- Same breakpoint on both: exactly one of the two is visible at any width. -->
        <m-grid>
            <m-grid-item [sm]="12" hiddenUpTo="lg">
                <!-- TEMP: replace with MCard (etap 6) -->
                <div mSurface>Desktop layout (visible above lg)</div>
            </m-grid-item>
            <m-grid-item [sm]="12" hiddenAbove="lg">
                <div mSurface tone="subtle">Compact layout (visible at lg and below)</div>
            </m-grid-item>
        </m-grid>
    `,
    styles: ':host { display: block; width: 100%; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HiddenSwapExample {}
