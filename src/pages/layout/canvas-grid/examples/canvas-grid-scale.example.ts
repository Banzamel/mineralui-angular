import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MCard, MCardBody, MCardHeader} from '@banzamel/mineralui-angular/cards/card'
import {MCanvasGrid, MCanvasGridTile} from '@banzamel/mineralui-angular/layout/canvas-grid'
import type {MCanvasGridActionEvent, MCanvasGridItem} from '@banzamel/mineralui-angular/layout/canvas-grid'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-canvas-grid-scale',
    imports: [MCanvasGrid, MCanvasGridTile, MCard, MCardBody, MCardHeader, MHeading, MText],
    template: `
        <m-canvas-grid
            guides="never"
            fitContent="scale"
            [columns]="12"
            [rows]="6"
            [snap]="1"
            [height]="300"
            [actions]="['expand']"
            [(layout)]="layout"
            (itemAction)="onAction($event)"
        >
            @for (item of layout(); track item.id) {
                <m-canvas-grid-tile [id]="item.id">
                    <m-card>
                        <m-card-header>
                            <h6 mHeading>{{ item.label }}</h6>
                        </m-card-header>
                        <m-card-body>
                            <p mText size="sm" tone="muted">
                                Laid out 480 px wide, then scaled down to fit the tile — never up. Hover the tile for
                                the expand button.
                            </p>
                        </m-card-body>
                    </m-card>
                </m-canvas-grid-tile>
            }
        </m-canvas-grid>
        <p mText size="sm" tone="muted">{{ log() }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasGridScaleExample {
    protected readonly layout = signal<readonly MCanvasGridItem[]>([
        {id: 'wide', label: 'Wide tile', position: {x: 0, y: 0, w: 8, h: 3}},
        {id: 'small', label: 'Small tile', position: {x: 8, y: 0, w: 4, h: 2}},
        {id: 'strip', label: 'Strip', position: {x: 0, y: 3, w: 12, h: 3}},
    ])
    protected readonly log = signal('No tile expanded yet.')

    protected onAction(event: MCanvasGridActionEvent): void {
        this.log.set(`${event.action}: ${event.id}`)
    }
}
