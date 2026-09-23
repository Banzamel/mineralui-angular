import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MSlider} from '@banzamel/mineralui-angular/controls/slider'
import type {MSliderMark} from '@banzamel/mineralui-angular/controls/slider'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import sliderBudget from '@generated/examples/controls/slider/slider-budget'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const MARKS: readonly MSliderMark[] = [
    {value: 0, label: '0'},
    {value: 25, label: '25'},
    {value: 50, label: '50'},
    {value: 75, label: '75'},
    {value: 100, label: '100'},
]

@Component({
    selector: 'doc-slider-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MSlider],
    template: `
        <doc-article
            title="MSlider"
            description="Range input for selecting a numeric value within a defined range — by pointer or keyboard."
        >
            <doc-section title="Playground" description="Adjust range, step, color and marks.">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-slider
                        label="Volume"
                        [(value)]="value"
                        [min]="min()"
                        [max]="max()"
                        [step]="effectiveStep()"
                        [color]="color()"
                        [marks]="marks() ? marksList : []"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Forms, marks and value text"
                description="MSlider is a ControlValueAccessor. The thumb is a role=slider: arrows move by step, Page Up / Page Down by ten steps, Home / End jump to the ends. Marks are decorative — valueText gives the announced value."
            >
                <doc-preview [example]="examples.sliderBudget" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MSlider" />
            </doc-section>
        </doc-article>
    `,
    styles: 'm-slider { max-width: 28rem; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderPage {
    protected readonly examples = {sliderBudget}
    protected readonly marksList = MARKS

    protected readonly min = signal(0)
    protected readonly max = signal(100)
    protected readonly step = signal(5)
    protected readonly value = signal(40)
    protected readonly color = signal<MColor>('primary')
    protected readonly marks = signal(false)
    protected readonly disabled = signal(false)

    // Marks sit on quarters of 0..100, so the demo snaps to them like docs-react.
    protected readonly effectiveStep = computed(() => (this.marks() ? 25 : this.step()))

    protected readonly controls = [
        sliderControl('min', this.min, {min: 0, max: 40, step: 5}),
        sliderControl('max', this.max, {min: 60, max: 200, step: 10}),
        sliderControl('step', this.step, {min: 1, max: 20}),
        sliderControl('value', this.value, {min: 0, max: 200, step: 5}),
        selectControl('color', this.color, COLORS),
        booleanControl('marks', this.marks),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Volume"',
            '[(value)]="volume"',
            this.min() !== 0 && `[min]="${this.min()}"`,
            this.max() !== 100 && `[max]="${this.max()}"`,
            this.effectiveStep() !== 1 && `[step]="${this.effectiveStep()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.marks() && '[marks]="marks"',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-slider ${attrs.join(' ')} />`
    })
}
