import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MInputSlider} from '@banzamel/mineralui-angular/inputs/input-slider'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import inputSliderForm from '@generated/examples/specialized-inputs/input-slider/input-slider-form'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SIZES: readonly MSize[] = ['sm', 'md', 'lg']
const COLORS: readonly MColor[] = ['primary', 'success', 'warning', 'error', 'info', 'neutral']
const MARKS = [
    {value: 0, label: '0%'},
    {value: 50, label: '50%'},
    {value: 100, label: '100%'},
] as const

@Component({
    selector: 'doc-input-slider-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputSlider],
    template: `
        <doc-article
            title="MInputSlider"
            description="Slider paired with a text field for the exact value; both change one number."
        >
            <doc-section
                title="Playground"
                description="A typed value inside min / max applies at once; anything else is clamped and rounded to precision on blur."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-slider
                        label="Discount"
                        [(value)]="value"
                        [step]="step()"
                        [precision]="precision()"
                        [marks]="showMarks() ? marks : []"
                        [showInput]="showInput()"
                        [size]="size()"
                        [color]="color()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Forms"
                description="As a form control the value is a number; Validators.min / max report while the slider still allows the whole range."
            >
                <doc-preview [example]="examples.inputSliderForm" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputSlider" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSliderPage {
    protected readonly examples = {inputSliderForm}
    protected readonly marks = MARKS

    protected readonly value = signal(30)
    protected readonly step = signal(1)
    protected readonly precision = signal(0)
    protected readonly showMarks = signal(true)
    protected readonly showInput = signal(true)
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly disabled = signal(false)

    protected readonly controls = [
        sliderControl('step', this.step, {min: 1, max: 25}),
        sliderControl('precision', this.precision, {min: 0, max: 2}),
        booleanControl('marks', this.showMarks),
        booleanControl('showInput', this.showInput),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Discount"',
            this.step() !== 1 && `[step]="${this.step()}"`,
            this.precision() !== 0 && `[precision]="${this.precision()}"`,
            this.showMarks() && '[marks]="marks"',
            !this.showInput() && '[showInput]="false"',
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.disabled() && 'disabled',
            '[(value)]="discount"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-slider\n    ${attrs.join('\n    ')}\n/>`
    })
}
