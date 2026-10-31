import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MChipGroup} from '@banzamel/mineralui-angular/controls/chip-group'
import type {MChipGroupItem} from '@banzamel/mineralui-angular/controls/chip-group'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import chipGroupFilters from '@generated/examples/controls/chip-group/chip-group-filters'
import chipGroupForms from '@generated/examples/controls/chip-group/chip-group-forms'
import chipGroupSignalForms from '@generated/examples/controls/chip-group/chip-group-signal-forms'
import chipGroupSingle from '@generated/examples/controls/chip-group/chip-group-single'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']

@Component({
    selector: 'doc-chip-group-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MChipGroup],
    template: `
        <doc-article
            title="MChipGroup"
            description="Filter chips: a wrapping row of toggle buttons with a string[] value — several or at most one pressed, an optional count and a hint per chip. A form control. Angular-only."
        >
            <doc-section
                title="Playground"
                description="Chips look like an outlined MTag at rest and a tinted one with a check mark when pressed. Heights match MButton and MSegmented, so a chip group lines up with them in a toolbar."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-chip-group
                        label="Cuisine"
                        [items]="items"
                        [(value)]="cuisine"
                        [multiple]="multiple()"
                        [inlineLabel]="inlineLabel()"
                        [size]="size()"
                        [color]="color()"
                        [error]="error()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Filter bar"
                description="The value lists the pressed chips in the order of items. count shows a number after the label and is read as part of the chip's name. A hint shows as a tooltip on hover or keyboard focus — a disabled chip stays focusable and hoverable, so the hint can explain why it is unavailable. inlineLabel puts the label before the chips; soloOnDoubleClick makes a double click press only that chip; content you project goes after the chips, outside the group."
            >
                <doc-preview [example]="examples.chipGroupFilters" />
            </doc-section>

            <doc-section
                title="Single choice"
                description='With [multiple]="false" at most one chip is pressed and pressing it again clears the value (an empty filter, e.g. "all"). The value stays a string[]. For a choice that must never be empty use MSegmented.'
            >
                <doc-preview [example]="examples.chipGroupSingle" />
            </doc-section>

            <doc-section
                title="Reactive forms"
                description="MChipGroup is a ControlValueAccessor with a string[] value. Validators.required fails on an empty list and marks the label required; the error shows once focus leaves the group or the form is submitted, linked with aria-describedby."
            >
                <doc-preview [example]="examples.chipGroupForms" />
            </doc-section>

            <doc-section
                title="Signal Forms"
                description="Bind a Signal Forms field with [formField]; required() (an empty list fails it), disabled() and the rule messages come from the schema."
            >
                <doc-preview [example]="examples.chipGroupSignalForms" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description='The chips are native buttons with aria-pressed (WAI-ARIA toggle buttons) in a role="group" named by the label or ariaLabel. Each chip is its own tab stop and Space / Enter toggle it — no arrow-key navigation, as in a plain group of buttons. A pressed chip shows a check mark, so the state does not rely on color. A disabled chip has aria-disabled and stays in the tab order (its hint stays reachable); a disabled group takes every chip out of the tab order.'
            />

            <doc-section title="MChipGroup API">
                <doc-props-table api="MChipGroup" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipGroupPage {
    protected readonly examples = {chipGroupFilters, chipGroupForms, chipGroupSignalForms, chipGroupSingle}

    protected readonly items: readonly MChipGroupItem[] = [
        {value: 'italian', label: 'Italian', count: 24},
        {value: 'japanese', label: 'Japanese', count: 18},
        {value: 'mexican', label: 'Mexican', count: 9},
        {value: 'indian', label: 'Indian', count: 12},
        {value: 'greek', label: 'Greek', count: 0, disabled: true, hint: 'No restaurants nearby'},
    ]
    protected readonly cuisine = signal<readonly string[]>(['japanese'])
    protected readonly multiple = signal(true)
    protected readonly inlineLabel = signal(false)
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly error = signal(false)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        booleanControl('multiple', this.multiple),
        booleanControl('inlineLabel', this.inlineLabel),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        booleanControl('error', this.error),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            !this.multiple() && '[multiple]="false"',
            this.inlineLabel() && 'inlineLabel',
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.error() && 'error',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-chip-group label="Cuisine" [items]="items" [(value)]="cuisine"${attrs.map((attr) => ` ${attr}`).join('')} />`
    })
}
