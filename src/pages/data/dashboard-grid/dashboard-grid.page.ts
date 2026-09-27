import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCard, MCardBody, MCardHeader} from '@banzamel/mineralui-angular/cards/card'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MDashboardGrid, MDashboardTile} from '@banzamel/mineralui-angular/data/dashboard-grid'
import type {MDashboardGridItem} from '@banzamel/mineralui-angular/data/dashboard-grid'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import type {MUtilityScale} from '@banzamel/mineralui-angular/theme'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import dashboardGridCatalogue from '@generated/examples/data/dashboard-grid/dashboard-grid-catalogue'
import dashboardGridPinned from '@generated/examples/data/dashboard-grid/dashboard-grid-pinned'
import dashboardGridStatic from '@generated/examples/data/dashboard-grid/dashboard-grid-static'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocProNotice} from '@kit/doc-pro-notice/doc-pro-notice'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const INITIAL_LAYOUT: readonly MDashboardGridItem[] = [
    {id: 'revenue', span: 8, minSpan: 4, label: 'Revenue'},
    {id: 'signups', span: 4, minSpan: 3, label: 'Signups'},
    {id: 'tickets', span: 4, minSpan: 3, label: 'Open tickets'},
    {id: 'churn', span: 4, minSpan: 3, label: 'Churn'},
    {id: 'nps', span: 4, minSpan: 3, label: 'NPS'},
    {id: 'usage', span: 6, minSpan: 4, label: 'Usage'},
    {id: 'alerts', span: 6, minSpan: 4, label: 'Alerts'},
]
const COLUMNS = ['12', '8', '6'] as const
const GAPS = ['lg', 'md', 'sm', 'xl'] as const satisfies readonly MUtilityScale[]

