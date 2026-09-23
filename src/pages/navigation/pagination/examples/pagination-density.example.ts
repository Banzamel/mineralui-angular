import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MPagination} from '@banzamel/mineralui-angular/layout/pagination'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-pagination-density',
    imports: [MPagination, MStack],
    template: `
        <m-stack align="start">
            <!-- More neighbours around the current page and two fixed pages at each end. -->
            <nav mPagination label="Wide" [total]="500" [siblings]="2" [boundaries]="2" [(page)]="wide"></nav>
            <!-- Only the current page between the ends. -->
            <nav mPagination label="Compact" [total]="500" [siblings]="0" [(page)]="compact"></nav>
            <!-- Previous / next with a "3 / 50" counter, announced as it changes. -->
            <nav mPagination label="Simple" variant="simple" [total]="500" [(page)]="simple"></nav>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationDensityExample {
    protected readonly wide = signal(12)
    protected readonly compact = signal(12)
    protected readonly simple = signal(3)
}
