import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MToggle} from '@banzamel/mineralui-angular/controls/toggle'
import type {MColor, MLabelPosition, MSize} from '@banzamel/mineralui-angular/theme'
import toggleSettings from '@generated/examples/controls/toggle/toggle-settings'
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
    selector: 'doc-toggle-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MToggle],
    template: `
        <doc-article
            title="MToggle"
            description="A switch control for toggling between on and off states with a sliding knob animation."
        >
            <doc-section title="Playground" description="Toggle inputs to preview switch states and styling.">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-toggle
                        [(checked)]="checked"
                        [size]="size()"
                        [color]="color()"
                        [labelPosition]="labelPosition()"
                        [clickEffect]="clickEffect()"
                        [disabled]="disabled()"
                    >
                        Enable notifications
                    </m-toggle>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Settings list"
                description="The native checkbox carries role=switch, so screen readers announce on / off. Like MCheckbox it is a ControlValueAccessor for Angular forms."
            >
                <doc-preview [example]="examples.toggleSettings" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MToggle" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TogglePage {
    protected readonly examples = {toggleSettings}

    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly labelPosition = signal<MLabelPosition>('right')
    protected readonly clickEffect = signal<(typeof EFFECTS)[number]>('ripple')
    protected readonly checked = signal(true)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        selectControl('labelPosition', this.labelPosition, POSITIONS),
        selectControl('clickEffect', this.clickEffect, EFFECTS),
        booleanControl('checked', this.checked),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.labelPosition() !== 'right' && `labelPosition="${this.labelPosition()}"`,
            this.clickEffect() !== 'ripple' && `clickEffect="${this.clickEffect()}"`,
            this.checked() && '[checked]="true"',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-toggle${attrs.map((attr) => ` ${attr}`).join('')}>Enable notifications</m-toggle>`
    })
}
