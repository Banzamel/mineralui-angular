import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import type {MButtonVariant} from '@banzamel/mineralui-angular/controls/button'
import {MButtonGroup} from '@banzamel/mineralui-angular/controls/button-group'
import type {MButtonGroupOrientation} from '@banzamel/mineralui-angular/controls/button-group'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import buttonGroupLayouts from '@generated/examples/controls/button-group/button-group-layouts'
import buttonGroupToolbar from '@generated/examples/controls/button-group/button-group-toolbar'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const ORIENTATIONS: readonly MButtonGroupOrientation[] = ['horizontal', 'vertical']
const VARIANTS: readonly MButtonVariant[] = ['filled', 'secondary', 'outlined', 'ghost']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']

@Component({
    selector: 'doc-button-group-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MButton, MButtonGroup],
    template: `
        <doc-article
            title="MButtonGroup"
            description="Group related buttons in a single row or column with shared borders and consistent styling."
        >
            <doc-section title="Playground" description="Toggle inputs to preview orientation, attachment and styling.">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-button-group
                        aria-label="Playground"
                        [orientation]="orientation()"
                        [variant]="variant()"
                        [color]="color()"
                        [size]="size()"
                        [attached]="attached()"
                    >
                        <button mButton>Left</button>
                        <button mButton>Center</button>
                        <button mButton>Right</button>
                    </m-button-group>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Toggle row"
                description="The group is role=group — name it with aria-label. For a single choice, mark the selected button with active and aria-pressed."
            >
                <doc-preview [example]="examples.buttonGroupToolbar" />
            </doc-section>

            <doc-section
                title="Orientation and spacing"
                description="variant, size and color are defaults handed down to every mButton inside (through the M_BUTTON_GROUP token); a button's own input wins."
            >
                <doc-preview [example]="examples.buttonGroupLayouts" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MButtonGroup" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupPage {
    protected readonly examples = {buttonGroupLayouts, buttonGroupToolbar}

    protected readonly orientation = signal<MButtonGroupOrientation>('horizontal')
    protected readonly variant = signal<MButtonVariant>('outlined')
    protected readonly color = signal<MColor>('primary')
    protected readonly size = signal<MSize>('md')
    protected readonly attached = signal(true)

    protected readonly controls = [
        selectControl('orientation', this.orientation, ORIENTATIONS),
        selectControl('variant', this.variant, VARIANTS),
        selectControl('color', this.color, COLORS),
        selectControl('size', this.size, SIZES),
        booleanControl('attached', this.attached),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            this.orientation() !== 'horizontal' && `orientation="${this.orientation()}"`,
            `variant="${this.variant()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            !this.attached() && '[attached]="false"',
        ].filter((attr) => typeof attr === 'string')
        return [
            `<m-button-group aria-label="Alignment"${attrs.map((attr) => ` ${attr}`).join('')}>`,
            '    <button mButton>Left</button>',
            '    <button mButton>Center</button>',
            '    <button mButton>Right</button>',
            '</m-button-group>',
        ].join('\n')
    })
}
