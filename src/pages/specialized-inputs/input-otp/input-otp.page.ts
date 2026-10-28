import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MInputOTP} from '@banzamel/mineralui-angular/inputs/input-otp'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import inputOtpGroups from '@generated/examples/specialized-inputs/input-otp/input-otp-groups'
import inputOtpInvite from '@generated/examples/specialized-inputs/input-otp/input-otp-invite'
import inputOtpSingle from '@generated/examples/specialized-inputs/input-otp/input-otp-single'
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

            <doc-section
                title="Groups"
                description="groups splits the cells with a dash, e.g. [3, 3] or [4, 4]; the sum must equal length (a mismatch is reported in dev mode and the cells stay ungrouped). The separator is decorative: the cells remain one named group, each cell keeps its 'Digit n of m' name."
            >
                <doc-preview [example]="examples.inputOtpGroups" />
            </doc-section>

            <doc-section
                title="Single field"
                description="variant='single' renders one text field with autocomplete='one-time-code' — the SMS autofill and password managers handle it like any input. Value, (completed), clearable and the form control work the same; typed or pasted text is filtered and capped at length (not with a native maxlength, which would cut a pasted 123-456 before the dash is dropped)."
            >
                <doc-preview [example]="examples.inputOtpSingle" />
            </doc-section>

            <doc-section
                title="Alphanumeric codes"
                description="mode='alphanumeric' accepts letters and digits (text keyboard, letters upper-cased, cells named 'Character n of m'). normalize shapes the raw text first — normalizeCrockfordBase32 from @banzamel/mineralui-angular/utils implements Crockford Base32: I / L → 1, O → 0, U and separators dropped."
            >
                <doc-preview [example]="examples.inputOtpInvite" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputOTP" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOtpPage {
    protected readonly examples = {inputOtpGroups, inputOtpInvite, inputOtpSingle, inputOtpVerify}

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
