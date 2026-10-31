import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MSegmented} from '@banzamel/mineralui-angular/controls/segmented'
import type {MSegmentedItem} from '@banzamel/mineralui-angular/controls/segmented'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import segmentedCustom from '@generated/examples/controls/segmented/segmented-custom'
import segmentedHints from '@generated/examples/controls/segmented/segmented-hints'
import segmentedForms from '@generated/examples/controls/segmented/segmented-forms'
import segmentedSignalForms from '@generated/examples/controls/segmented/segmented-signal-forms'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']

@Component({
    selector: 'doc-segmented-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MSegmented],
    template: `
        <doc-article
            title="MSegmented"
            description="A segmented control: one choice from a few options shown side by side. It is a radio group — one tab stop, arrow keys move and select — and a form control."
        >
            <doc-section
                title="Playground"
                description="Sizes match MButton, so a segmented control lines up with buttons in a toolbar."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-segmented
                        label="Period"
                        [items]="items"
                        [(value)]="period"
                        [size]="size()"
                        [color]="color()"
                        [fullWidth]="fullWidth()"
                        [error]="error()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Custom content"
                description="Instead of [items], declare m-segment children: any content, an icon-only option named with ariaLabel, a disabled option. Without a visible label, name the group with ariaLabel."
            >
                <doc-preview [example]="examples.segmentedCustom" />
            </doc-section>

            <doc-section
                title="Hints"
                description="An item's hint shows as a tooltip on hover or keyboard focus and becomes the option's accessible description — handy to explain why an option is disabled (a disabled option shows it to the pointer and to the arrow keys). With m-segment children, put [mTooltip] on the option. Angular-only."
            >
                <doc-preview [example]="examples.segmentedHints" />
            </doc-section>

            <doc-section
                title="Reactive forms"
                description="MSegmented is a ControlValueAccessor. Validators.required marks the group required (aria-required); the error shows once focus leaves the group or the form is submitted, linked with aria-describedby."
            >
                <doc-preview [example]="examples.segmentedForms" />
            </doc-section>

            <doc-section
                title="Signal Forms"
                description="Bind a Signal Forms field with [formField]; required(), disabled() and the rule messages come from the schema."
            >
                <doc-preview [example]="examples.segmentedSignalForms" />
            </doc-section>

            <doc-section
                title="Keyboard"
                description="Tab enters the group on the selected option (or the first enabled one). Arrow keys move and select, wrapping at the ends and mirrored in a right-to-left layout; Home / End jump to the first / last option; Space selects the focused option. A disabled option still takes focus from the arrow keys — its hint shows and is read out — but is not selected: the value stays."
            />

            <doc-section title="MSegmented API">
                <doc-props-table api="MSegmented" />
            </doc-section>

            <doc-section title="MSegment API">
                <doc-props-table api="MSegment" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedPage {
    protected readonly examples = {segmentedCustom, segmentedForms, segmentedHints, segmentedSignalForms}

    protected readonly items: readonly MSegmentedItem[] = [
        {value: 'day', label: 'Day'},
        {value: 'week', label: 'Week'},
        {value: 'month', label: 'Month'},
        {value: 'year', label: 'Year'},
    ]
    protected readonly period = signal<string | undefined>('week')
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly fullWidth = signal(false)
    protected readonly error = signal(false)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        booleanControl('fullWidth', this.fullWidth),
        booleanControl('error', this.error),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.fullWidth() && 'fullWidth',
            this.error() && 'error',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-segmented label="Period" [items]="items" [(value)]="period"${attrs.map((attr) => ` ${attr}`).join('')} />`
    })
}
