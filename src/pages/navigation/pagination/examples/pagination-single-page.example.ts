import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MSegment, MSegmented} from '@banzamel/mineralui-angular/controls/segmented'
import {MPagination} from '@banzamel/mineralui-angular/layout/pagination'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-pagination-single-page',
    imports: [MPagination, MSegment, MSegmented, MStack],
    template: `
        <m-stack align="start">
            <m-segmented ariaLabel="Results" size="sm" [(value)]="results">
                <m-segment value="4">4 results</m-segment>
                <m-segment value="36">36 results</m-segment>
            </m-segmented>
            <!-- One page: the buttons go, the range and the page size select stay. -->
            <nav
                mPagination
                label="Results pages"
                hideSinglePage
                showRange
                [total]="total()"
                [pageSizeOptions]="[5, 10, 50]"
                [(pageSize)]="pageSize"
                [(page)]="page"
            ></nav>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationSinglePageExample {
    protected readonly results = signal<string | undefined>('4')
    protected readonly pageSize = signal(10)
    protected readonly page = signal(1)
    protected readonly total = computed(() => Number(this.results() ?? 0))
}
