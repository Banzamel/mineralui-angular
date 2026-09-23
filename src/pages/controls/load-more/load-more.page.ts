import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import type {MButtonVariant} from '@banzamel/mineralui-angular/controls/button'
import {MLoadMore} from '@banzamel/mineralui-angular/controls/load-more'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import loadMoreAuto from '@generated/examples/controls/load-more/load-more-auto'
import loadMoreList from '@generated/examples/controls/load-more/load-more-list'
import loadMoreStates from '@generated/examples/controls/load-more/load-more-states'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MButtonVariant[] = ['filled', 'secondary', 'outlined', 'ghost', 'link']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const TOTAL = 24
const PAGE_SIZE = 4

@Component({
    selector: 'doc-load-more-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MButton, MLoadMore, MList, MListItem],
    template: `
        <doc-article
            title="MLoadMore"
            description="Incremental loading control for lists and feeds — click to load the next page or enable auto-loading on scroll."
        >
            <doc-section
                title="Playground"
                description="Click the button or enable auto mode to load items incrementally. A simulated 800 ms delay shows the loading state."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <div class="doc-load-more-stage">
                        <ol mList>
                            @for (item of items(); track item) {
                                <li mListItem>Item {{ item }}</li>
                            }
                        </ol>
                        <m-load-more
                            [loading]="loading()"
                            [hasMore]="count() < total"
                            [loaded]="showCount() ? count() : undefined"
                            [total]="showCount() ? total : undefined"
                            [auto]="auto()"
                            [variant]="variant()"
                            [color]="color()"
                            (loadMore)="loadMore()"
                        />
                        <button mButton variant="link" size="sm" color="neutral" (click)="reset()">Reset list</button>
                    </div>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Paged list"
                description="Bind loaded and total to show the counter and the progress bar; the counter is a polite live region, so screen readers hear the new total."
            >
                <doc-preview [example]="examples.loadMoreList" />
            </doc-section>

            <doc-section
                title="Auto-loading"
                description="auto observes the control with IntersectionObserver and emits loadMore as it scrolls into view — the button stays as a fallback. Auto-loading pauses while loading is true."
            >
                <doc-preview [example]="examples.loadMoreAuto" />
            </doc-section>

            <doc-section
                title="Variants, labels and the done state"
                description="Labels default to the translated mineralui.loadMore.* keys; label, loadingLabel and doneLabel override them."
            >
                <doc-preview [example]="examples.loadMoreStates" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MLoadMore" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-load-more-stage {
            width: min(420px, 100%);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMorePage {
    protected readonly examples = {loadMoreAuto, loadMoreList, loadMoreStates}
    protected readonly total = TOTAL

    protected readonly auto = signal(false)
    protected readonly showCount = signal(true)
    protected readonly variant = signal<MButtonVariant>('outlined')
    protected readonly color = signal<MColor>('primary')
    protected readonly count = signal(PAGE_SIZE)
    protected readonly loading = signal(false)
    protected readonly items = computed(() => Array.from({length: this.count()}, (_, index) => index + 1))

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('color', this.color, COLORS),
        booleanControl('auto', this.auto),
        booleanControl('showCount', this.showCount),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '[loading]="loading()"',
            '[hasMore]="items().length < total"',
            this.showCount() && '[loaded]="items().length"',
            this.showCount() && '[total]="total"',
            this.auto() && 'auto',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            '(loadMore)="fetchNextPage()"',
        ].filter((attr) => typeof attr === 'string')

        return `<m-load-more\n${attrs.map((attr) => `    ${attr}`).join('\n')}\n/>`
    })

    private timer: ReturnType<typeof setTimeout> | undefined

    constructor() {
        inject(DestroyRef).onDestroy(() => clearTimeout(this.timer))
    }

    protected loadMore(): void {
        this.loading.set(true)
        this.timer = setTimeout(() => {
            this.count.update((count) => Math.min(count + PAGE_SIZE, TOTAL))
            this.loading.set(false)
        }, 800)
    }

    protected reset(): void {
        clearTimeout(this.timer)
        this.loading.set(false)
        this.count.set(PAGE_SIZE)
    }
}
