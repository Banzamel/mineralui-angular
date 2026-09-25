import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MQrCode} from '@banzamel/mineralui-angular/display/qr-code'
import type {MQrCodeStatus} from '@banzamel/mineralui-angular/display/qr-code'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import qrCodePairing from '@generated/examples/display/qr-code/qr-code-pairing'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const THEMES = {
    default: {fg: '#111827', bg: '#ffffff'},
    brand: {fg: '#0f172a', bg: '#eff6ff'},
    contrast: {fg: '#f8fafc', bg: '#0f172a'},
} as const
type Theme = keyof typeof THEMES
const THEME_NAMES: readonly Theme[] = ['default', 'brand', 'contrast']
const STATUSES: readonly MQrCodeStatus[] = ['idle', 'loading', 'success', 'error']

@Component({
    selector: 'doc-qr-code-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInput, MQrCode, MStack],
    template: `
        <doc-article
            title="MQrCode"
            description="Local SVG QR code generator for links, onboarding steps and share actions."
        >
            <doc-section
                title="Playground"
                description="Type a value — up to 106 UTF-8 bytes; the code grows from version 1 to 5 as it gets longer."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack class="doc-qr-code-stage" align="start">
                        <m-input
                            label="QR value"
                            placeholder="https://example.com"
                            clearable
                            fullWidth
                            [(value)]="value"
                        />
                        <m-qr-code
                            [value]="value()"
                            [size]="size()"
                            [padding]="padding()"
                            [fg]="colors().fg"
                            [bg]="colors().bg"
                            [status]="status()"
                        />
                    </m-stack>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Status overlay"
                description="status dims the code and shows a spinner, a check or an error mark in the middle — for a pairing or sign-in flow that waits for the phone. The state is announced through a polite live region (statusLabel or mineralui.qrCode.*)."
            >
                <doc-preview [example]="examples.pairing" />
            </doc-section>

            <doc-section
                title="Rendering"
                description="The code is encoded locally (byte mode, error correction L) and drawn as a single SVG path, so the server renders it into prerendered pages. A value longer than 106 bytes renders nothing and logs a warning in development."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="The encoder is a 1:1 port, checked module for module against the React output. The modules are one <path> instead of a <rect> each; the status indicator is a plain element instead of a disabled MButton, and the status text lives in a role=status region. New: label for the image name."
            />

            <doc-section title="MQrCode API">
                <doc-props-table api="MQrCode" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-qr-code-stage {
            width: 100%;
            max-width: 360px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCodePage {
    protected readonly examples = {pairing: qrCodePairing}

    protected readonly value = signal('https://mineralui.io/docs')
    protected readonly size = signal(144)
    protected readonly padding = signal(4)
    protected readonly theme = signal<Theme>('default')
    protected readonly status = signal<MQrCodeStatus>('idle')
    protected readonly controls = [
        sliderControl('size', this.size, {min: 88, max: 240, step: 8}),
        sliderControl('padding', this.padding, {min: 2, max: 8}),
        selectControl('theme', this.theme, THEME_NAMES),
        selectControl('status', this.status, STATUSES),
    ]

    protected readonly colors = computed(() => THEMES[this.theme()])

    protected readonly code = computed(() => {
        const {fg, bg} = this.colors()
        const attrs = [
            `value="${this.value()}"`,
            this.size() !== 144 && `[size]="${this.size()}"`,
            this.padding() !== 4 && `[padding]="${this.padding()}"`,
            this.theme() !== 'default' && `fg="${fg}" bg="${bg}"`,
            this.status() !== 'idle' && `status="${this.status()}"`,
        ].filter((attr) => typeof attr === 'string')
        return `<m-qr-code ${attrs.join(' ')} />`
    })
}
