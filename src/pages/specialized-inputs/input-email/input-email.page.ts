import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MInputEmail} from '@banzamel/mineralui-angular/inputs/input-email'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import inputEmailForm from '@generated/examples/specialized-inputs/input-email/input-email-form'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-input-email-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputEmail],
    template: `
        <doc-article
            title="MInputEmail"
            description="Email-specialized field with built-in validation feedback and optional valid-state confirmation."
        >
            <doc-section
                title="Playground"
                description="Type an address and leave the field: the rule runs on blur, or while typing with validateOnChange."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-email
                        label="Email"
                        [variant]="variant()"
                        [size]="size()"
                        [validateOnChange]="validateOnChange()"
                        [showValidIcon]="showValidIcon()"
                        [clearable]="clearable()"
                        [required]="required()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Forms"
                description="As a form control the email rule is the control's validator (mEmail error), so form.invalid sees it without adding MValidators.email. [validate]='false' turns it off."
            >
                <doc-preview [example]="examples.inputEmailForm" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputEmail" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputEmailPage {
    protected readonly examples = {inputEmailForm}

    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly validateOnChange = signal(false)
    protected readonly showValidIcon = signal(true)
    protected readonly clearable = signal(false)
    protected readonly required = signal(false)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        booleanControl('validateOnChange', this.validateOnChange),
        booleanControl('showValidIcon', this.showValidIcon),
        booleanControl('clearable', this.clearable),
        booleanControl('required', this.required),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Email"',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.validateOnChange() && 'validateOnChange',
            !this.showValidIcon() && '[showValidIcon]="false"',
            this.clearable() && 'clearable',
            this.required() && 'required',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-email\n    ${attrs.join('\n    ')}\n/>`
    })
}