@Component({
    selector: 'doc-dashboard-grid-page',
    imports: [
        DocArticle,
        DocProNotice,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MButton,
        MCard,
        MCardBody,
        MCardHeader,
        MDashboardGrid,
        MDashboardTile,
        MHeading,
        MStack,
        MText,
    ],
    template: `
        <doc-article
            title="MDashboardGrid"
            description="Flowing widget grid with drag and drop. The user sets order and width — by dragging, from the keyboard or from the tile menu — and the layout is a model the application stores."
        >
            <doc-pro-notice
                [components]="['MDashboardGrid']"
                reason="Configurable dashboards are part of MineralUI Pro alongside MTimelineBoard and MCalendarBoard."
            />

            <doc-section
                title="Playground"
                description="Turn on edit mode, then drag a tile by its handle, drag its right edge to resize it, or open the tile menu. Everything works from the keyboard too: Tab to a handle and use the arrow keys."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack class="doc-dashboard-grid-playground" align="start">
                        <button mButton size="sm" variant="outlined" (click)="layout.set(initialLayout)">
                            Reset layout
                        </button>
                        <m-dashboard-grid
                            [(layout)]="layout"
                            [columns]="columnCount()"
                            [editable]="editable()"
                            [gap]="gap()"
                            [responsive]="responsive()"
                            [resizable]="resizable()"
                            removable
                            (itemRemove)="remove($event)"
                        >
                            @for (item of layout(); track item.id) {
                                <m-dashboard-tile [id]="item.id">
                                    <m-card>
                                        <m-card-header>
                                            <h6 mHeading>{{ item.label }}</h6>
                                        </m-card-header>
                                        <m-card-body>
                                            <p mText size="sm" tone="muted">
                                                Placeholder widget — {{ item.span }} of {{ columnCount() }} columns.
                                            </p>
                                        </m-card-body>
                                    </m-card>
                                </m-dashboard-tile>
                            }
                        </m-dashboard-grid>
                    </m-stack>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Two modes"
                description="Without editable the grid is an ordinary responsive layout — the same widths as MGrid, and tile content stays interactive. Edit mode adds the handle, the menu and the resize grip, and freezes tile content (inert) so a click arranges instead of navigating."
            >
                <doc-preview [example]="examples.static" />
            </doc-section>

            <doc-section
                title="Pinned tiles and a drop veto"
                description="A locked item has no handle, no move actions and no remove — it stays where it is. canDrop keeps other tiles from taking its slot: a rejected drop draws its frame in the error tone and leaves the layout alone. removable adds Remove from dashboard; the grid only emits (itemRemove)."
            >
                <doc-preview [example]="examples.pinned" />
            </doc-section>

            <doc-section
                title="Adding tiles and custom menu entries"
                description="Add an item to the layout, then call focusItem(id) after the next render: the grid scrolls to the tile, focuses its handle and highlights it. menuItems adds entries to every tile menu — actions are reported by (menuAction), entries with href are links."
            >
                <doc-preview [example]="examples.catalogue" />
            </doc-section>

            <doc-section
                title="Keyboard"
                description="Each handle is one Tab stop. The arrow keys move the tile one position earlier (← / ↑) or later (→ / ↓); Space or Enter lifts and drops it (aria-pressed), Escape drops a lifted tile. The tile menu (Enter on the menu button) moves and resizes too — a keyboard twin of every pointer gesture. A pointer drag is cancelled with Escape."
            />

            <doc-section
                title="Accessibility"
                description="The handle is a button named 'Revenue — Drag to reorder' with aria-roledescription 'sortable item'; the menu button is named 'Revenue actions', and the width actions sit in a group named after the current width. Every move and width change is announced in a polite live region (mineralui.dashboardGrid.*). Tile content is inert in edit mode."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="items[].content becomes projected <m-dashboard-tile [id]> elements (widgets keep their state when tiles move), and items + onReorder / onResize become the [(layout)] model — overrides is gone, the model already holds the change while the app saves it. onRemove → removable + (itemRemove), itemMenuItems → menuItems + (menuAction), the ref handle → the public focusItem(). The locale prop is replaced by the mineralui.dashboardGrid.* dictionary. The single-column switch follows the grid's own width (container query) instead of the viewport; a press on the handle must travel 4 px before it lifts the tile, and pointercancel cancels a drag instead of dropping it."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MDashboardGrid" />
                    <doc-props-table api="MDashboardTile" />
                    <doc-props-table api="MDashboardGridItem" />
                    <doc-props-table api="MDashboardGridMenuItem" />
                    <doc-props-table api="MDashboardGridMenuActionEvent" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-dashboard-grid-playground {
            width: 100%;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardGridPage {
    protected readonly examples = {
        static: dashboardGridStatic,
        pinned: dashboardGridPinned,
        catalogue: dashboardGridCatalogue,
    }
    protected readonly initialLayout = INITIAL_LAYOUT
    protected readonly layout = signal<readonly MDashboardGridItem[]>(INITIAL_LAYOUT)

    protected readonly editable = signal(true)
    protected readonly columns = signal<(typeof COLUMNS)[number]>('12')
    protected readonly gap = signal<(typeof GAPS)[number]>('lg')
    protected readonly responsive = signal(true)
    protected readonly resizable = signal(true)
    protected readonly columnCount = computed(() => Number(this.columns()))
    protected readonly controls = [
        booleanControl('editable', this.editable),
        selectControl('columns', this.columns, COLUMNS),
        selectControl('gap', this.gap, GAPS),
        booleanControl('responsive', this.responsive),
        booleanControl('resizable', this.resizable),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '[(layout)]="layout"',
            this.columns() !== '12' && `[columns]="${this.columns()}"`,
            this.editable() && 'editable',
            'removable',
            this.gap() !== 'lg' && `gap="${this.gap()}"`,
            !this.responsive() && '[responsive]="false"',
            !this.resizable() && '[resizable]="false"',
            '(itemRemove)="remove($event)"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-dashboard-grid\n    ${attrs.join('\n    ')}\n>\n    @for (item of layout(); track item.id) {\n        <m-dashboard-tile [id]="item.id"><app-widget [id]="item.id" /></m-dashboard-tile>\n    }\n</m-dashboard-grid>`
    })

    protected remove(id: string): void {
        this.layout.update((items) => items.filter((item) => item.id !== id))
    }
}
