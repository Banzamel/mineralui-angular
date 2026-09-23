import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MGrid, MGridItem} from '@banzamel/mineralui-angular/layout/grid'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'

@Component({
    selector: 'app-hidden-layout',
    imports: [MGrid, MGridItem, MSurface],
    template: `
        <m-grid>
            <m-grid-item [sm]="12" [lg]="6">
                <!-- TEMP: replace with MCard (etap 6) -->
                <div mSurface>Primary content</div>
            </m-grid-item>
            <m-grid-item [sm]="12" [lg]="6" hiddenUpTo="md">
                <div mSurface>Desktop-only secondary panel</div>
            </m-grid-item>
        </m-grid>
    `,
    styles: ':host { display: block; width: 100%; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HiddenLayoutExample {}
