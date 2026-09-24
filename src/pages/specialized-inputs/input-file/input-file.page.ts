import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MInputFile} from '@banzamel/mineralui-angular/inputs/input-file'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import inputFileAvatar from '@generated/examples/specialized-inputs/input-file/input-file-avatar'
import inputFileForm from '@generated/examples/specialized-inputs/input-file/input-file-form'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'success', 'warning', 'error', 'info', 'neutral']
const ACCEPTS = ['any', 'image/*', '.pdf,.docx'] as const

@Component({
    selector: 'doc-input-file-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInputFile],
    template: `
        <doc-article
            title="MInputFile"
            description="File picker with a drop zone, a file list with image previews, limits and an optional crop step for images."
        >
            <doc-section
                title="Playground"
                description="Click or press Enter / Space on the drop zone to browse, or drop files onto it."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-file
                        label="Attachments"
                        helperText="Up to 3 files, 2 MB each"
                        [accept]="accept() === 'any' ? undefined : accept()"
                        [multiple]="multiple()"
                        [maxFiles]="3"
                        [maxSize]="2000000"
                        [preview]="preview()"
                        [clearable]="clearable()"
                        [size]="size()"
                        [color]="color()"
                        [fullWidth]="true"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Crop an avatar"
                description="[crop] opens the crop editor for a single image: drag or use the arrow keys to move, wheel / slider / + − to zoom. The value is the cropped file."
            >
                <doc-preview [example]="examples.inputFileAvatar" />
            </doc-section>

            <doc-section
                title="Forms"
                description="The control holds readonly File[]; Validators.required fails for an empty list."
            >
                <doc-preview [example]="examples.inputFileForm" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputFile" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFilePage {
    protected readonly examples = {inputFileAvatar, inputFileForm}

    protected readonly accept = signal<(typeof ACCEPTS)[number]>('any')
    protected readonly multiple = signal(true)
    protected readonly preview = signal(true)
    protected readonly clearable = signal(true)
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('accept', this.accept, ACCEPTS),
        booleanControl('multiple', this.multiple),
        booleanControl('preview', this.preview),
        booleanControl('clearable', this.clearable),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Attachments"',
            'helperText="Up to 3 files, 2 MB each"',
            this.accept() !== 'any' && `accept="${this.accept()}"`,
            this.multiple() && 'multiple',
            '[maxFiles]="3"',
            '[maxSize]="2000000"',
            !this.preview() && '[preview]="false"',
            this.clearable() && 'clearable',
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            'fullWidth',
            this.disabled() && 'disabled',
            '[(value)]="files"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input-file\n    ${attrs.join('\n    ')}\n/>`
    })
}
