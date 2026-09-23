import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MGrid, MGridItem} from '@banzamel/mineralui-angular/layout/grid'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'

@Component({
    selector: 'app-grid-responsive',
    imports: [MGrid, MGridItem, MSurface],
    template: `
        <m-grid>
            <m-grid-item [lg]="3" [md]="6" [sm]="12"><div mSurface tone="subtle">Sidebar</div></m-grid-item>
            <m-grid-item [lg]="6" [md]="6" [sm]="12"><div mSurface tone="subtle">Content</div></m-grid-item>
            <m-grid-item [lg]="3" [md]="12" [sm]="12"><div mSurface tone="subtle">Meta</div></m-grid-item>
        </m-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridResponsiveExample {}
