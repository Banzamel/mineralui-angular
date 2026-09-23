import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MRadio, MRadioGroup} from '@banzamel/mineralui-angular/controls/radio'
import type {MRadioGroupDirection} from '@banzamel/mineralui-angular/controls/radio'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import radioForm from '@generated/examples/controls/radio/radio-form'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const DIRECTIONS: readonly MRadioGroupDirection[] = ['vertical', 'horizontal']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const EFFECTS = ['ripple', 'none'] as const

@Component({
    selector: 'doc-radio-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MRadio, MRadioGroup],
    template: `
        <doc-article
            title="MRadio & MRadioGroup"
            description="Radio buttons for selecting a single option from a group. MRadioGroup shares the name, value and styling, and plugs into Angular forms."
        >
            <doc-section title="Playground" description="Toggle inputs to preview group layout and styling.">
                <doc-playground [controls]="controls" [code]="code()">
                    <fieldset
                        mRadioGroup
                        label="Plan"
                        [(value)]="plan"
                        [direction]="direction()"
                        [size]="size()"
                        [color]="color()"
                        [error]="error()"
                        [disabled]="disabled()"
                    >
                        <m-radio value="free" [clickEffect]="clickEffect()">Free</m-radio>
                        <m-radio value="pro" [clickEffect]="clickEffect()">Pro</m-radio>
                        <m-radio value="team" [clickEffect]="clickEffect()">Team</m-radio>
                    </fieldset>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Forms and keyboard"
                description="Bind the form control to the group. The radios share a native name, so the group is one tab stop and the arrow keys move the selection; the legend names the radiogroup."
            >
                <doc-preview [example]="examples.radioForm" />
            </doc-section>

            <doc-section title="MRadioGroup API">
                <doc-props-table api="MRadioGroup" />
            </doc-section>

            <doc-section title="MRadio API">
                <doc-props-table api="MRadio" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioPage {
    protected readonly examples = {radioForm}

    protected readonly plan = signal<string | undefined>('pro')
    protected readonly direction = signal<MRadioGroupDirection>('vertical')
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly clickEffect = signal<(typeof EFFECTS)[number]>('ripple')
    protected readonly error = signal(false)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('direction', this.direction, DIRECTIONS),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        selectControl('clickEffect', this.clickEffect, EFFECTS),
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
        const radioAttrs = this.clickEffect() !== 'ripple' ? ` clickEffect="${this.clickEffect()}"` : ''
        return [
            `<fieldset mRadioGroup label="Plan" [(value)]="plan"${attrs.map((attr) => ` ${attr}`).join('')}>`,
            `    <m-radio value="free"${radioAttrs}>Free</m-radio>`,
            `    <m-radio value="pro"${radioAttrs}>Pro</m-radio>`,
            `    <m-radio value="team"${radioAttrs}>Team</m-radio>`,
            '</fieldset>',
        ].join('\n')
    })
}
