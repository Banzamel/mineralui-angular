import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import {MInputSearch} from '@banzamel/mineralui-angular/inputs/input-search'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import inputSearchFilter from '@generated/examples/specialized-inputs/input-search/input-search-filter'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-input-search-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputSearch],
    template: `
        <doc-article
            title="MInputSearch"
            description="Text input wired for live search: a leading magnifier icon, a debounced (searched) output that batches keystrokes, an Enter shortcut to search immediately, and a clear button that resets the query in a single click."
        >
            <doc-section title="Playground" description="The log shows every (searched) emission.">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-search
                        label="Search"
                        [variant]="variant()"
                        [size]="size()"
                        [rounded]="rounded()"
                        [debounceMs]="debounceMs()"
                        [disabled]="disabled()"
                        (searched)="log.set($event)"
                        [helperText]="'Last search: ' + (log() === null ? '—' : '“' + log() + '”')"
                    />
                </doc-playground>
            </doc-section>

            <doc-section title="Filtering a list" description="Drive a computed filter from the debounced query.">
                <doc-preview [example]="examples.inputSearchFilter" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputSearch" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearchPage {
    protected readonly examples = {inputSearchFilter}

    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly rounded = signal(true)
    protected readonly debounceMs = signal(300)
    protected readonly disabled = signal(false)
    protected readonly log = signal<string | null>(null)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        booleanControl('rounded', this.rounded),
        sliderControl('debounceMs', this.debounceMs, {min: 0, max: 1000, step: 100}),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Search"',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.rounded() && 'rounded',
            this.debounceMs() !== 300 && `[debounceMs]="${this.debounceMs()}"`,
            this.disabled() && 'disabled',
            '(searched)="search($event)"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-search\n    ${attrs.join('\n    ')}\n/>`
    })
}
