import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCard, MCardBody, MCardHeader} from '@banzamel/mineralui-angular/cards/card'
import {MCardStat} from '@banzamel/mineralui-angular/cards/card-stat'
import {mChartIcon, MIcon} from '@banzamel/mineralui-angular/icons'
import {MCanvasGrid, MCanvasGridTile} from '@banzamel/mineralui-angular/layout/canvas-grid'
import type {
    MCanvasGridActionEvent,
    MCanvasGridFit,
    MCanvasGridGuides,
    MCanvasGridItem,
} from '@banzamel/mineralui-angular/layout/canvas-grid'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import canvasGridScale from '@generated/examples/layout/canvas-grid/canvas-grid-scale'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const INITIAL_ITEMS: readonly MCanvasGridItem[] = [
    {id: 'kpi-revenue', label: 'Monthly revenue', position: {x: 4, y: 4, w: 28, h: 28}, minSize: {w: 6, h: 7}},
    {id: 'kpi-customers', label: 'New customers', position: {x: 60, y: 16, w: 28, h: 28}, minSize: {w: 6, h: 7}},
    {id: 'note', label: 'Note', position: {x: 16, y: 56, w: 56, h: 28}, minSize: {w: 8, h: 5}},
]
const GUIDES = ['always', 'on-edit', 'on-drag', 'never'] as const satisfies readonly MCanvasGridGuides[]
const FITS = ['scroll', 'scale'] as const satisfies readonly MCanvasGridFit[]

