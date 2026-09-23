import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MGrid, MGridItem} from '@banzamel/mineralui-angular/layout/grid'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'

@Component({
    selector: 'app-grid-equal',
    imports: [MGrid, MGridItem, MSurface],
    template: `
        <m-grid>
            <m-grid-item><div mSurface tone="subtle">Column 1</div></m-grid-item>
            <m-grid-item><div mSurface tone="subtle">Column 2</div></m-grid-item>
            <m-grid-item><div mSurface tone="subtle">Column 3</div></m-grid-item>
        </m-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridEqualExample {}
