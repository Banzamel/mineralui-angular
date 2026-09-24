import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MTextarea} from '@banzamel/mineralui-angular/inputs/textarea'
import type {MTextareaVariant} from '@banzamel/mineralui-angular/inputs/textarea'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import textareaAutoResize from '@generated/examples/forms/textarea/textarea-auto-resize'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MTextareaVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']

@Component({
    selector: 'doc-textarea-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MTextarea],
    template: `
        <doc-article
            title="MTextarea"
            description="Multi-line text input with the MInput frame: label, helper and error text, character counter, loading state, auto-resize and Angular forms."
        >
            <doc-section title="Playground" description="Toggle inputs to preview textarea states and styling.">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-textarea
                        label="Message"
                        placeholder="Write your message..."
                        helperText="Markdown is supported"
                        [variant]="variant()"
                        [size]="size()"
                        [color]="color()"
                        [rows]="rows()"
                        [showCharCount]="showCharCount()"
                        [maxLength]="showCharCount() ? 200 : undefined"
                        [loading]="loading()"
                        [required]="required()"
                        [error]="error()"
                        [errorText]="error() ? 'Message is required' : undefined"
                        [fullWidth]="fullWidth()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Auto-resize"
                description="autoResize grows the field with its content between minRows and maxRows; beyond maxRows it scrolls. As a form control, the control's error shows by itself once the field is touched."
            >
                <doc-preview [example]="examples.textareaAutoResize" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MTextarea" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaPage {
    protected readonly examples = {textareaAutoResize}

    protected readonly variant = signal<MTextareaVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly rows = signal(3)
    protected readonly showCharCount = signal(false)
    protected readonly loading = signal(false)
    protected readonly required = signal(false)
    protected readonly error = signal(false)
    protected readonly fullWidth = signal(true)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        sliderControl('rows', this.rows, {min: 2, max: 10}),
        booleanControl('showCharCount', this.showCharCount),
        booleanControl('loading', this.loading),
        booleanControl('required', this.required),
        booleanControl('error', this.error),
        booleanControl('fullWidth', this.fullWidth),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Message"',
            'placeholder="Write your message..."',
            'helperText="Markdown is supported"',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.rows() !== 3 && `[rows]="${this.rows()}"`,
            this.showCharCount() && 'showCharCount [maxLength]="200"',
            this.loading() && 'loading',
            this.required() && 'required',
            this.error() && 'errorText="Message is required"',
            this.fullWidth() && 'fullWidth',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-textarea\n    ${attrs.join('\n    ')}\n/>`
    })
}
