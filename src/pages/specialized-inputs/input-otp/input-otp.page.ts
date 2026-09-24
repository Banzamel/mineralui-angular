import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MInputOTP} from '@banzamel/mineralui-angular/inputs/input-otp'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import inputOtpVerify from '@generated/examples/specialized-inputs/input-otp/input-otp-verify'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'success', 'warning', 'error', 'info', 'neutral']

@Component({
    selector: 'doc-input-otp-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputOTP],
    template: `
        <doc-article
            title="MInputOTP"
            description="One-time code field: single-digit cells with auto-advance, keyboard navigation and paste / autofill of the whole code."
        >
            <doc-section
                title="Playground"
                description="Type, paste (Ctrl+V) or let the browser autofill a code; Backspace deletes and moves back, arrows / Home / End move between cells."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-otp
                        label="Verification code"
                        [(value)]="value"
                        [length]="length()"
                        [size]="size()"
                        [color]="color()"
                        [clearable]="clearable()"
                        [error]="error()"
                        [errorText]="error() ? 'The code has expired' : undefined"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Verification"
                description="(completed) fires once every cell is filled. As a form control the code is a string; Validators.required / minLength work on it."
            >
                <doc-preview [example]="examples.inputOtpVerify" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputOTP" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOtpPage {
    protected readonly examples = {inputOtpVerify}

    protected readonly value = signal('')
    protected readonly length = signal(6)
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly clearable = signal(true)
    protected readonly error = signal(false)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        sliderControl('length', this.length, {min: 4, max: 8}),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        booleanControl('clearable', this.clearable),
        booleanControl('error', this.error),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Verification code"',
            this.length() !== 6 && `[length]="${this.length()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.clearable() && 'clearable',
            this.error() && 'errorText="The code has expired"',
            this.disabled() && 'disabled',
            '[(value)]="code"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-otp\n    ${attrs.join('\n    ')}\n/>`
    })
}
