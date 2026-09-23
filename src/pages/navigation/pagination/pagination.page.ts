import {ChangeDetectionStrategy, Component, computed, effect, signal} from '@angular/core'
import {MPagination} from '@banzamel/mineralui-angular/layout/pagination'
import type {MPaginationVariant} from '@banzamel/mineralui-angular/layout/pagination'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import paginationDensity from '@generated/examples/navigation/pagination/pagination-density'
import paginationResults from '@generated/examples/navigation/pagination/pagination-results'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MPaginationVariant[] = ['numbered', 'simple']
const PAGE_SIZES = ['10', '20', '25'] as const

@Component({
    selector: 'doc-pagination-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MPagination, MStack, MText],
    template: `
        <doc-article
            title="MPagination"
            description="Page navigation component for tables, feeds and search results with numbered and compact modes."
        >
            <doc-section
                title="Playground"
                description="Tune density and collapsing behavior for short lists or larger datasets."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack align="start">
                        <nav
                            mPagination
                            label="Playground pages"
                            [total]="total()"
                            [pageSize]="pageSizeValue()"
                            [siblings]="siblings()"
                            [boundaries]="boundaries()"
                            [variant]="variant()"
                            [(page)]="page"
                        ></nav>
                        <p mText size="sm" tone="muted">Current page: {{ page() }} / {{ totalPages() }}</p>
                    </m-stack>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Paging a list"
                description='Bind the page with [(page)] and slice your data. The host is a nav landmark; the current page button has aria-current="page" and every page button is announced as "Page N" (mineralui.pagination.* keys).'
            >
                <doc-preview [example]="examples.paginationResults" />
            </doc-section>

            <doc-section
                title="Density and the simple variant"
                description='siblings sets how many pages surround the current one, boundaries how many stay fixed at each end; variant="simple" keeps just previous / next and a counter.'
            >
                <doc-preview [example]="examples.paginationDensity" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MPagination" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationPage {
    protected readonly examples = {paginationDensity, paginationResults}

    protected readonly variant = signal<MPaginationVariant>('numbered')
    protected readonly pageSize = signal<(typeof PAGE_SIZES)[number]>('10')
    protected readonly total = signal(180)
    protected readonly siblings = signal(1)
    protected readonly boundaries = signal(1)
    protected readonly page = signal(1)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('pageSize', this.pageSize, PAGE_SIZES),
        sliderControl('total', this.total, {min: 40, max: 500, step: 20}),
        sliderControl('siblings', this.siblings, {min: 0, max: 2}),
        sliderControl('boundaries', this.boundaries, {min: 0, max: 2}),
    ]

    protected readonly pageSizeValue = computed(() => Number(this.pageSize()))
    protected readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSizeValue())))

    protected readonly code = computed(() => {
        const attrs = [
            `[total]="${this.total()}"`,
            this.pageSize() !== '10' && `[pageSize]="${this.pageSize()}"`,
            this.variant() !== 'numbered' && `variant="${this.variant()}"`,
            this.siblings() !== 1 && `[siblings]="${this.siblings()}"`,
            this.boundaries() !== 1 && `[boundaries]="${this.boundaries()}"`,
            '[(page)]="page"',
        ].filter((attr) => typeof attr === 'string')

        return `<nav mPagination ${attrs.join(' ')}></nav>`
    })

    constructor() {
        // Keep the page in range when the playground shrinks the data set.
        effect(() => {
            const last = this.totalPages()
            if (this.page() > last) this.page.set(last)
        })
    }
}
