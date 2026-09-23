import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MGrid} from '@banzamel/mineralui-angular/layout/grid'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'

@Component({
    selector: 'app-grid-plain-children',
    imports: [MGrid, MSurface],
    template: `
        <m-grid>
            @for (metric of metrics; track metric) {
                <div mSurface tone="subtle">{{ metric }}</div>
            }
        </m-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridPlainChildrenExample {
    protected readonly metrics = ['Revenue', 'Orders', 'Visitors', 'Conversion']
}
