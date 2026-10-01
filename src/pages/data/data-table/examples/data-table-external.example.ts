import {ChangeDetectionStrategy, Component, inject, Injectable, signal} from '@angular/core'
import {applyMDataQuery, externalMDataSource} from '@banzamel/mineralui-angular/data/data-source'
import type {MSort} from '@banzamel/mineralui-angular/data/data-source'
import {MDataTable} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Trade {
    readonly id: string
    readonly item: string
    readonly realm: string
    readonly price: number | null
}

const ITEMS = ['Arcane Crystal', 'Black Lotus', 'Thorium Bar', 'Runecloth', 'Elemental Fire', 'Dark Iron Ore']
const REALMS = ['Firemaw', 'Gehennas', 'Golemagg']
const TRADES: readonly Trade[] = Array.from({length: 23}, (_, index) => ({
    id: `T-${String(4100 + index)}`,
    item: ITEMS[index % ITEMS.length] ?? 'Unknown',
    realm: REALMS[(index * 2) % REALMS.length] ?? 'Firemaw',
    price: index % 7 === 3 ? null : 40 + ((index * 613) % 900),
}))

/**
 * Stands in for your store (signals, NgRx, the URL…): it owns page and sort and loads the page from the API. Here the
 * "API" sorts an array — empty prices last in both directions, which a client-side sort would not know.
 */
@Injectable({providedIn: 'root'})
class TradesStore {
    readonly page = signal(1)
    readonly sort = signal<MSort | null>({key: 'price', direction: 'desc'})
    readonly items = signal<readonly Trade[]>([])
    readonly total = signal(0)
    readonly loading = signal(false)
    readonly pageSize = 5

    constructor() {
        this.load()
    }

    setPage(page: number): void {
        this.page.set(page)
        this.load()
    }

    setSort(sort: MSort | null): void {
        this.sort.set(sort)
        this.page.set(1) // the store decides: a new sort starts from page 1
        this.load()
    }

    private load(): void {
        this.loading.set(true)
        const sort = this.sort()
        const sorted = sort?.key === 'price' ? this.byPrice(sort.direction) : TRADES
        const page = applyMDataQuery(sorted, {
            page: this.page(),
            pageSize: this.pageSize,
            sort: sort?.key === 'price' ? null : sort,
        })
        setTimeout(() => {
            this.items.set(page.items)
            this.total.set(page.total)
            this.loading.set(false)
        }, 400)
    }

    private byPrice(direction: MSort['direction']): readonly Trade[] {
        const priced = TRADES.filter((trade) => trade.price !== null)
        const sign = direction === 'asc' ? 1 : -1
        priced.sort((a, b) => sign * ((a.price ?? 0) - (b.price ?? 0)))
        return [...priced, ...TRADES.filter((trade) => trade.price === null)]
    }
}

@Component({
    selector: 'app-data-table-external',
    imports: [MDataTable, MText],
    template: `
        <m-data-table label="Trades" sortable pagination [columns]="columns" [source]="trades" />
        <span mText size="sm" tone="muted" class="app-store-state">
            Store: page {{ store.page() }} · sort {{ store.sort()?.key ?? 'none' }} {{ store.sort()?.direction ?? '' }}
        </span>
    `,
    styles: `
        .app-store-state {
            display: block;
            margin-top: var(--mineral-spacing-sm);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableExternalExample {
    protected readonly store = inject(TradesStore)

    // The table reads the store and reports requests back; nothing changes until the store answers.
    protected readonly trades = externalMDataSource<Trade>({
        items: this.store.items,
        total: this.store.total,
        page: this.store.page,
        pageSize: this.store.pageSize,
        sort: this.store.sort,
        loading: this.store.loading,
        onPage: (page) => this.store.setPage(page),
        onSort: (sort) => this.store.setSort(sort),
    })
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'id', label: 'Trade', rowHeader: true, sortable: false},
        {key: 'item', label: 'Item'},
        {key: 'realm', label: 'Realm'},
        {key: 'price', label: 'Price (g)', align: 'right'},
    ]
}
