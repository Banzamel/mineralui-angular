import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MCard, MCardBody, MCardHeader} from '@banzamel/mineralui-angular/cards/card'
import {MDataTable} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'

interface Invoice {
    readonly id: string
    readonly client: string
    readonly issued: string
    readonly amount: number
}

const CLIENTS = ['Acme', 'Globex', 'Initech', 'Umbrella', 'Hooli', 'Stark']
const INVOICES: readonly Invoice[] = Array.from({length: 37}, (_, index) => ({
    id: `FV/${String(index + 1).padStart(3, '0')}/2026`,
    client: CLIENTS[index % CLIENTS.length] ?? 'Acme',
    issued: `2026-${String((index % 9) + 1).padStart(2, '0')}-${String((index % 27) + 1).padStart(2, '0')}`,
    amount: 300 + ((index * 977) % 4200),
}))

@Component({
    selector: 'app-data-table-card',
    imports: [MCard, MCardBody, MCardHeader, MDataTable, MHeading],
    template: `
        <m-card>
            <m-card-header><h3 mHeading>Invoices</h3></m-card-header>
            <m-card-body>
                <!-- bordered=false: the card is the frame. The page size select and the range are opt-in. -->
                <m-data-table
                    label="Invoices"
                    sortable
                    pagination
                    paginationRange
                    [bordered]="false"
                    [columns]="columns"
                    [data]="invoices"
                    [pageSizeOptions]="[5, 10, 25]"
                    [(pageSize)]="pageSize"
                />
            </m-card-body>
        </m-card>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableCardExample {
    protected readonly invoices = INVOICES
    protected readonly pageSize = signal(5)
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'id', label: 'Invoice', rowHeader: true},
        {key: 'client', label: 'Client'},
        {key: 'issued', label: 'Issued'},
        {key: 'amount', label: 'Amount', align: 'right'},
    ]
}
