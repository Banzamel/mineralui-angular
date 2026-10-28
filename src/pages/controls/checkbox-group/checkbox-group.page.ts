import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCheckbox} from '@banzamel/mineralui-angular/controls/checkbox'
import {MCheckboxGroup} from '@banzamel/mineralui-angular/controls/checkbox-group'
import type {MCheckboxGroupDirection} from '@banzamel/mineralui-angular/controls/checkbox-group'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import checkboxGroupForms from '@generated/examples/controls/checkbox-group/checkbox-group-forms'
import checkboxGroupSignalForms from '@generated/examples/controls/checkbox-group/checkbox-group-signal-forms'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const DIRECTIONS: readonly MCheckboxGroupDirection[] = ['vertical', 'horizontal']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']

@Component({
    selector: 'doc-checkbox-group-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MCheckbox, MCheckboxGroup],
    template: `
        <doc-article
            title="MCheckboxGroup"
            description="Several choices under one label: a fieldset with a legend, helper text and an error, whose value is the list of the checked checkboxes' values. The checkbox counterpart of MRadioGroup."
        >
            <doc-section
                title="Playground"
                description="The group hands size, color and disabled down to its checkboxes."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <fieldset
                        mCheckboxGroup
                        label="Notify me about"
                        helperText="Pick any"
                        [(value)]="topics"
                        [direction]="direction()"
                        [size]="size()"
                        [color]="color()"
                        [error]="error()"
                        [disabled]="disabled()"
                    >
                        <m-checkbox value="releases">Releases</m-checkbox>
                        <m-checkbox value="security">Security advisories</m-checkbox>
                        <m-checkbox value="events">Events</m-checkbox>
                    </fieldset>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Reactive forms"
                description="Bind the form control to the group; each m-checkbox only carries its value. Validators.required (or MValidators.required) fails on an empty list and marks the legend required — a visible asterisk and a hidden “(required)”, since a fieldset does not support aria-required. The error shows once the control is touched or the form submitted, linked with aria-describedby."
            >
                <doc-preview [example]="examples.checkboxGroupForms" />
            </doc-section>

            <doc-section
                title="Signal Forms"
                description="With [formField], required() of the schema works on the list too: the group reports required while nothing is checked (Angular's required() alone treats an empty array as a value). That error comes from the group, so set its text with errorMessages — a message in the required() rule is not used for it."
            >
                <doc-preview [example]="examples.checkboxGroupSignalForms" />
            </doc-section>

            <doc-section title="MCheckboxGroup API">
                <doc-props-table api="MCheckboxGroup" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupPage {
    protected readonly examples = {checkboxGroupForms, checkboxGroupSignalForms}

    protected readonly topics = signal<string[]>(['releases'])
    protected readonly direction = signal<MCheckboxGroupDirection>('vertical')
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly error = signal(false)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('direction', this.direction, DIRECTIONS),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        booleanControl('error', this.error),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            this.direction() !== 'vertical' && `direction="${this.direction()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.error() && 'error',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return [
            `<fieldset mCheckboxGroup label="Notify me about" helperText="Pick any" [(value)]="topics"${attrs.map((attr) => ` ${attr}`).join('')}>`,
            '    <m-checkbox value="releases">Releases</m-checkbox>',
            '    <m-checkbox value="security">Security advisories</m-checkbox>',
            '    <m-checkbox value="events">Events</m-checkbox>',
            '</fieldset>',
        ].join('\n')
    })
}
