import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MSpinner} from '@banzamel/mineralui-angular/feedback/spinner'
import type {MSpinnerColor} from '@banzamel/mineralui-angular/feedback/spinner'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import spinnerInline from '@generated/examples/feedback/spinner/spinner-inline'
import spinnerSizes from '@generated/examples/feedback/spinner/spinner-sizes'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MSpinnerColor[] = [
    'primary',
    'neutral',
    'success',
    'error',
    'warning',
    'info',
    'light',
    'dark',
    'news',
    'inherit',
]

@Component({
    selector: 'doc-spinner-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MSpinner],
    template: `
        <doc-article
            title="MSpinner"
            description="Minimal loading indicator for async content, form submits and route fallbacks."
        >
            <doc-section title="Playground" description="Toggle inputs to preview spinner combinations.">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-spinner [size]="size()" [color]="color()" />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Sizes"
                description="Five steps from the size scale, or a diameter in pixels for anything in between."
            >
                <doc-preview [example]="examples.spinnerSizes" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The spinner is a live status named by label (default: the mineralui.spinner.label text, “Loading”). When nearby text already announces the state, hide the spinner with aria-hidden and put the status on the text."
            >
                <doc-preview [example]="examples.spinnerInline" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MSpinner" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerPage {
    protected readonly examples = {spinnerInline, spinnerSizes}

    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MSpinnerColor>('primary')
    protected readonly controls = [selectControl('size', this.size, SIZES), selectControl('color', this.color, COLORS)]

    protected readonly code = computed(() => {
        const attrs = [
            this.size() !== 'md' ? ` size="${this.size()}"` : '',
            this.color() !== 'primary' ? ` color="${this.color()}"` : '',
        ].join('')
        return `<m-spinner${attrs} />`
    })
}
