import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MQrCode} from '@banzamel/mineralui-angular/display/qr-code'
import type {MQrCodeStatus} from '@banzamel/mineralui-angular/display/qr-code'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const MESSAGES: Readonly<Record<MQrCodeStatus, string>> = {
    idle: 'Scan the code with the mobile app.',
    loading: 'Waiting for your phone…',
    success: 'Phone paired.',
    error: 'The code expired — generate a new one.',
}

@Component({
    selector: 'app-qr-code-pairing',
    imports: [MButton, MInline, MQrCode, MStack, MText],
    template: `
        <m-inline align="start" spacing="lg">
            <m-qr-code
                value="mineralui://pair?token=7f3a9c"
                label="Pairing code"
                [status]="status()"
                [statusLabel]="message()"
            />
            <m-stack align="start" spacing="sm">
                <p mText>{{ message() }}</p>
                <m-inline spacing="xs">
                    @for (option of statuses; track option) {
                        <button
                            mButton
                            size="sm"
                            [variant]="option === status() ? 'filled' : 'outlined'"
                            (click)="status.set(option)"
                        >
                            {{ option }}
                        </button>
                    }
                </m-inline>
            </m-stack>
        </m-inline>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCodePairingExample {
    protected readonly statuses: readonly MQrCodeStatus[] = ['idle', 'loading', 'success', 'error']
    protected readonly status = signal<MQrCodeStatus>('loading')
    protected readonly message = computed(() => MESSAGES[this.status()])
}
