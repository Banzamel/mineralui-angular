import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MGrid, MGridItem} from '@banzamel/mineralui-angular/layout/grid'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import {MCode} from '@banzamel/mineralui-angular/typography/code'

@Component({
    selector: 'app-grid-align',
    imports: [MCode, MGrid, MGridItem, MSurface],
    template: `
        <m-grid align="start">
            <m-grid-item [md]="4"><div mSurface tone="subtle">Short column</div></m-grid-item>
            <m-grid-item [md]="8">
                <div mSurface tone="subtle" style="min-height: 160px">
                    Tall column with more content — the short column keeps its natural height because the row uses
                    <code mCode>align="start"</code>.
                </div>
            </m-grid-item>
        </m-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridAlignExample {}
