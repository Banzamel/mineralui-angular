import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCard, MCardBody} from '@banzamel/mineralui-angular/cards/card'
import {MCardGrid, MCardGridItem} from '@banzamel/mineralui-angular/cards/card-grid'
import type {MDataFilterKey, MDataSortKey, MSort} from '@banzamel/mineralui-angular/data/data-source'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import cardGridResponsive from '@generated/examples/cards/card-grid/card-grid-responsive'
import cardGridServer from '@generated/examples/cards/card-grid/card-grid-server'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

interface ComponentItem {
    readonly id: number
    readonly name: string
    readonly category: string
    readonly status: 'Stable' | 'New' | 'Updated'
}

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']

const ITEMS: readonly ComponentItem[] = [
    {id: 1, name: 'MButton', category: 'Controls', status: 'Stable'},
    {id: 2, name: 'MCard', category: 'Cards', status: 'Stable'},
    {id: 3, name: 'MDataTable', category: 'Data', status: 'Stable'},
    {id: 4, name: 'MCardBusiness', category: 'Cards', status: 'New'},
    {id: 5, name: 'MTreeView', category: 'Data', status: 'Updated'},
    {id: 6, name: 'MModal', category: 'Overlays', status: 'Stable'},
    {id: 7, name: 'MInputPhone', category: 'Inputs', status: 'Updated'},
    {id: 8, name: 'MDatePicker', category: 'Dropdowns', status: 'Stable'},
    {id: 9, name: 'MTooltip', category: 'Overlays', status: 'Stable'},
    {id: 10, name: 'MRating', category: 'Display', status: 'Stable'},
    {id: 11, name: 'MStepper', category: 'Controls', status: 'New'},
    {id: 12, name: 'MInputSearch', category: 'Inputs', status: 'Stable'},
    {id: 13, name: 'MCardEvent', category: 'Cards', status: 'New'},
    {id: 14, name: 'MPagination', category: 'Layout', status: 'Stable'},
    {id: 15, name: 'MCheckbox', category: 'Controls', status: 'Stable'},
    {id: 16, name: 'MAvatar', category: 'Media', status: 'Stable'},
]

@Component({
    selector: 'doc-card-grid-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MBadge,
        MCard,
        MCardBody,
        MCardGrid,
        MCardGridItem,
        MHeading,
        MStack,
        MText,
    ],
    template: `
        <doc-article
            title="MCardGrid"
            description="Data-driven card grid with search, filter, sort and pagination — on in-memory items or on a server data source. Columns are a fixed count or a count per breakpoint."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-card-grid
                        label="Components"
                        searchPlaceholder="Search components..."
                        [items]="items"
                        [color]="color()"
                        [columns]="columns()"
                        [searchable]="searchable()"
                        [searchKeys]="['name']"
                        [filterKeys]="filters() ? filterKeys : []"
                        [sortKeys]="sorting() ? sortKeys : []"
                        [pagination]="pagination()"
                        [pageSize]="pageSize()"
                        [(sort)]="sort"
                    >
                        <ng-template mCardGridItem [mCardGridItemOf]="items" let-item>
                            <m-card>
                                <m-card-body>
                                    <h3 mHeading class="doc-grid-title">{{ item.name }}</h3>
                                    <p mText tone="muted" size="sm">{{ item.category }}</p>
                                    <m-badge class="doc-grid-badge" size="sm" [color]="statusColor(item.status)">{{
                                        item.status
                                    }}</m-badge>
                                </m-card-body>
                            </m-card>
                        </ng-template>
                    </m-card-grid>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Responsive columns"
                description="A number fixes the columns on every screen. An object sets them per breakpoint, mobile-first: base below 640 px, then sm 640, md 768, lg 1024, xl 1280, xxl 1536 — a missing breakpoint keeps the next smaller value."
            >
                <doc-preview [example]="examples.responsive" />
            </doc-section>

            <doc-section
                title="Server data source"
                description="The same injectMDataSource as MDataTable: the source keeps the query and loads a page per query — here a Promise that honours the abort signal, like fetch. An initial sort goes in the source options; with in-memory items bind [(sort)] instead."
            >
                <doc-preview [example]="examples.server" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The cards form a list (role list / listitem, named by label); the wrappers have display: contents, so the card itself is the grid cell. The toolbar popovers are named dialogs with the sort direction given as text; while loading the cards are aria-busy and the loader is a live status."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="renderCard becomes ng-template mCardGridItem ([mCardGridItemOf] types the item). filterable / sortable are gone — the popovers show when filterKeys / sortKeys are given. defaultSort is the initial [sort]. useMCardGrid + manual* flags become [source] (injectMDataSource), shared with MDataTable; the sort type is MSort. emptyMessage is emptyText or a [mCardGridEmpty] slot. Columns use minmax(0, 1fr), so long card content cannot widen a column. New: label and list semantics."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MCardGrid" />
                    <doc-props-table api="MCardGridItem" />
                    <doc-props-table api="MCardGridResponsiveColumns" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    styles: `
        h3.doc-grid-title {
            font-size: var(--mineral-font-size-lg);
        }

        .doc-grid-badge {
            align-self: flex-start;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardGridPage {
    protected readonly examples = {responsive: cardGridResponsive, server: cardGridServer}
    protected readonly items = ITEMS
    protected readonly filterKeys: readonly MDataFilterKey[] = [
        {key: 'category', label: 'Category'},
        {key: 'status', label: 'Status'},
    ]
    protected readonly sortKeys: readonly MDataSortKey[] = [{key: 'name', label: 'Name'}]

    protected readonly sort = signal<MSort | null>({key: 'name', direction: 'asc'})
    protected readonly color = signal<MColor>('primary')
    protected readonly searchable = signal(true)
    protected readonly filters = signal(true)
    protected readonly sorting = signal(true)
    protected readonly pagination = signal(true)
    protected readonly columns = signal(3)
    protected readonly pageSize = signal(6)
    protected readonly controls = [
        selectControl('color', this.color, COLORS),
        booleanControl('searchable', this.searchable),
        booleanControl('filterKeys', this.filters),
        booleanControl('sortKeys', this.sorting),
        booleanControl('pagination', this.pagination),
        sliderControl('columns', this.columns, {min: 1, max: 4}),
        sliderControl('pageSize', this.pageSize, {min: 3, max: 12}),
    ]

    protected statusColor(status: ComponentItem['status']): MColor {
        if (status === 'New') return 'success'
        return status === 'Updated' ? 'warning' : 'neutral'
    }

    protected readonly code = computed(() => {
        const attrs = [
            '    [items]="items"',
            `    [columns]="${this.columns()}"`,
            this.color() !== 'primary' && `    color="${this.color()}"`,
            this.searchable() && `    searchable\n    [searchKeys]="['name']"`,
            this.filters() && '    [filterKeys]="filterKeys"',
            this.sorting() && '    [sortKeys]="sortKeys"\n    [(sort)]="sort"',
            this.pagination() && `    pagination\n    [pageSize]="${this.pageSize()}"`,
        ].filter((attr) => typeof attr === 'string')
        return `<m-card-grid
${attrs.join('\n')}
>
    <ng-template mCardGridItem [mCardGridItemOf]="items" let-item>
        <m-card>
            <m-card-body>
                <h3 mHeading>{{ item.name }}</h3>
                <p mText tone="muted" size="sm">{{ item.category }}</p>
                <m-badge size="sm">{{ item.status }}</m-badge>
            </m-card-body>
        </m-card>
    </ng-template>
</m-card-grid>`
    })
}
