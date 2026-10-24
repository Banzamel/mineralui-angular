import {MDataTable} from '@banzamel/mineralui/data'
import type {MDataTableColumn} from '@banzamel/mineralui/data'
import {MBadge} from '@banzamel/mineralui/feedback'

interface Order {
    id: string
    customer: string
    status: 'Paid' | 'Pending'
}

const orders: Order[] = [
    {id: 'ORD-1', customer: 'Apex Digital', status: 'Paid'},
    {id: 'ORD-2', customer: 'Summit Partners', status: 'Pending'},
]

const columns: MDataTableColumn<Order>[] = [
    {key: 'customer', label: 'Customer'},
    {
        key: 'status',
        label: 'Status',
        render: (_value, order) => (
            <MBadge color={order.status === 'Paid' ? 'success' : 'warning'}>{order.status}</MBadge>
        ),
    },
]

export function OrdersTable() {
    return <MDataTable columns={columns} data={orders} />
}
