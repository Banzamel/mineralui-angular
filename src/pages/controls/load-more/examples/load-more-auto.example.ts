import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core'
import {MLoadMore} from '@banzamel/mineralui-angular/controls/load-more'
import {MSimpleGrid} from '@banzamel/mineralui-angular/layout/simple-grid'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const TOTAL = 18
const PAGE_SIZE = 6

@Component({
    selector: 'app-load-more-auto',
    imports: [MLoadMore, MSimpleGrid, MSurface, MText],
    template: `
        <m-simple-grid [columns]="3">
            @for (card of cards(); track card) {
                <div mSurface tone="subtle">
                    <span mText weight="semibold">Card {{ card }}</span>
                </div>
            }
        </m-simple-grid>
        <!-- auto: the next page loads when the control comes within autoThreshold px of the viewport. -->
        <m-load-more
            auto
            [autoThreshold]="0"
            label="Load more cards"
            [loading]="loading()"
            [hasMore]="cards().length < total"
            (loadMore)="loadNextPage()"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMoreAutoExample {
    protected readonly total = TOTAL
    protected readonly cards = signal(Array.from({length: PAGE_SIZE}, (_, index) => index + 1))
    protected readonly loading = signal(false)

    private timer: ReturnType<typeof setTimeout> | undefined

    constructor() {
        inject(DestroyRef).onDestroy(() => clearTimeout(this.timer))
    }

    protected loadNextPage(): void {
        this.loading.set(true)
        this.timer = setTimeout(() => {
            this.cards.update((cards) => [
                ...cards,
                ...Array.from({length: PAGE_SIZE}, (_, index) => cards.length + index + 1),
            ])
            this.loading.set(false)
        }, 800)
    }
}
