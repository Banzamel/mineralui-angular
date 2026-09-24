import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import {MInputNumber} from '@banzamel/mineralui-angular/inputs/input-number'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import inputNumberForm from '@generated/examples/specialized-inputs/input-number/input-number-form'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-input-number-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputNumber],
    template: `
        <doc-article
            title="MInputNumber"
            description="Numeric field with a number value, stepper buttons, keyboard stepping and decimal precision."
        >
            <doc-section
                title="Playground"
                description="Hold a stepper button to repeat; ArrowUp / ArrowDown step, PageUp / PageDown step ten times. The value snaps to min, max and precision on blur."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-number
                        label="Seats available"
                        placeholder="24"
                        helperText="Use the steppers for admin-style numeric controls."
                        [variant]="variant()"
                        [size]="size()"
                        [min]="min()"
                        [max]="max()"
                        [step]="resolvedStep()"
                        [precision]="precision()"
                        [showStepper]="showStepper()"
                        [allowNegative]="allowNegative()"
                        [clearable]="clearable()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Forms"
                description="The control holds a number (null when empty), so Angular's Validators.min / max work on it directly. The field follows the WAI-ARIA spinbutton pattern."
            >
                <doc-preview [example]="examples.inputNumberForm" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputNumber" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberPage {
    protected readonly examples = {inputNumberForm}

    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly min = signal(0)
    protected readonly max = signal(250)
    protected readonly step = signal(1)
    protected readonly precision = signal(0)
    protected readonly showStepper = signal(true)
    protected readonly allowNegative = signal(false)
    protected readonly clearable = signal(true)
    protected readonly disabled = signal(false)

    // Whole steps would never reach the decimals, like in the docs-react playground.
    protected readonly resolvedStep = computed(() => (this.precision() === 0 ? this.step() : 0.25))

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        sliderControl('min', this.min, {min: -50, max: 50, step: 5}),
        sliderControl('max', this.max, {min: 50, max: 500, step: 10}),
        sliderControl('step', this.step, {min: 1, max: 20}),
        sliderControl('precision', this.precision, {min: 0, max: 3}),
        booleanControl('showStepper', this.showStepper),
        booleanControl('allowNegative', this.allowNegative),
        booleanControl('clearable', this.clearable),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Seats available"',
            `[min]="${this.min()}"`,
            `[max]="${this.max()}"`,
            this.resolvedStep() !== 1 && `[step]="${this.resolvedStep()}"`,
            this.precision() !== 0 && `[precision]="${this.precision()}"`,
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            !this.showStepper() && '[showStepper]="false"',
            !this.allowNegative() && '[allowNegative]="false"',
            this.clearable() && 'clearable',
            this.disabled() && 'disabled',
            '[(value)]="seats"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-number\n    ${attrs.join('\n    ')}\n/>`
    })
}
