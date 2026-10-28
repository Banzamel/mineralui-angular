import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MInputOTP} from '@banzamel/mineralui-angular/inputs/input-otp'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-otp-groups',
    imports: [MInputOTP, MStack, MText],
    template: `
        <m-stack align="start">
            <!-- The groups add a dash between the cells; the cells stay one group with the same names. -->
            <m-input-otp label="Authenticator code" [groups]="[3, 3]" [(value)]="code" />
            <m-input-otp label="Recovery code" [length]="8" [groups]="[4, 4]" size="sm" />
            <p mText size="sm" tone="muted">Value: {{ code() || '—' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOtpGroupsExample {
    protected readonly code = signal('')
}
