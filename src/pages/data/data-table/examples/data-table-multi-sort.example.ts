import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MSort} from '@banzamel/mineralui-angular/data/data-source'
import {MDataTable} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Assignment {
    readonly id: string
    readonly shift: string
    readonly station: number
    readonly referee: string
    readonly matches: number
}

const REFEREES = ['Nowak', 'Kowalska', 'Wiśniewski', 'Wójcik', 'Kamińska', 'Lewandowski', 'Zielińska', 'Szymański']
const ASSIGNMENTS: readonly Assignment[] = REFEREES.map((referee, index) => ({
    id: `A-${index + 1}`,
    shift: ['Morning', 'Afternoon', 'Evening'][index % 3] ?? 'Morning',
    station: ((index * 5) % 4) + 1,
    referee,
    matches: 3 + ((index * 7) % 5),
}))

@Component({
    selector: 'app-data-table-multi-sort',
    imports: [MDataTable, MText],
    template: `
        <!-- Click a header to sort by it alone; Shift+click adds it as the next key (numbered next to the arrow). -->
        <m-data-table label="Referee assignments" sortable striped [columns]="columns" [data]="rows" [(sort)]="sort" />
        <span mText size="sm" tone="muted" class="app-sort-state">Sort: {{ sortText() }}</span>
    `,
    styles: `
        .app-sort-state {
            display: block;
            margin-top: var(--mineral-spacing-sm);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableMultiSortExample {
    protected readonly rows = ASSIGNMENTS
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'shift', label: 'Shift'},
        {key: 'station', label: 'Station', align: 'right'},
        {key: 'referee', label: 'Referee'},
        {key: 'matches', label: 'Matches', align: 'right'},
    ]
    // The default order: shift, then station within a shift.
    protected readonly sort = signal<readonly MSort[]>([
        {key: 'shift', direction: 'asc'},
        {key: 'station', direction: 'asc'},
    ])
    protected readonly sortText = computed(
        () =>
            this.sort()
                .map((key) => `${key.key} ${key.direction}`)
                .join(' → ') || 'none'
    )
}
