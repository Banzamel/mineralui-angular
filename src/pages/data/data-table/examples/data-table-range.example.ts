import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MDataTable} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Price {
    readonly sku: string
    readonly product: string
    readonly price: number
}

const PRODUCTS = [
    'Oak shelf',
    'Pine shelf',
    'Wall hook',
    'Coat rack',
    'Shoe bench',
    'Mirror',
    'Key bowl',
    'Umbrella stand',
]

@Component({
    selector: 'app-data-table-range',
    imports: [MButton, MDataTable, MText],
    template: `
        <div class="app-range-bar">
            <span mText size="sm" aria-live="polite">{{ selected().length }} selected</span>
            <button mButton size="sm" [disabled]="!selected().length" (click)="raise()">+10% on selected</button>
        </div>
        <m-data-table
            class="app-price-table"
            label="Prices"
            selectable
            rowKey="sku"
            [columns]="columns"
            [data]="prices()"
            [(selected)]="selected"
        />
    `,
    styles: `
        .app-range-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--mineral-spacing-sm);
            margin-bottom: var(--mineral-spacing-sm);
        }

        /* data-key targets a column without a cell template. */
        .app-price-table td[data-key='price'] {
            font-variant-numeric: tabular-nums;
            font-weight: 600;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableRangeExample {
    protected readonly selected = signal<readonly string[]>([])
    protected readonly prices = signal<readonly Price[]>(
        PRODUCTS.map((product, index) => ({sku: `SKU-${210 + index}`, product, price: 20 + index * 7}))
    )
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'sku', label: 'SKU', rowHeader: true},
        {key: 'product', label: 'Product'},
        {key: 'price', label: 'Price (EUR)', align: 'right'},
    ]

    protected raise(): void {
        const selected = this.selected()
        this.prices.update((prices) =>
            prices.map((item) =>
                selected.includes(item.sku) ? {...item, price: Math.round(item.price * 110) / 100} : item
            )
        )
    }
}
