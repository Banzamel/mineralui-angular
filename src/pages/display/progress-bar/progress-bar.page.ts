import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MProgressBar} from '@banzamel/mineralui-angular/display/progress-bar'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import progressBarUploads from '@generated/examples/display/progress-bar/progress-bar-uploads'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-progress-bar-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MProgressBar],
    template: `
        <doc-article
            title="MProgressBar"
            description="Horizontal progress indicator with animated value, stripe styling and token-based colors."
        >
            <doc-section title="Playground" description="Preview size, color and stripe variants.">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-progress-bar
                        class="doc-progress-bar-stage"
                        [value]="value()"
                        [max]="max()"
                        [color]="color()"
                        [size]="size()"
                        [label]="label() ? 'Upload progress' : undefined"
                        [ariaLabel]="label() ? undefined : 'Upload progress'"
                        [showValue]="showValue()"
                        [striped]="striped()"
                        [animated]="animated()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Several bars"
                description="Each bar is a progressbar named by its label. Without a visible label, give it an ariaLabel."
            >
                <doc-preview [example]="examples.uploads" />
            </doc-section>

            <doc-section
                title="Accessibility and server rendering"
                description="The host is role=progressbar with aria-valuenow / aria-valuemax; the counting percentage is hidden from screen readers. The server renders the final width; the bar grows from zero only when created in the browser. prefers-reduced-motion turns off the fill transition, the counting and the moving stripes."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="The visible label names the bar through aria-labelledby, and ariaLabel covers bars without one. A prerendered page does not animate bars that are already on screen, and reduced motion is respected."
            />

            <doc-section title="MProgressBar API">
                <doc-props-table api="MProgressBar" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-progress-bar-stage {
            max-width: 480px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarPage {
    protected readonly examples = {uploads: progressBarUploads}

    protected readonly value = signal(65)
    protected readonly max = signal(100)
    protected readonly color = signal<MColor>('primary')
    protected readonly size = signal<MSize>('md')
    protected readonly label = signal(true)
    protected readonly showValue = signal(true)
    protected readonly striped = signal(false)
    protected readonly animated = signal(false)
    protected readonly controls = [
        sliderControl('value', this.value, {min: 0, max: 100, step: 5}),
        sliderControl('max', this.max, {min: 50, max: 200, step: 10}),
        selectControl('color', this.color, COLORS),
        selectControl('size', this.size, SIZES),
        booleanControl('label', this.label),
        booleanControl('showValue', this.showValue),
        booleanControl('striped', this.striped),
        booleanControl('animated', this.animated),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            `[value]="${this.value()}"`,
            this.max() !== 100 && `[max]="${this.max()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.label() ? 'label="Upload progress"' : 'ariaLabel="Upload progress"',
            this.showValue() && 'showValue',
            this.striped() && 'striped',
            this.animated() && 'animated',
        ].filter((attr) => typeof attr === 'string')
        return `<m-progress-bar ${attrs.join(' ')} />`
    })
}
