import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import type {MSort} from '@banzamel/mineralui-angular/data/data-source'
import {MDataTable, MDataTableCell, MDataTableRowGroup} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'

interface Assignment {
    readonly id: string
    readonly referee: string
    readonly shift: string
    readonly table: number
    readonly role: 'Chief' | 'Deputy' | 'Arbiter'
}

const ASSIGNMENTS: readonly Assignment[] = [
    {id: 'a1', referee: 'Anna Kowalska', shift: 'Morning', table: 4, role: 'Chief'},
    {id: 'a2', referee: 'Jan Nowak', shift: 'Afternoon', table: 2, role: 'Arbiter'},
    {id: 'a3', referee: 'Ewa Zielińska', shift: 'Morning', table: 1, role: 'Deputy'},
    {id: 'a4', referee: 'Piotr Wójcik', shift: 'Evening', table: 3, role: 'Arbiter'},
    {id: 'a5', referee: 'Marek Lewandowski', shift: 'Afternoon', table: 1, role: 'Chief'},
    {id: 'a6', referee: 'Olga Mazur', shift: 'Morning', table: 2, role: 'Arbiter'},
    {id: 'a7', referee: 'Tomasz Krawczyk', shift: 'Evening', table: 1, role: 'Deputy'},
]

@Component({
    selector: 'app-data-table-groups',
    imports: [MBadge, MDataTable, MDataTableCell, MDataTableRowGroup],
    template: `
        <!-- Grouped by shift, sorted by table within each shift; Shift+click a header for more keys. -->
        <m-data-table
            label="Referee assignments"
            groupBy="shift"
            sortable
            selectable
            [columns]="columns"
            [data]="assignments"
            [(sort)]="sort"
        >
            <ng-template mRowGroup [mRowGroupOf]="assignments" let-shift let-count="count">
                {{ shift }} shift
                <m-badge size="sm" color="neutral">{{ count }}</m-badge>
            </ng-template>
            <ng-template mCell="role" [mCellOf]="assignments" let-assignment>
                <m-badge size="sm" [color]="assignment.role === 'Chief' ? 'primary' : 'neutral'">
                    {{ assignment.role }}
                </m-badge>
            </ng-template>
        </m-data-table>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableGroupsExample {
    protected readonly assignments = ASSIGNMENTS
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'referee', label: 'Referee', rowHeader: true},
        {key: 'table', label: 'Table', align: 'right'},
        {key: 'role', label: 'Role'},
    ]
    protected readonly sort = signal<readonly MSort[]>([{key: 'table', direction: 'asc'}])
}
