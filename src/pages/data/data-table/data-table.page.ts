import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MDataFilterKey, MDataSortKey} from '@banzamel/mineralui-angular/data/data-source'
import {MDataTable, MDataTableCell} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import dataTableDetail from '@generated/examples/data/data-table/data-table-detail'
import dataTableExternal from '@generated/examples/data/data-table/data-table-external'
import dataTableOrders from '@generated/examples/data/data-table/data-table-orders'
import dataTableRange from '@generated/examples/data/data-table/data-table-range'
import dataTableSelection from '@generated/examples/data/data-table/data-table-selection'
import dataTableServer from '@generated/examples/data/data-table/data-table-server'
import dataTableSticky from '@generated/examples/data/data-table/data-table-sticky'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

interface User {
    readonly id: string
    readonly name: string
    readonly role: string
    readonly status: 'active' | 'inactive'
    readonly age: number
}

const USERS: readonly User[] = [
    {id: '1', name: 'Alice Johnson', role: 'Admin', status: 'active', age: 32},
    {id: '2', name: 'Bob Smith', role: 'Editor', status: 'active', age: 28},
    {id: '3', name: 'Carol White', role: 'Viewer', status: 'inactive', age: 45},
    {id: '4', name: 'Dan Brown', role: 'Editor', status: 'active', age: 37},
    {id: '5', name: 'Eve Davis', role: 'Admin', status: 'inactive', age: 29},
    {id: '6', name: 'Frank Lee', role: 'Viewer', status: 'active', age: 53},
    {id: '7', name: 'Grace Kim', role: 'Editor', status: 'active', age: 26},
    {id: '8', name: 'Hank Miller', role: 'Viewer', status: 'inactive', age: 41},
]

