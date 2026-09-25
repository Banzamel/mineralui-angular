import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MColorPicker} from '@banzamel/mineralui-angular/display/color-picker'
import type {MColorPickerFormat} from '@banzamel/mineralui-angular/display/color-picker'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import colorPickerForm from '@generated/examples/display/color-picker/color-picker-form'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const FORMATS: readonly MColorPickerFormat[] = ['hex', 'rgb', 'hsl']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const BRAND_SWATCHES: readonly string[] = ['#0f172a', '#1d4ed8', '#0891b2', '#16a34a', '#ca8a04', '#dc2626']

@Component({
    selector: 'doc-color-picker-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MColorPicker, MText],
    template: `
        <doc-article
            title="MColorPicker"
            description="Visual color picker with hue, saturation, format switching and optional swatch presets."
        >
            <doc-section
                title="Playground"
                description="Drag on the area and the hue bar, type a color, or use the keyboard on every part."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <div class="doc-color-picker-stage">
                        <m-color-picker
                            label="Accent color"
                            [(value)]="value"
                            [format]="format()"
                            [size]="size()"
                            [swatches]="customSwatches() ? brandSwatches : defaultSwatches"
                            [disabled]="disabled()"
                        />
                        <p mText size="sm" tone="muted">
                            Value: <code>{{ value() }}</code>
                        </p>
                    </div>
                </doc-playground>
            </doc-section>

            <doc-section
                title="In a form"
                description="MColorPicker is a ControlValueAccessor; the value is written in the chosen format."
            >
                <doc-preview [example]="examples.form" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description='The saturation / brightness area is a slider with aria-roledescription "2D slider" and a spoken value (←/→ saturation, ↑/↓ brightness, Shift ×10, PageUp / PageDown); the hue is a slider from 0 to 360 (arrows, Shift ×10, Home / End); the swatches are a radio group named by their color value, with arrow keys; the text field is an m-input named mineralui.colorPicker.field.'
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="React supports only the mouse on the area and the hue bar and names none of the parts. value + onChange is the [(value)] model; the text field reads hex, #rgb in values, rgb() and hsl() (React: hex and rgb only), and the hue is kept at black and greys."
            />

            <doc-section title="MColorPicker API">
                <doc-props-table api="MColorPicker" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-color-picker-stage {
            display: grid;
            gap: var(--mineral-spacing-sm);
            width: 280px;
            max-width: 100%;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerPage {
    protected readonly examples = {form: colorPickerForm}
    protected readonly brandSwatches = BRAND_SWATCHES
    protected readonly defaultSwatches: readonly string[] = [
        '#ef4444',
        '#f97316',
        '#eab308',
        '#22c55e',
        '#06b6d4',
        '#3b82f6',
        '#8b5cf6',
        '#ec4899',
        '#000000',
        '#ffffff',
    ]

    protected readonly value = signal('#3b82f6')
    protected readonly format = signal<MColorPickerFormat>('hex')
    protected readonly size = signal<MSize>('md')
    protected readonly customSwatches = signal(false)
    protected readonly disabled = signal(false)
    protected readonly controls = [
        selectControl('format', this.format, FORMATS),
        selectControl('size', this.size, SIZES),
        booleanControl('customSwatches', this.customSwatches),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Accent color"',
            '[(value)]="accent"',
            this.format() !== 'hex' && `format="${this.format()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.customSwatches() && '[swatches]="brandSwatches"',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-color-picker ${attrs.join(' ')} />`
    })
}
