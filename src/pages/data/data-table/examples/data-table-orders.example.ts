import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MDataTable, MDataTableCell} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataFilterKey, MDataSortKey} from '@banzamel/mineralui-angular/data/data-source'
import {MTimeAgo} from '@banzamel/mineralui-angular/display/time-ago'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {mEllipsisVerticalIcon, MIcon} from '@banzamel/mineralui-angular/icons'
import {MDropdownDivider, MDropdownItem, MDropdownMenu} from '@banzamel/mineralui-angular/overlays/dropdown-menu'
import {MPopoverTrigger} from '@banzamel/mineralui-angular/primitives/popover'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Order {
    readonly id: string
    readonly product: string
    readonly description: string
    readonly customer: string
    readonly customerEmail: string
    readonly amount: string
    readonly updatedAt: Date
    readonly status: 'Completed' | 'Processing' | 'Pending'
}

const HOUR = 60 * 60 * 1000

@Component({
    selector: 'app-data-table-orders',
    imports: [
        MBadge,
        MButton,
        MDataTable,
        MDataTableCell,
        MDropdownDivider,
        MDropdownItem,
        MDropdownMenu,
        MIcon,
        MPopoverTrigger,
        MText,
        MTimeAgo,
    ],
    template: `
        <m-data-table
            label="Recent orders"
            sortable
            searchable
            [columns]="columns"
            [data]="orders"
            [searchKeys]="['product', 'customer', 'customerEmail']"
            [filterKeys]="filterKeys"
            [sortKeys]="sortKeys"
        >
            <ng-template mCell="product" [mCellOf]="orders" let-order>
                <span class="app-cell">
                    <span mText weight="semibold">{{ order.product }}</span>
                    <span mText tone="muted" size="sm">{{ order.description }}</span>
                </span>
            </ng-template>
            <ng-template mCell="customer" [mCellOf]="orders" let-order>
                <span class="app-cell">
                    <span mText>{{ order.customer }}</span>
                    <span mText tone="muted" size="sm">{{ order.customerEmail }}</span>
                </span>
            </ng-template>
            <ng-template mCell="amount" [mCellOf]="orders" let-order>
                <span class="app-cell">
                    <span mText weight="semibold">{{ order.amount }}</span>
                    <span mText tone="muted" size="sm"
                        ><time mTimeAgo [value]="order.updatedAt" maxRelative="30d"></time
                    ></span>
                </span>
            </ng-template>
            <ng-template mCell="status" [mCellOf]="orders" let-order>
                <m-badge [color]="statusColor(order.status)">{{ order.status }}</m-badge>
            </ng-template>
            <ng-template mCell="id" [mCellOf]="orders" let-order>
                <button
                    mButton
                    variant="ghost"
                    iconOnly
                    shape="circle"
                    size="sm"
                    [attr.aria-label]="'Actions for ' + order.id"
                    [mPopoverTrigger]="menu"
                >
                    <m-icon [icon]="moreIcon" />
                </button>
                <m-dropdown-menu #menu placement="bottom-end">
                    <button mDropdownItem>View details</button>
                    <button mDropdownItem>Download invoice</button>
                    <m-dropdown-divider />
                    <button mDropdownItem color="error">Cancel order</button>
                </m-dropdown-menu>
            </ng-template>
        </m-data-table>
    `,
    styles: `
        .app-cell {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableOrdersExample {
    protected readonly moreIcon = mEllipsisVerticalIcon
    protected readonly orders: readonly Order[] = [
        {
            id: 'ORD-7821',
            product: 'MineralUI Pro License',
            description: 'Annual team license, 10 seats',
            customer: 'Greenline Logistics',
            customerEmail: 'procurement@greenline.io',
            amount: 'EUR 4,900.00',
            updatedAt: new Date(Date.now() - 2 * HOUR),
            status: 'Completed',
        },
        {
            id: 'ORD-7822',
            product: 'Enterprise Support Plan',
            description: '24/7 priority support, SLA 4h',
            customer: 'Apex Digital',
            customerEmail: 'ops@apexdigital.com',
            amount: 'EUR 12,000.00',
            updatedAt: new Date(Date.now() - 26 * HOUR),
            status: 'Processing',
        },
        {
            id: 'ORD-7823',
            product: 'Custom Theme Package',
            description: 'Brand-aligned theme tokens + dark mode',
            customer: 'Summit Partners',
            customerEmail: 'design@summit.co',
            amount: 'EUR 2,200.00',
            updatedAt: new Date(Date.now() - 8 * 24 * HOUR),
            status: 'Pending',
        },
    ]
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'product', label: 'Order'},
        {key: 'customer', label: 'Customer'},
        {key: 'amount', label: 'Amount'},
        {key: 'status', label: 'Status'},
        {key: 'id', label: 'Actions', sortable: false, searchable: false, width: 72, align: 'center'},
    ]
    protected readonly filterKeys: readonly MDataFilterKey[] = [{key: 'status', label: 'Status'}]
    protected readonly sortKeys: readonly MDataSortKey[] = [
        {key: 'product', label: 'Product'},
        {key: 'customer', label: 'Customer'},
    ]

    protected statusColor(status: Order['status']): MColor {
        if (status === 'Completed') return 'success'
        return status === 'Processing' ? 'info' : 'warning'
    }
}