@Component({
    selector: 'doc-data-table-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MBadge,
        MDataTable,
        MDataTableCell,
        MStack,
    ],
    template: `
        <doc-article
            title="MDataTable"
            description="Data-driven table with sorting, search, filters, pagination, row selection, expandable rows and custom cells — on in-memory rows, a server data source or a store you drive."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-data-table
                        label="Users"
                        [columns]="columns"
                        [data]="users"
                        [searchKeys]="['name', 'role']"
                        [sortable]="sortable()"
                        [searchable]="searchable()"
                        [selectable]="selectable()"
                        [pagination]="pagination()"
                        [pageSize]="pageSize()"
                        [striped]="striped()"
                        [compact]="compact()"
                        [stickyHeader]="stickyHeader()"
                        [filterKeys]="toolbarFilters() ? filterKeys : []"
                        [sortKeys]="toolbarSort() ? sortKeys : []"
                    >
                        <ng-template mCell="status" [mCellOf]="users" let-user>
                            <m-badge size="sm" [color]="user.status === 'active' ? 'success' : 'warning'">
                                {{ user.status }}
                            </m-badge>
                        </ng-template>
                    </m-data-table>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Custom cells"
                description="Columns stay plain data; a cell with markup is an ng-template mCell='key'. [mCellOf] types let-row from the rows, value is the cell value. Controls inside a cell (the actions menu) work as usual."
            >
                <doc-preview [example]="examples.orders" />
            </doc-section>

            <doc-section
                title="Row selection"
                description="selectable adds a checkbox per row and a header checkbox for the page (mixed while part of it is selected). [(selected)] holds the row keys — rowKey picks the field (default id). A click on the row toggles it too, except on links, buttons and inputs inside."
            >
                <doc-preview [example]="examples.selection" />
            </doc-section>

            <doc-section
                title="Range selection"
                description="Shift with a row checkbox (click or Shift+Space) or a row click selects every row from the last toggled one to this one, on the current page, and gives them the state of the last toggled row — like a file explorer. The header checkbox and leaving the page forget that row. Every header and data cell has data-key='column key' (select for the checkbox column) — a stable hook for tests and column styles."
            >
                <doc-preview [example]="examples.range" />
            </doc-section>

            <doc-section
                title="Expandable rows"
                description="A ng-template mRowDetail adds an expand button (a disclosure: aria-expanded, aria-controls) to every row and shows the template in a full-width row below the open ones. [(expanded)] holds the open row keys, expandMode='single' keeps one open. The buttons get a first column of their own unless a column in [columns] has expander: true. rowClick picks what a click on the row does: select (default with selectable), expand or none."
            >
                <doc-preview [example]="examples.detail" />
            </doc-section>

            <doc-section
                title="Server data source"
                description="injectMDataSource(fetcher, options) keeps the query (page, search, filters, sort) and loads one page per query from your service — Promise or Observable, answered with {items, total}. A new search, filter or sort goes back to page 1, a new query aborts the previous one, and the previous rows stay under the loading scrim. With [source] the table state lives in the source; the [(page)] / [(sort)] models are for in-memory rows."
            >
                <doc-preview [example]="examples.server" />
            </doc-section>

            <doc-section
                title="Source driven from outside"
                description="When a store, a service or the URL already holds page and sort and loads the page, wrap its signals with externalMDataSource({items, total, page, pageSize, sort, …, onPage, onSort}). The table only reads the signals and calls the callbacks — nothing changes until your state does, and going back to page 1 after a new sort or search is your call. Needs no injection context."
            >
                <doc-preview [example]="examples.external" />
            </doc-section>

            <doc-section
                title="Sticky header"
                description="stickyHeader keeps the header row visible. Without maxHeight it follows the page scroll and stays below scrollOffset (your sticky app bar); a wide table keeps scrolling sideways under it. With maxHeight the rows scroll inside the table and the header sticks to its top."
            >
                <doc-preview sticky [example]="examples.sticky" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="A native table (WAI-ARIA Sortable Table): name it with label, sortable headers are buttons, the sorted column has aria-sort. rowHeader: true makes a column the row header (th scope='row'). The toolbar popovers are named dialogs; the sort direction is also given as text. While loading, the rows are aria-busy and the loader is a live status."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="Columns have no render function — cells are ng-template mCell. filterable (search field) is searchable, filterPlaceholder is searchPlaceholder, a column's filterable: false is searchable: false; the filter and sort popovers show when filterKeys / sortKeys are given. useMTable + manual* flags become [source] (injectMDataSource): all server-side or all in memory. The sort type is MSort {key, direction} (React: dir). The search is applied after a short pause (at once on Enter). New: label, rowHeader, aria-sort, the mixed header checkbox, externalMDataSource, expandable rows, Shift range selection, rowClick, data-key, maxHeight and a header that stays visible while the page scrolls."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MDataTable" />
                    <doc-props-table api="MDataTableCell" />
                    <doc-props-table api="MDataTableRowDetail" />
                    <doc-props-table api="MDataTableColumn" />
                    <doc-props-table api="MDataSource" />
                    <doc-props-table api="MDataSourceOptions" />
                    <doc-props-table api="MExternalDataSourceOptions" />
                    <doc-props-table api="data/data-source/data-source" />
                    <doc-props-table api="data/data-source/external-data-source" />
                    <doc-props-table api="data/data-source/data-query" />
                    <doc-props-table api="MDataQuery" />
                    <doc-props-table api="MDataPage" />
                    <doc-props-table api="MSort" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTablePage {
    protected readonly examples = {
        orders: dataTableOrders,
        selection: dataTableSelection,
        server: dataTableServer,
        external: dataTableExternal,
        detail: dataTableDetail,
        range: dataTableRange,
        sticky: dataTableSticky,
    }
    protected readonly users = USERS
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'name', label: 'Name', sortable: true},
        {key: 'role', label: 'Role', sortable: true},
        {key: 'status', label: 'Status', sortable: true},
        {key: 'age', label: 'Age', sortable: true, align: 'right'},
    ]
    protected readonly filterKeys: readonly MDataFilterKey[] = [
        {key: 'role', label: 'Role'},
        {key: 'status', label: 'Status'},
    ]
    protected readonly sortKeys: readonly MDataSortKey[] = [
        {key: 'name', label: 'Name'},
        {key: 'age', label: 'Age'},
    ]

    protected readonly sortable = signal(true)
    protected readonly searchable = signal(false)
    protected readonly toolbarFilters = signal(true)
    protected readonly toolbarSort = signal(true)
    protected readonly selectable = signal(false)
    protected readonly pagination = signal(false)
    protected readonly striped = signal(true)
    protected readonly compact = signal(false)
    protected readonly stickyHeader = signal(false)
    protected readonly pageSize = signal(4)
    protected readonly controls = [
        booleanControl('sortable', this.sortable),
        booleanControl('searchable', this.searchable),
        booleanControl('filterKeys', this.toolbarFilters),
        booleanControl('sortKeys', this.toolbarSort),
        booleanControl('selectable', this.selectable),
        booleanControl('pagination', this.pagination),
        booleanControl('striped', this.striped),
        booleanControl('compact', this.compact),
        booleanControl('stickyHeader', this.stickyHeader),
        sliderControl('pageSize', this.pageSize, {min: 3, max: 10}),
    ]

    protected readonly code = computed(() => {
        const flags = (
            ['sortable', 'searchable', 'selectable', 'pagination', 'striped', 'compact', 'stickyHeader'] as const
        )
            .filter((flag) => this[flag]())
            .map((flag) => `    ${flag}`)
        const attrs = [
            '    label="Users"',
            '    [columns]="columns"',
            '    [data]="users"',
            ...flags,
            this.pagination() && `    [pageSize]="${this.pageSize()}"`,
            this.searchable() && `    [searchKeys]="['name', 'role']"`,
            this.toolbarFilters() && '    [filterKeys]="filterKeys"',
            this.toolbarSort() && '    [sortKeys]="sortKeys"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-data-table
${attrs.join('\n')}
>
    <ng-template mCell="status" [mCellOf]="users" let-user>
        <m-badge size="sm" [color]="user.status === 'active' ? 'success' : 'warning'">{{ user.status }}</m-badge>
    </ng-template>
</m-data-table>`
    })
}
