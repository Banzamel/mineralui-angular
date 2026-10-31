import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import dataTableGridEdit from '@generated/examples/data/data-table-grid/data-table-grid-edit'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocProNotice} from '@kit/doc-pro-notice/doc-pro-notice'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

@Component({
    selector: 'doc-data-table-grid-page',
    imports: [DocArticle, DocProNotice, DocSection, DocPreview, DocPropsTable, MStack],
    template: `
        <doc-article
            title="MDataTableGrid"
            description="Directive turning MDataTable into a WAI-ARIA data grid: one tab stop, arrow keys between cells and cells edited in place with your own editor template."
        >
            <doc-pro-notice
                [components]="['MDataTableGrid']"
                reason="Cell navigation and editing (entry point data/data-table-grid) is a Pro extension of the free MDataTable."
            />

            <doc-section
                title="Editing cells"
                description="Add mDataTableGrid to m-data-table (bind the rows to it, [mDataTableGrid]='rows', to type the event) and give the editable columns a ng-template mCellEdit='key'. Its context has the row, value, column, draft (a signal for the pending value), commit(value?) and cancel(). Enter, F2 or a double click opens the editor and focuses it; Enter, F2 or Tab commits the draft, so does focus leaving the cell; Escape cancels and returns focus to the cell. A select commits its choice by calling commit($event) — Enter and Escape it handles itself (opening or closing its list) never end the edit. (cellEdit) gives {row, key, value, previous} only when the value changed; the grid never changes your data — update it, or reject the value."
            >
                <doc-preview [example]="examples.edit" />
            </doc-section>

            <doc-section
                title="Keyboard"
                description="The grid is one tab stop (the last focused cell). ← / → move within the row, ↑ / ↓ between rows — the header row and group header rows included; Home / End go to the first / last cell of the row, Ctrl+Home / Ctrl+End to the first / last cell of the grid, PageUp / PageDown by five rows. A cell with a single button, link or checkbox (sort buttons, row checkboxes, expand buttons, the label of a non-sortable header with a hint — its tooltip shows) passes its focus to it, so Space and Enter work as usual. A cell with other controls (two buttons, a field) is entered with Enter or F2, Tab moves between its controls, Escape or F2 goes back to the cell. Enter on a plain cell activates the row with rowClick='activate'. Row details are not grid rows: their content stays in the page tab order."
            />

            <doc-section
                title="Accessibility"
                description="WAI-ARIA APG Grid (data grid): the table gets role='grid', so its cells are gridcells and its headers columnheaders / rowheaders — the native table structure stays. Roving tabindex keeps exactly one element in the tab order; focus rings are :focus-visible. With rowClick='activate' the rows stop being a tab stop and the cells take over. Name your editors (ariaLabel). Below cardsBelow the grid is off: cards are a list, not a grid, and keep the table's own row keyboard."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="React has no grid mode or cell editing. The directive is Pro (entry point data/data-table-grid) and extends the free MDataTable through a neutral extension point (M_DATA_TABLE_EXTENSION) — a plain table renders exactly as before."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MDataTableGrid" />
                    <doc-props-table api="MDataTableCellEdit" />
                    <doc-props-table api="MDataTableCellEditContext" />
                    <doc-props-table api="MDataTableCellEditEvent" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableGridPage {
    protected readonly examples = {edit: dataTableGridEdit}
}
