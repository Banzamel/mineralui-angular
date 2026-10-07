import {ChangeDetectionStrategy, Component, input} from '@angular/core'
import i18nKeys from '@generated/i18n-keys.json'
import {MDataTable, MDataTableCell} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataFilterKey} from '@banzamel/mineralui-angular/data/data-source'
import {MCode} from '@banzamel/mineralui-angular/typography/code'

interface FrameworkTextRow {
    readonly key: string
    readonly group: string
    readonly text: string
    readonly placeholders: string
    readonly usedBy: string
}

const COMMON_PREFIX = 'mineralui.common.'

// `injectMDrawerTexts` → `MDrawer`; other sources (a file path) stay as they are.
const componentOf = (source: string) => /^inject(M\w+?)Texts$/.exec(source)?.[1] ?? source

const rows: readonly FrameworkTextRow[] = i18nKeys.map((entry) => ({
    key: entry.key,
    group: entry.key.split('.')[1] ?? '',
    // A plural rule (function default) has no single English string.
    text: entry.text ?? '—',
    placeholders: (entry.text === null ? ['count'] : entry.placeholders).map((name) => `{${name}}`).join(' '),
    usedBy: entry.sources.map(componentOf).join(', '),
}))

const columns: readonly MDataTableColumn[] = [
    {key: 'key', label: 'Key', rowHeader: true},
    {key: 'text', label: 'English text'},
    {key: 'placeholders', label: 'Placeholders', searchable: false},
    {key: 'usedBy', label: 'Used by'},
]

/** Reference tables of the built-in library texts, generated from the library sources (`i18n-keys.json`). */
@Component({
    selector: 'doc-framework-texts-table',
    imports: [MDataTable, MDataTableCell, MCode],
    template: `
        @if (scope() === 'common') {
            <m-data-table
                compact
                class="doc-reference-table"
                rowKey="key"
                [columns]="columns"
                [data]="common"
                [label]="label()"
            >
                <ng-template mCell="key" let-value="value">
                    <code mCode>{{ value }}</code>
                </ng-template>
            </m-data-table>
        } @else {
            <m-data-table
                compact
                searchable
                pagination
                class="doc-reference-table"
                rowKey="key"
                searchPlaceholder="Search keys and texts"
                [pageSize]="20"
                [columns]="columns"
                [data]="components"
                [filterKeys]="filterKeys"
                [label]="label()"
            >
                <ng-template mCell="key" let-value="value">
                    <code mCode>{{ value }}</code>
                </ng-template>
            </m-data-table>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameworkTextsTable {
    /** `common`: the keys shared with MineralUI for React; `components`: the keys of single components. */
    readonly scope = input.required<'common' | 'components'>()
    /** Accessible name of the table. */
    readonly label = input.required<string>()

    protected readonly columns = columns
    protected readonly common = rows.filter((row) => row.key.startsWith(COMMON_PREFIX))
    protected readonly components = rows.filter((row) => !row.key.startsWith(COMMON_PREFIX))
    protected readonly filterKeys: readonly MDataFilterKey[] = [{key: 'group', label: 'Group'}]
}
