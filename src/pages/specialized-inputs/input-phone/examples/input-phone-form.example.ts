import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MInputPhone} from '@banzamel/mineralui-angular/inputs/input-phone'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-phone-form',
    imports: [MInputPhone, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <m-input-phone
                label="Mobile"
                clearable
                [formControl]="phone"
                [(countryCode)]="country"
                (formattedChange)="formatted.set($event)"
            />
            <p mText size="sm" tone="muted">
                Control value: "{{ value() }}" · country: {{ country() }} · shown: "{{ formatted() }}"
            </p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPhoneFormExample {
    protected readonly phone = new FormControl('600700800', {nonNullable: true, validators: Validators.required})
    protected readonly country = signal('PL')
    protected readonly formatted = signal('600 700 800')
    protected readonly value = toSignal(this.phone.valueChanges, {initialValue: this.phone.value})
}
