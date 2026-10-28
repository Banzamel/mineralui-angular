import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MInputOTP} from '@banzamel/mineralui-angular/inputs/input-otp'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-otp-single',
    imports: [MInputOTP, MStack, MText],
    template: `
        <m-stack align="start">
            <!-- One plain field: the SMS autofill and password managers fill it like any input. -->
            <m-input-otp
                variant="single"
                label="SMS code"
                clearable
                [(value)]="code"
                (completed)="status.set('Checking ' + $event + '…')"
            />
            <p mText size="sm" tone="muted">{{ status() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOtpSingleExample {
    protected readonly code = signal('')
    protected readonly status = signal('Paste "123-456" — the dash is dropped.')
}
