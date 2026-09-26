import {ChangeDetectionStrategy, Component, inject, Injectable} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {applyMDataQuery, injectMDataSource} from '@banzamel/mineralui-angular/data/data-source'
import type {MDataFilterKey, MDataPage, MDataQuery} from '@banzamel/mineralui-angular/data/data-source'
import {MDataTable} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {delay, of} from 'rxjs'
import type {Observable} from 'rxjs'

interface Invoice {
    readonly id: string
    readonly customer: string
    readonly status: 'Paid' | 'Open' | 'Overdue'
    readonly total: number
}

const CUSTOMERS = ['Apex Digital', 'Greenline', 'Summit Partners', 'Northwind', 'Blue Harbor', 'Kite & Co']
const STATUSES = ['Paid', 'Open', 'Overdue'] as const
const INVOICES: readonly Invoice[] = Array.from({length: 42}, (_, index) => ({
    id: `INV-${String(1001 + index)}`,
    customer: CUSTOMERS[index % CUSTOMERS.length] ?? 'Unknown',
    status: STATUSES[(index * 7) % STATUSES.length] ?? 'Open',
    total: 120 + ((index * 379) % 4800),
}))

/**
 * Stands in for your HTTP service: `return this.http.get<MDataPage<Invoice>>('/api/invoices', {params})`.
 * Here the "server" runs the same query on an array, with a delay.
 */
@Injectable({providedIn: 'root'})
class InvoicesApi {
    list(query: MDataQuery): Observable<MDataPage<Invoice>> {
        return of(applyMDataQuery(INVOICES, query, {searchKeys: ['id', 'customer']})).pipe(delay(500))
    }
}

@Component({
    selector: 'app-data-table-server',
    imports: [MButton, MDataTable, MText],
    template: `
        <m-data-table
            label="Invoices"
            sortable
            searchable
            pagination
            [columns]="columns"
            [source]="invoices"
            [filterKeys]="filterKeys"
        />
        <div class="app-server-status">
            <span mText size="sm" tone="muted">
                {{ invoices.total() }} invoices · page {{ invoices.page() }}
                @if (invoices.error(); as error) {
                    · {{ error.message }}
                }
            </span>
            <button mButton size="sm" variant="outlined" (click)="invoices.reload()">Reload</button>
        </div>
    `,
    styles: `
        .app-server-status {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: var(--mineral-spacing-sm);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableServerExample {
    private readonly api = inject(InvoicesApi)

    protected readonly invoices = injectMDataSource<Invoice>((query) => this.api.list(query), {pageSize: 6})
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'id', label: 'Invoice', rowHeader: true},
        {key: 'customer', label: 'Customer'},
        {key: 'status', label: 'Status'},
        {key: 'total', label: 'Total (EUR)', align: 'right'},
    ]
    // Options are listed explicitly: the source only holds the current page.
    protected readonly filterKeys: readonly MDataFilterKey[] = [{key: 'status', label: 'Status', options: STATUSES}]
}
