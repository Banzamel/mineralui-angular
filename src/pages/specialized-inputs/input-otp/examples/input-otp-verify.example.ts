import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MInputOTP} from '@banzamel/mineralui-angular/inputs/input-otp'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-otp-verify',
    imports: [MInputOTP, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <m-input-otp
                label="Enter the 4-digit PIN (hint: 2468)"
                [length]="4"
                [formControl]="pin"
                [errorText]="wrong() ? 'Wrong PIN, try again' : undefined"
                (completed)="verify($event)"
            />
            <p mText size="sm" tone="muted">{{ status() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOtpVerifyExample {
    protected readonly pin = new FormControl('', {nonNullable: true, validators: Validators.required})
    protected readonly wrong = signal(false)
    protected readonly status = signal('Waiting for the PIN…')

    protected verify(code: string): void {
        const ok = code === '2468'
        this.wrong.set(!ok)
        this.status.set(ok ? 'Verified ✓' : `"${code}" rejected`)
    }
}
