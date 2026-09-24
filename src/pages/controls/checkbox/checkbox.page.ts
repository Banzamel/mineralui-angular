import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCheckbox} from '@banzamel/mineralui-angular/controls/checkbox'
import type {MColor, MLabelPosition, MSize} from '@banzamel/mineralui-angular/theme'
import checkboxForm from '@generated/examples/controls/checkbox/checkbox-form'
import checkboxSelectAll from '@generated/examples/controls/checkbox/checkbox-select-all'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const POSITIONS: readonly MLabelPosition[] = ['right', 'left']
const EFFECTS = ['ripple', 'none'] as const

@Component({
    selector: 'doc-checkbox-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MCheckbox],
    template: `
        <doc-article
            title="MCheckbox"
            description="A customizable checkbox control with support for indeterminate state, colors, sizes, labels and Angular forms."
        >
            <doc-section title="Playground" description="Toggle inputs to preview checkbox states and styling.">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-checkbox
                        [(checked)]="checked"
                        [(indeterminate)]="indeterminate"
                        [size]="size()"
                        [color]="color()"
                        [labelPosition]="labelPosition()"
                        [clickEffect]="clickEffect()"
                        [error]="error()"
                        [disabled]="disabled()"
                    >
                        Accept terms and conditions
                    </m-checkbox>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Select all"
                description="indeterminate shows the mixed state of a parent checkbox. It is a two-way model: the checkbox clears it when the user toggles it."
            >
                <doc-preview [example]="examples.checkboxSelectAll" />
            </doc-section>

            <doc-section
                title="Forms"
                description="MCheckbox is a ControlValueAccessor — use formControlName, [formControl] or ngModel. The control's error shows by itself once it is touched or the form is submitted, as a live alert linked with aria-describedby; errorMessages replaces the text per error key, errorText forces a message."
            >
                <doc-preview [example]="examples.checkboxForm" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MCheckbox" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxPage {
    protected readonly examples = {checkboxForm, checkboxSelectAll}

    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly labelPosition = signal<MLabelPosition>('right')
    protected readonly clickEffect = signal<(typeof EFFECTS)[number]>('ripple')
    protected readonly checked = signal(true)
    protected readonly indeterminate = signal(false)
    protected readonly error = signal(false)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        selectControl('labelPosition', this.labelPosition, POSITIONS),
        selectControl('clickEffect', this.clickEffect, EFFECTS),
        booleanControl('checked', this.checked),
        booleanControl('indeterminate', this.indeterminate),
        booleanControl('error', this.error),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.labelPosition() !== 'right' && `labelPosition="${this.labelPosition()}"`,
            this.clickEffect() !== 'ripple' && `clickEffect="${this.clickEffect()}"`,
            this.checked() && '[checked]="true"',
            this.indeterminate() && '[indeterminate]="true"',
            this.error() && 'error',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-checkbox${attrs.map((attr) => ` ${attr}`).join('')}>Accept terms and conditions</m-checkbox>`
    })
}
