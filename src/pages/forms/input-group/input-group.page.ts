import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MIcon, mSearchIcon} from '@banzamel/mineralui-angular/icons'
import {MInputGroup} from '@banzamel/mineralui-angular/inputs/input-group'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import inputGroupAddons from '@generated/examples/forms/input-group/input-group-addons'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'success', 'warning', 'error', 'info', 'neutral']
const ADDONS = ['none', 'text', 'icon', 'button'] as const
type Addon = (typeof ADDONS)[number]

const ADDON_CODE: Readonly<Record<Addon, (slot: string) => string>> = {
    none: () => '',
    text: (slot) => `<span ${slot}>$</span>`,
    icon: (slot) => `<m-icon ${slot} [icon]="mSearchIcon" />`,
    button: (slot) => `<button ${slot} mButton variant="ghost" (click)="go()">Go</button>`,
}

@Component({
    selector: 'doc-input-group-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MButton, MIcon, MInputGroup],
    template: `
        <doc-article
            title="MInputGroup"
            description="Text field with addons glued to its edges: text, icons, buttons or a checkbox, projected with mPrepend / mAppend."
        >
            <doc-section
                title="Playground"
                description="Each element with mPrepend or mAppend becomes one addon; its look follows its content."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input-group
                        label="Amount"
                        placeholder="Enter value..."
                        [(value)]="amount"
                        [size]="size()"
                        [color]="color()"
                        [clearable]="clearable()"
                        [loading]="loading()"
                        [readOnly]="readOnly()"
                        [required]="required()"
                        [error]="error()"
                        [errorText]="error() ? 'Enter a valid amount' : undefined"
                        [fullWidth]="fullWidth()"
                        [disabled]="disabled()"
                    >
                        @switch (prepend()) {
                            @case ('text') {
                                <span mPrepend>$</span>
                            }
                            @case ('icon') {
                                <m-icon mPrepend [icon]="searchIcon" />
                            }
                            @case ('button') {
                                <button mPrepend mButton variant="ghost">Go</button>
                            }
                        }
                        @switch (append()) {
                            @case ('text') {
                                <span mAppend>$</span>
                            }
                            @case ('icon') {
                                <m-icon mAppend [icon]="searchIcon" />
                            }
                            @case ('button') {
                                <button mAppend mButton variant="ghost">Go</button>
                            }
                        }
                    </m-input-group>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Addons and forms"
                description="Addon events are bound on the addons themselves — a button's (click), a checkbox's [(checked)]. As a form control the group behaves like MInput."
            >
                <doc-preview [example]="examples.inputGroupAddons" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MInputGroup" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupPage {
    protected readonly examples = {inputGroupAddons}
    protected readonly searchIcon = mSearchIcon

    protected readonly amount = signal('249.99')
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly prepend = signal<Addon>('text')
    protected readonly append = signal<Addon>('none')
    protected readonly clearable = signal(true)
    protected readonly loading = signal(false)
    protected readonly readOnly = signal(false)
    protected readonly required = signal(false)
    protected readonly error = signal(false)
    protected readonly fullWidth = signal(true)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        selectControl('prepend', this.prepend, ADDONS),
        selectControl('append', this.append, ADDONS),
        booleanControl('clearable', this.clearable),
        booleanControl('loading', this.loading),
        booleanControl('readOnly', this.readOnly),
        booleanControl('required', this.required),
        booleanControl('error', this.error),
        booleanControl('fullWidth', this.fullWidth),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Amount"',
            'placeholder="Enter value..."',
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.clearable() && 'clearable',
            this.loading() && 'loading',
            this.readOnly() && 'readOnly',
            this.required() && 'required',
            this.error() && 'errorText="Enter a valid amount"',
            this.fullWidth() && 'fullWidth',
            this.disabled() && 'disabled',
            '[(value)]="amount"',
        ].filter((attr) => typeof attr === 'string')
        const addons = [ADDON_CODE[this.prepend()]('mPrepend'), ADDON_CODE[this.append()]('mAppend')].filter(Boolean)
        const body = addons.length > 0 ? `>\n    ${addons.join('\n    ')}\n</m-input-group>` : '/>'
        return `<m-input-group\n    ${attrs.join('\n    ')}\n${body}`
    })
}
