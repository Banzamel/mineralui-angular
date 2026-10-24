import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MDataTable, MDataTableCell} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'

interface Order {
    readonly id: string
    readonly customer: string
    readonly status: 'Paid' | 'Pending'
}

@Component({
    selector: 'app-orders-table',
    imports: [MBadge, MDataTable, MDataTableCell],
    template: `
        <m-data-table label="Orders" [columns]="columns" [data]="orders">
            <!-- render: (value, row) => … → a template per column; [mCellOf] types let-order as Order. -->
            <ng-template mCell="status" [mCellOf]="orders" let-order>
                <m-badge [color]="order.status === 'Paid' ? 'success' : 'warning'">{{ order.status }}</m-badge>
            </ng-template>
        </m-data-table>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersTable {
    protected readonly orders: readonly Order[] = [
        {id: 'ORD-1', customer: 'Apex Digital', status: 'Paid'},
        {id: 'ORD-2', customer: 'Summit Partners', status: 'Pending'},
    ]
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'customer', label: 'Customer'},
        {key: 'status', label: 'Status'},
    ]
}
