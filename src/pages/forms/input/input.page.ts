import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MIcon, mMailIcon, mSearchIcon} from '@banzamel/mineralui-angular/icons'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import inputForm from '@generated/examples/forms/input/input-form'
import inputSlots from '@generated/examples/forms/input/input-slots'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']

@Component({
    selector: 'doc-input-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MIcon, MInput],
    template: `
        <doc-article
            title="MInput"
            description="The foundation of MineralUI text inputs with variants, icons, helper text, loading, clear actions, state styling and Angular forms."
        >
            <doc-section title="Playground" description="Toggle inputs to preview every input combination.">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input
                        label="Email"
                        placeholder="Enter your email..."
                        [variant]="variant()"
                        [size]="size()"
                        [color]="color()"
                        [clearable]="clearable()"
                        [showCharCount]="showCharCount()"
                        [maxLength]="showCharCount() ? maxLength() : undefined"
                        [loading]="loading()"
                        [rounded]="rounded()"
                        [readOnly]="readOnly()"
                        [required]="required()"
                        [error]="error()"
                        [errorText]="error() ? 'This field is required' : undefined"
                        [fullWidth]="fullWidth()"
                        [disabled]="disabled()"
                    >
                        @if (startIcon()) {
                            <m-icon mStart [icon]="searchIcon" />
                        }
                        @if (endIcon()) {
                            <m-icon mEnd [icon]="mailIcon" />
                        }
                    </m-input>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Slots and states"
                description="mStart / mEnd take any element — an m-icon, a unit or a short text. loading swaps the end slot for a spinner; clearable shows a clear button while the field has content."
            >
                <doc-preview [example]="examples.inputSlots" />
            </doc-section>

            <doc-section
                title="Forms and validation"
                description="MInput is a ControlValueAccessor. The control's first error shows by itself once the field is touched or the form submitted; Validators.required marks the field required. errorMessages replaces a message per error key, MValidators adds the MineralUI rules."
            >
                <doc-preview [example]="examples.inputForm" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInput" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPage {
    protected readonly examples = {inputForm, inputSlots}
    protected readonly searchIcon = mSearchIcon
    protected readonly mailIcon = mMailIcon

    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly startIcon = signal(false)
    protected readonly endIcon = signal(false)
    protected readonly clearable = signal(true)
    protected readonly showCharCount = signal(false)
    protected readonly maxLength = signal(80)
    protected readonly loading = signal(false)
    protected readonly rounded = signal(false)
    protected readonly readOnly = signal(false)
    protected readonly required = signal(false)
    protected readonly error = signal(false)
    protected readonly fullWidth = signal(false)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        booleanControl('startIcon', this.startIcon),
        booleanControl('endIcon', this.endIcon),
        booleanControl('clearable', this.clearable),
        booleanControl('showCharCount', this.showCharCount),
        sliderControl('maxLength', this.maxLength, {min: 10, max: 200, step: 10}),
        booleanControl('loading', this.loading),
        booleanControl('rounded', this.rounded),
        booleanControl('readOnly', this.readOnly),
        booleanControl('required', this.required),
        booleanControl('error', this.error),
        booleanControl('fullWidth', this.fullWidth),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Email"',
            'placeholder="Enter your email..."',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.clearable() && 'clearable',
            this.showCharCount() && `showCharCount [maxLength]="${this.maxLength()}"`,
            this.loading() && 'loading',
            this.rounded() && 'rounded',
            this.readOnly() && 'readOnly',
            this.required() && 'required',
            this.error() && 'errorText="This field is required"',
            this.fullWidth() && 'fullWidth',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        const slots = [
            this.startIcon() && '    <m-icon mStart [icon]="mSearchIcon" />',
            this.endIcon() && '    <m-icon mEnd [icon]="mMailIcon" />',
        ].filter((slot) => typeof slot === 'string')
        const open = `<m-input\n    ${attrs.join('\n    ')}\n`
        return slots.length > 0 ? `${open}>\n${slots.join('\n')}\n</m-input>` : `${open}/>`
    })
}
