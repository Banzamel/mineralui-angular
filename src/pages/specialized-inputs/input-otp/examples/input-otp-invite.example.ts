import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MInputOTP} from '@banzamel/mineralui-angular/inputs/input-otp'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {normalizeCrockfordBase32} from '@banzamel/mineralui-angular/utils'

@Component({
    selector: 'app-input-otp-invite',
    imports: [MInputOTP, MStack, MText],
    template: `
        <m-stack align="start">
            <!-- Crockford Base32: letters upper-cased, I / L read as 1, O as 0, U and separators dropped. -->
            <m-input-otp
                label="Invite code"
                mode="alphanumeric"
                [length]="8"
                [groups]="[4, 4]"
                [normalize]="normalize"
                [(value)]="code"
            />
            <p mText size="sm" tone="muted">Try typing "abcd-elou" · value: {{ code() || '—' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOtpInviteExample {
    protected readonly normalize = normalizeCrockfordBase32
    protected readonly code = signal('')
}
