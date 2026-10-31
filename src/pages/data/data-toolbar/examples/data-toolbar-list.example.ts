import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MButtonGroup} from '@banzamel/mineralui-angular/controls/button-group'
import {applyMDataQuery, collectMDataFilterOptions} from '@banzamel/mineralui-angular/data/data-source'
import type {MDataFilterKey, MDataFilters, MDataSortKey, MSort} from '@banzamel/mineralui-angular/data/data-source'
import {
    MDataToolbar,
    MDataToolbarActions,
    MDataToolbarFilters,
    MDataToolbarView,
} from '@banzamel/mineralui-angular/data/data-toolbar'
import {MSelect} from '@banzamel/mineralui-angular/dropdowns/select'
import type {MSelectOption} from '@banzamel/mineralui-angular/dropdowns/select'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Tournament {
    readonly id: string
    readonly name: string
    readonly city: string
    readonly tempo: 'Classical' | 'Rapid' | 'Blitz'
    readonly month: string
    readonly players: number
}

const TOURNAMENTS: readonly Tournament[] = [
    {id: 't1', name: 'Hetman Open', city: 'Kraków', tempo: 'Classical', month: 'March', players: 142},
    {id: 't2', name: 'Spring Rapid', city: 'Warszawa', tempo: 'Rapid', month: 'April', players: 88},
    {id: 't3', name: 'Blitz Night', city: 'Kraków', tempo: 'Blitz', month: 'April', players: 64},
    {id: 't4', name: 'Baltic Cup', city: 'Gdańsk', tempo: 'Classical', month: 'May', players: 120},
    {id: 't5', name: 'Junior Rapid', city: 'Gdańsk', tempo: 'Rapid', month: 'June', players: 56},
    {id: 't6', name: 'Summer Blitz', city: 'Warszawa', tempo: 'Blitz', month: 'July', players: 97},
]

@Component({
    selector: 'app-data-toolbar-list',
    imports: [
        MBadge,
        MButton,
        MButtonGroup,
        MDataToolbar,
        MDataToolbarActions,
        MDataToolbarFilters,
        MDataToolbarView,
        MSelect,
        MText,
    ],
    template: `
        <!-- The toolbar holds no data: its models drive your own query over your own list. -->
        <m-data-toolbar
            searchable
            collapseBelow="md"
            searchPlaceholder="Search tournaments"
            [filterKeys]="filterKeys"
            [filterOptions]="filterOptions"
            [sortKeys]="sortKeys"
            [activeFilterCount]="city() ? 1 : 0"
            [(search)]="search"
            [(filters)]="filters"
            [(sort)]="sort"
        >
            <ng-template mDataToolbarFilters let-placement>
                <m-select
                    class="app-toolbar-city"
                    size="sm"
                    placeholder="Any city"
                    clearable
                    [label]="placement === 'sheet' ? 'City' : undefined"
                    [ariaLabel]="placement === 'sheet' ? undefined : 'City'"
                    [fullWidth]="placement === 'sheet'"
                    [options]="cities"
                    [(value)]="city"
                />
            </ng-template>
            <m-button-group mDataToolbarView size="sm" variant="outlined" aria-label="View">
                <button
                    mButton
                    [variant]="view() === 'list' ? 'filled' : 'outlined'"
                    [attr.aria-pressed]="view() === 'list'"
                    (click)="view.set('list')"
                >
                    List
                </button>
                <button
                    mButton
                    [variant]="view() === 'compact' ? 'filled' : 'outlined'"
                    [attr.aria-pressed]="view() === 'compact'"
                    (click)="view.set('compact')"
                >
                    Compact
                </button>
            </m-button-group>
            <button mButton mDataToolbarActions size="sm">New tournament</button>
        </m-data-toolbar>

        <ul class="app-toolbar-list" [class.app-compact]="view() === 'compact'" aria-label="Tournaments">
            @for (tournament of visible(); track tournament.id) {
                <li>
                    <strong>{{ tournament.name }}</strong>
                    <span mText size="sm" tone="muted">
                        {{ tournament.city }} · {{ tournament.month }} · {{ tournament.players }} players
                    </span>
                    <m-badge size="sm" color="neutral">{{ tournament.tempo }}</m-badge>
                </li>
            } @empty {
                <li><span mText tone="muted">No tournament matches.</span></li>
            }
        </ul>
    `,
    styles: `
        .app-toolbar-city {
            min-width: 150px;
        }

        .app-toolbar-list {
            display: grid;
            gap: var(--mineral-spacing-sm);
            margin: var(--mineral-spacing-md) 0 0;
            padding: 0;
            list-style: none;
        }

        .app-toolbar-list li {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: var(--mineral-spacing-xs) var(--mineral-spacing-sm);
            padding: var(--mineral-spacing-sm) var(--mineral-spacing-md);
            border: 1px solid var(--mineral-border);
            border-radius: var(--mineral-radius-md);
        }

        .app-toolbar-list.app-compact {
            gap: 0;
        }

        .app-toolbar-list.app-compact li {
            padding-block: var(--mineral-spacing-xs);
            border-radius: 0;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataToolbarListExample {
    protected readonly filterKeys: readonly MDataFilterKey[] = [{key: 'tempo', label: 'Tempo'}]
    protected readonly filterOptions = collectMDataFilterOptions(TOURNAMENTS, this.filterKeys)
    protected readonly sortKeys: readonly MDataSortKey[] = [
        {key: 'name', label: 'Name'},
        // The largest field first: choosing Players sorts descending, choosing it again flips it.
        {key: 'players', label: 'Players', sortFirst: 'desc'},
    ]
    protected readonly cities: readonly MSelectOption[] = ['Gdańsk', 'Kraków', 'Warszawa'].map((city) => ({
        value: city,
        label: city,
    }))

    protected readonly search = signal('')
    protected readonly filters = signal<MDataFilters>({})
    protected readonly sort = signal<readonly MSort[]>([])
    protected readonly city = signal<string | string[] | null>(null)
    protected readonly view = signal<'list' | 'compact'>('list')

    // Your query: the toolbar's search, filters and sort plus the city of your own filter field.
    protected readonly visible = computed(() => {
        const city = this.city()
        return applyMDataQuery(
            TOURNAMENTS,
            {
                search: this.search(),
                filters: {...this.filters(), ...(typeof city === 'string' ? {city: [city]} : {})},
                sort: this.sort(),
            },
            {searchKeys: ['name', 'city']}
        ).items
    })
}
