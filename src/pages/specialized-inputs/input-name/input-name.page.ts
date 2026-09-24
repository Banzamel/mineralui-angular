import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import {MInputName} from '@banzamel/mineralui-angular/inputs/input-name'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-input-name-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPropsTable, MInputName],
    template: `
        <doc-article
            title="MInputName"
            description="Name-focused field with word-count checks and relaxed validation controls for profile and directory forms."
        >
            <doc-section
                title="Playground"
                description="Digits and special characters are filtered while typing and words are capitalized; minWords is checked on blur."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-name
                        label="Full name"
                        [variant]="variant()"
                        [size]="size()"
                        [autoCapitalize]="autoCapitalize()"
                        [allowNumbers]="allowNumbers()"
                        [allowSpecialChars]="allowSpecialChars()"
                        [minWords]="minWords() || undefined"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputName" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNamePage {
    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly autoCapitalize = signal(true)
    protected readonly allowNumbers = signal(false)
    protected readonly allowSpecialChars = signal(false)
    protected readonly minWords = signal(2)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        booleanControl('autoCapitalize', this.autoCapitalize),
        booleanControl('allowNumbers', this.allowNumbers),
        booleanControl('allowSpecialChars', this.allowSpecialChars),
        sliderControl('minWords', this.minWords, {min: 0, max: 4}),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Full name"',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            !this.autoCapitalize() && '[autoCapitalize]="false"',
            this.allowNumbers() && 'allowNumbers',
            this.allowSpecialChars() && 'allowSpecialChars',
            this.minWords() > 0 && `[minWords]="${this.minWords()}"`,
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-name\n    ${attrs.join('\n    ')}\n/>`
    })
}
