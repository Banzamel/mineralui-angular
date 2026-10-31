import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import dataToolbarList from '@generated/examples/data/data-toolbar/data-toolbar-list'
import dataToolbarTable from '@generated/examples/data/data-toolbar/data-toolbar-table'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

@Component({
    selector: 'doc-data-toolbar-page',
    imports: [DocArticle, DocSection, DocPreview, DocPropsTable, MStack],
    template: `
        <doc-article
            title="MDataToolbar"
            description="Bar above a data view: search, filter and sort popovers, slots for your own filters, view switch and actions, and filters folded into a sheet on a narrow screen. MDataTable and MCardGrid use it; on its own it works above any list."
        >
            <doc-section
                title="Above your own list"
                description="The toolbar holds no data. Bind [(search)] (committed after a short pause, at once on Enter), [(filters)] and [(sort)] to your state and run your own query — here applyMDataQuery on an array; collectMDataFilterOptions gives the values of the filter popover. A sort key chosen in the popover sorts ascending, choosing it again flips it; sortFirst: 'desc' on a MDataSortKey starts it descending (Players here) — Angular-only. Slots: [mDataToolbarSearch] before the search, a ng-template mDataToolbarFilters for your own filter fields, [mDataToolbarView] for a segment or view switch and [mDataToolbarActions] at the end. collapseBelow='md' (opt-in) folds the filters — the filterKeys groups and your template — into a 'Filter · N' button opening a sheet at most 768 px wide; activeFilterCount adds your fields to N. Narrow the window to see it."
            >
                <doc-preview [example]="examples.list" />
            </doc-section>

            <doc-section
                title="Server filters above a table"
                description="Above a MDataTable the toolbar carries filters the table does not know — in an app they go into the server query or the store (externalMDataSource). The mDataToolbarFilters template is rendered in one place at a time (let-placement is 'bar' or 'sheet'), so keep the field values in your state: here signals, which survive the move between the bar and the sheet. With the built-in table toolbar use toolbarCollapseBelow on MDataTable / MCardGrid instead."
            >
                <doc-preview [example]="examples.table" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The filter and sort popovers are named dialogs (focus moves in, Escape and Tab out close them); the sort direction is also given as text. The folded filter button opens a modal sheet (aria-haspopup='dialog', aria-expanded) named by its heading; the visible '· 2' count is hidden from screen readers, which hear 'Filter, 2 active' (mineralui.dataView.activeFilters). Name your own fields: a label in the sheet, ariaLabel in the bar."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="React has no public toolbar: the bar is built into MDataTable / MCardGrid without slots or a mobile sheet. The Angular toolbar is a public component (entry point data/data-toolbar) with the same look and the react-pro popovers; slots, collapseBelow, activeFilterCount, filtersOpen and texts are new."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MDataToolbar" />
                    <doc-props-table api="MDataToolbarFilters" />
                    <doc-props-table api="MDataToolbarSearch" />
                    <doc-props-table api="MDataToolbarView" />
                    <doc-props-table api="MDataToolbarActions" />
                    <doc-props-table api="MDataToolbarFiltersContext" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataToolbarPage {
    protected readonly examples = {
        list: dataToolbarList,
        table: dataToolbarTable,
    }
}
