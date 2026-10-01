import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MDataTable, MDataTableCell, MDataTableRowDetail} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn, MDataTableExpandMode} from '@banzamel/mineralui-angular/data/data-table'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MToggle} from '@banzamel/mineralui-angular/controls/toggle'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Line {
    readonly product: string
    readonly quantity: number
    readonly price: number
}

interface Order {
    readonly id: string
    readonly customer: string
    readonly status: 'Shipped' | 'Packing' | 'New'
    readonly lines: readonly Line[]
}

@Component({
    selector: 'app-data-table-detail',
    imports: [MBadge, MDataTable, MDataTableCell, MDataTableRowDetail, MText, MToggle],
    template: `
        <m-toggle class="app-detail-mode" [checked]="single()" (checkedChange)="single.set($event)">
            One open row at a time
        </m-toggle>
        <m-data-table
            label="Orders"
            rowClick="expand"
            [columns]="columns"
            [data]="orders"
            [expandMode]="mode()"
            [(expanded)]="expanded"
        >
            <ng-template mCell="status" [mCellOf]="orders" let-order>
                <m-badge [color]="order.status === 'Shipped' ? 'success' : 'info'">{{ order.status }}</m-badge>
            </ng-template>
            <ng-template mRowDetail [mRowDetailOf]="orders" let-order>
                <ul class="app-lines">
                    @for (line of order.lines; track line.product) {
                        <li>
                            <span mText>{{ line.quantity }} × {{ line.product }}</span>
                            <span mText tone="muted">{{ line.quantity * line.price }} EUR</span>
                        </li>
                    }
                </ul>
            </ng-template>
        </m-data-table>
        <span mText size="sm" tone="muted" class="app-detail-state">Open: {{ expanded().join(', ') || 'none' }}</span>
    `,
    styles: `
        .app-detail-mode {
            margin-bottom: var(--mineral-spacing-sm);
        }

        .app-lines {
            display: grid;
            gap: 4px;
            max-width: 420px;
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .app-lines li {
            display: flex;
            justify-content: space-between;
            gap: var(--mineral-spacing-md);
        }

        .app-detail-state {
            display: block;
            margin-top: var(--mineral-spacing-sm);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableDetailExample {
    protected readonly single = signal(false)
    protected readonly mode = (): MDataTableExpandMode => (this.single() ? 'single' : 'multiple')
    protected readonly expanded = signal<readonly string[]>(['SO-1042'])
    protected readonly orders: readonly Order[] = [
        {
            id: 'SO-1041',
            customer: 'Apex Digital',
            status: 'Shipped',
            lines: [
                {product: 'Desk lamp', quantity: 4, price: 39},
                {product: 'USB-C hub', quantity: 2, price: 59},
            ],
        },
        {
            id: 'SO-1042',
            customer: 'Greenline',
            status: 'Packing',
            lines: [{product: 'Standing desk', quantity: 1, price: 489}],
        },
        {
            id: 'SO-1043',
            customer: 'Northwind',
            status: 'New',
            lines: [
                {product: 'Monitor arm', quantity: 3, price: 89},
                {product: 'Cable tray', quantity: 3, price: 25},
                {product: 'Footrest', quantity: 1, price: 45},
            ],
        },
    ]
    // The expander column goes last here; without it the expand buttons get a first column of their own.
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'id', label: 'Order', rowHeader: true},
        {key: 'customer', label: 'Customer'},
        {key: 'status', label: 'Status'},
        {key: 'details', label: '', expander: true},
    ]
}
