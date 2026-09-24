import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import {MInputPassword} from '@banzamel/mineralui-angular/inputs/input-password'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import inputPasswordSignup from '@generated/examples/specialized-inputs/input-password/input-password-signup'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-input-password-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputPassword],
    template: `
        <doc-article
            title="MInputPassword"
            description="Password field with optional reveal control and built-in strength feedback for auth and account settings flows."
        >
            <doc-section
                title="Playground"
                description="The reveal toggle is a focusable button with aria-pressed; the strength label is announced politely."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-password
                        label="Password"
                        [variant]="variant()"
                        [size]="size()"
                        [showToggle]="showToggle()"
                        [showStrength]="showStrength()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Sign-up form"
                description="autoComplete='new-password' lets password managers offer a generated password; (strengthChange) reports the heuristic level."
            >
                <doc-preview [example]="examples.inputPasswordSignup" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputPassword" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordPage {
    protected readonly examples = {inputPasswordSignup}

    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly showToggle = signal(true)
    protected readonly showStrength = signal(true)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        booleanControl('showToggle', this.showToggle),
        booleanControl('showStrength', this.showStrength),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Password"',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            !this.showToggle() && '[showToggle]="false"',
            this.showStrength() && 'showStrength',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-password\n    ${attrs.join('\n    ')}\n/>`
    })
}
