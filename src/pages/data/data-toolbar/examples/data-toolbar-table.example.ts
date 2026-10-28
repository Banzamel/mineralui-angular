import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {applyMDataQuery} from '@banzamel/mineralui-angular/data/data-source'
import type {MSort} from '@banzamel/mineralui-angular/data/data-source'
import {MDataTable} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MDataToolbar, MDataToolbarActions, MDataToolbarFilters} from '@banzamel/mineralui-angular/data/data-toolbar'
import {MSelect} from '@banzamel/mineralui-angular/dropdowns/select'
import type {MSelectOption} from '@banzamel/mineralui-angular/dropdowns/select'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

interface Player {
    readonly id: string
    readonly name: string
    readonly club: string
    readonly category: string
    readonly rating: number
}

const PLAYERS: readonly Player[] = [
    {id: 'P-101', name: 'Anna Kowalska', club: 'KS Hetman', category: 'Women', rating: 2210},
    {id: 'P-102', name: 'Jan Nowak', club: 'UKS Wieża', category: 'Open', rating: 1985},
    {id: 'P-103', name: 'Ewa Zielińska', club: 'KS Hetman', category: 'Juniors', rating: 2104},
    {id: 'P-104', name: 'Piotr Wójcik', club: 'MKS Goniec', category: 'Open', rating: 1876},
    {id: 'P-105', name: 'Marek Lewandowski', club: 'UKS Wieża', category: 'Seniors', rating: 2033},
    {id: 'P-106', name: 'Olga Mazur', club: 'MKS Goniec', category: 'Women', rating: 1950},
]

const options = (values: readonly string[]): readonly MSelectOption[] => values.map((value) => ({value, label: value}))

@Component({
    selector: 'app-data-toolbar-table',
    imports: [MButton, MDataTable, MDataToolbar, MDataToolbarActions, MDataToolbarFilters, MSelect, MStack],
    template: `
        <!-- Your own filters above a table: in a real app they go into the server query. -->
        <m-stack>
            <m-data-toolbar
                searchable
                collapseBelow="md"
                searchPlaceholder="Search players"
                [activeFilterCount]="activeFilters()"
                [(search)]="search"
            >
                <ng-template mDataToolbarFilters let-placement>
                    @for (filter of selects; track filter.label) {
                        <m-select
                            class="app-toolbar-select"
                            size="sm"
                            clearable
                            [placeholder]="'Any ' + filter.label.toLowerCase()"
                            [label]="placement === 'sheet' ? filter.label : undefined"
                            [ariaLabel]="placement === 'sheet' ? undefined : filter.label"
                            [fullWidth]="placement === 'sheet'"
                            [options]="filter.options"
                            [(value)]="filter.value"
                        />
                    }
                </ng-template>
                <button mButton mDataToolbarActions size="sm" variant="outlined">Export</button>
            </m-data-toolbar>
            <m-data-table label="Players" sortable [columns]="columns" [data]="visible()" [(sort)]="sort" />
        </m-stack>
    `,
    styles: `
        .app-toolbar-select {
            min-width: 150px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataToolbarTableExample {
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'name', label: 'Player', rowHeader: true},
        {key: 'club', label: 'Club'},
        {key: 'category', label: 'Category'},
        {key: 'rating', label: 'Rating', align: 'right'},
    ]
    protected readonly search = signal('')
    protected readonly sort = signal<readonly MSort[]>([])
    protected readonly selects = [
        {label: 'Club', options: options(['KS Hetman', 'MKS Goniec', 'UKS Wieża']), value: signal<Selected>(null)},
        {label: 'Category', options: options(['Juniors', 'Open', 'Seniors', 'Women']), value: signal<Selected>(null)},
    ] as const
    protected readonly activeFilters = computed(
        () => this.selects.filter((filter) => typeof filter.value() === 'string').length
    )

    protected readonly visible = computed(() => {
        const [club, category] = this.selects.map((filter) => filter.value())
        const filters: Record<string, readonly string[]> = {}
        if (typeof club === 'string') filters['club'] = [club]
        if (typeof category === 'string') filters['category'] = [category]
        return applyMDataQuery(PLAYERS, {search: this.search(), filters}, {searchKeys: ['name', 'club']}).items
    })
}

type Selected = string | string[] | null
