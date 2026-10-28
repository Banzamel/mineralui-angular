import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MPagination} from '@banzamel/mineralui-angular/layout/pagination'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'

const ORDERS = Array.from({length: 95}, (_, index) => `Order #${1001 + index}`)

@Component({
    selector: 'app-pagination-page-size',
    imports: [MList, MListItem, MPagination, MStack],
    template: `
        <m-stack align="start">
            <ol mList [attr.start]="(page() - 1) * pageSize() + 1">
                @for (order of visible(); track order) {
                    <li mListItem>{{ order }}</li>
                }
            </ol>
            <!-- Both extras are opt-in: showRange for "1–5 of 95", pageSizeOptions for the select. -->
            <nav
                mPagination
                label="Order pages"
                showRange
                [total]="orders.length"
                [pageSizeOptions]="[5, 10, 25]"
                [(pageSize)]="pageSize"
                [(page)]="page"
            ></nav>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationPageSizeExample {
    protected readonly orders = ORDERS
    protected readonly page = signal(1)
    // A new size keeps the first order of the page on screen — the page follows.
    protected readonly pageSize = signal(5)
    protected readonly visible = computed(() =>
        this.orders.slice((this.page() - 1) * this.pageSize(), this.page() * this.pageSize())
    )
}