@Component({
    selector: 'doc-canvas-grid-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MCanvasGrid,
        MCanvasGridTile,
        MCard,
        MCardBody,
        MCardHeader,
        MCardStat,
        MCode,
        MHeading,
        MIcon,
        MStack,
        MText,
    ],
    template: `
        <doc-article
            title="MCanvasGrid"
            description="Free-placement canvas grid. Tiles sit at (x, y, w, h) in grid units over a dashed cell guide; in edit mode they move and resize by pointer or keyboard."
        >
            <doc-section
                title="Playground"
                description="With editable on, drag a tile by its header and resize it by the corner — or Tab to its move handle, press Space and use the arrow keys (Shift with the arrows resizes, Space drops, Escape cancels). minSize keeps a tile from shrinking below readable content."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack class="doc-canvas-grid-playground">
                        <m-canvas-grid
                            [(layout)]="items"
                            [columns]="columns()"
                            [rows]="rows()"
                            [snap]="snap()"
                            [guides]="guides()"
                            [editable]="editable()"
                            [fitContent]="fitContent()"
                            [height]="height()"
                            [actions]="['edit', 'expand', 'remove']"
                            (itemAction)="onAction($event)"
                        >
                            @for (item of items(); track item.id) {
                                <m-canvas-grid-tile [id]="item.id">
                                    @switch (item.id) {
                                        @case ('kpi-revenue') {
                                            <m-card-stat
                                                label="Monthly revenue"
                                                value="128 540 zł"
                                                trend="12"
                                                trendType="up"
                                                color="success"
                                            >
                                                <m-icon mCardStatIcon [icon]="chartIcon" />
                                            </m-card-stat>
                                        }
                                        @case ('kpi-customers') {
                                            <m-card-stat
                                                label="New customers"
                                                value="37"
                                                trend="4"
                                                trendType="up"
                                                color="primary"
                                            />
                                        }
                                        @default {
                                            <m-card>
                                                <m-card-header>
                                                    <h5 mHeading>Note tile</h5>
                                                </m-card-header>
                                                <m-card-body>
                                                    <p mText size="sm" tone="muted">
                                                        Each tile is whatever you project into
                                                        <code mCode>m-canvas-grid-tile</code>. The grid only anchors
                                                        size and placement — the content is yours.
                                                    </p>
                                                </m-card-body>
                                            </m-card>
                                        }
                                    }
                                </m-canvas-grid-tile>
                            }
                        </m-canvas-grid>
                        <p mText size="sm" tone="muted">{{ log() }}</p>
                    </m-stack>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Units, guide and breakpoints"
                description="The canvas has columns × rows cells, each split into snap units: positions are in units (24 × 24 cells with snap 4 → 96 × 96 units), a pointer drag moves by one unit, the keyboard by one cell. Pass height for standalone use, or put the canvas into a parent with a height. Below 1024 px of canvas width the guide halves; below 768 px the tiles stack in one column ordered by y and editing stops."
            />

            <doc-section
                title="Scaled content"
                description="fitContent='scale' lays the content out at fitContentBaseWidth (or the tile width, if wider) and scales it down to fit the tile, never up. The expand button is the one tile action available outside edit mode."
            >
                <doc-preview [example]="examples.scale" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="In edit mode every tile has a move handle — a button named 'Move Monthly revenue' with aria-pressed while lifted. Moves, size changes, drops and cancels are announced in a polite live region (mineralui.canvasGrid.*). Tile buttons are named after the tile ('Edit Note'). The guide and the resize corner are hidden from assistive technology — the keyboard resizes through the handle."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="renderItem becomes projected <m-canvas-grid-tile [id]> elements, and items + onItemMove / onItemResize become the [(layout)] model. minItemSize → minSize on the item (maxItemSize was unused in React and is gone). onItemEdit / onItemExpand / onItemRemove → actions + (itemAction). compactBreakpoint / mobileBreakpoint are gone: the compact guide and the stacked layout follow the canvas width (container queries at 1024 / 768 px) instead of the viewport, so the canvas renders its final layout on the server. The keyboard, the move handle and the live region are new (React: pointer only); tile placement no longer halves its resolution in the compact view, and pointercancel or Escape cancel a drag."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MCanvasGrid" />
                    <doc-props-table api="MCanvasGridTile" />
                    <doc-props-table api="MCanvasGridItem" />
                    <doc-props-table api="MCanvasGridPosition" />
                    <doc-props-table api="MCanvasGridActionEvent" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-canvas-grid-playground {
            width: 100%;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasGridPage {
    protected readonly examples = {scale: canvasGridScale}
    protected readonly chartIcon = mChartIcon
    protected readonly items = signal<readonly MCanvasGridItem[]>(INITIAL_ITEMS)
    protected readonly log = signal('Tile buttons report (itemAction).')

    protected readonly columns = signal(24)
    protected readonly rows = signal(24)
    protected readonly snap = signal(4)
    protected readonly height = signal(520)
    protected readonly guides = signal<(typeof GUIDES)[number]>('always')
    protected readonly editable = signal(true)
    protected readonly fitContent = signal<(typeof FITS)[number]>('scroll')
    protected readonly controls = [
        sliderControl('columns', this.columns, {min: 8, max: 32, step: 4}),
        sliderControl('rows', this.rows, {min: 8, max: 32, step: 4}),
        sliderControl('snap', this.snap, {min: 1, max: 8}),
        sliderControl('height', this.height, {min: 320, max: 720, step: 20}),
        selectControl('guides', this.guides, GUIDES),
        selectControl('fitContent', this.fitContent, FITS),
        booleanControl('editable', this.editable),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '[(layout)]="items"',
            this.columns() !== 24 && `[columns]="${this.columns()}"`,
            this.rows() !== 24 && `[rows]="${this.rows()}"`,
            this.snap() !== 4 && `[snap]="${this.snap()}"`,
            this.guides() !== 'always' && `guides="${this.guides()}"`,
            this.fitContent() !== 'scroll' && `fitContent="${this.fitContent()}"`,
            this.editable() && 'editable',
            `[height]="${this.height()}"`,
            `[actions]="['edit', 'expand', 'remove']"`,
            '(itemAction)="onAction($event)"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-canvas-grid\n    ${attrs.join('\n    ')}\n>\n    @for (item of items(); track item.id) {\n        <m-canvas-grid-tile [id]="item.id"><app-tile [id]="item.id" /></m-canvas-grid-tile>\n    }\n</m-canvas-grid>`
    })

    protected onAction(event: MCanvasGridActionEvent): void {
        if (event.action === 'remove') {
            this.items.update((items) => items.filter((item) => item.id !== event.id))
        }
        this.log.set(`${event.action}: ${event.id}`)
    }
}
