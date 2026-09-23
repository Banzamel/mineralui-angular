import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MPagination} from '@banzamel/mineralui-angular/layout/pagination'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'

const RESULTS = Array.from({length: 47}, (_, index) => `Result ${index + 1}`)
const PAGE_SIZE = 5

@Component({
    selector: 'app-pagination-results',
    imports: [MList, MListItem, MPagination, MStack],
    template: `
        <m-stack align="start">
            <ol mList [attr.start]="(page() - 1) * pageSize + 1">
                @for (result of visible(); track result) {
                    <li mListItem>{{ result }}</li>
                }
            </ol>
            <!-- [(page)] is a two-way model; the landmark is named by label. -->
            <nav
                mPagination
                label="Search results pages"
                [total]="results.length"
                [pageSize]="pageSize"
                [(page)]="page"
            ></nav>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationResultsExample {
    protected readonly results = RESULTS
    protected readonly pageSize = PAGE_SIZE
    protected readonly page = signal(1)
    protected readonly visible = computed(() =>
        this.results.slice((this.page() - 1) * PAGE_SIZE, this.page() * PAGE_SIZE)
    )
}
