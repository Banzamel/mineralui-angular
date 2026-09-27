import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCard} from '@banzamel/mineralui-angular/cards/card'
import {MGrid, MGridItem} from '@banzamel/mineralui-angular/layout/grid'

@Component({
    selector: 'app-hidden-layout',
    imports: [MCard, MGrid, MGridItem],
    template: `
        <m-grid>
            <m-grid-item [sm]="12" [lg]="6">
                <m-card padded>Primary content</m-card>
            </m-grid-item>
            <m-grid-item [sm]="12" [lg]="6" hiddenUpTo="md">
                <m-card padded>Desktop-only secondary panel</m-card>
            </m-grid-item>
        </m-grid>
    `,
    styles: ':host { display: block; width: 100%; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HiddenLayoutExample {}
