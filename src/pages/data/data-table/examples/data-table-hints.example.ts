import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MSort} from '@banzamel/mineralui-angular/data/data-source'
import {MDataTable} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Offer {
    readonly id: string
    readonly item: string
    readonly realm: string
    readonly price: number
    readonly profit: number
}

const OFFERS: readonly Offer[] = [
    {id: 'o1', item: 'Copper ore', realm: 'Silvermoon', price: 12, profit: 3},
    {id: 'o2', item: 'Silk cloth', realm: 'Draenor', price: 48, profit: 15},
    {id: 'o3', item: 'Iron bar', realm: 'Silvermoon', price: 95, profit: -4},
    {id: 'o4', item: 'Healing potion', realm: 'Kazzak', price: 30, profit: 22},
    {id: 'o5', item: 'Mithril bar', realm: 'Draenor', price: 160, profit: 41},
]

@Component({
    selector: 'app-data-table-hints',
    imports: [MDataTable, MText],
    template: `
        <!-- Hover or focus a dotted header for its hint; Price and Profit sort descending on the first click. -->
        <m-data-table label="Offers" sortable [columns]="columns" [data]="offers" [(sort)]="sort" />
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
export class DataTableHintsExample {
    protected readonly offers = OFFERS
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'item', label: 'Item'},
        // A header that does not sort becomes a tab stop when it has a hint.
        {key: 'realm', label: 'Realm', sortable: false, hint: 'Server the offer was seen on'},
        {key: 'price', label: 'Price', align: 'right', sortFirst: 'desc', hint: 'Lowest buyout, in gold'},
        {
            key: 'profit',
            label: 'Profit',
            align: 'right',
            sortFirst: 'desc',
            hint: 'Sale price minus the purchase price and the 5% auction house cut',
        },
    ]
    protected readonly sort = signal<readonly MSort[]>([])
    protected readonly sortText = computed(
        () =>
            this.sort()
                .map((key) => `${key.key} ${key.direction}`)
                .join(' → ') || 'none'
    )
}
