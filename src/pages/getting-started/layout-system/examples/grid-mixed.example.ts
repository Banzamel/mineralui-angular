import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MGrid, MGridItem} from '@banzamel/mineralui-angular/layout/grid'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'

@Component({
    selector: 'app-grid-mixed',
    imports: [MGrid, MGridItem, MSurface],
    template: `
        <m-grid>
            <m-grid-item [md]="2"><div mSurface tone="subtle">Filters</div></m-grid-item>
            <m-grid-item><div mSurface tone="subtle">Main content</div></m-grid-item>
        </m-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridMixedExample {}
