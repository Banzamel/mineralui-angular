import {ChangeDetectionStrategy, Component} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MInputExpDate} from '@banzamel/mineralui-angular/inputs/input-exp-date'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-exp-date-form',
    imports: [MInputExpDate, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <m-input-exp-date
                label="Valid until"
                [maxYear]="maxYear"
                [formControl]="expires"
                [errorMessages]="{mExpDate: 'Check the date on your card'}"
            />
            <p mText size="sm" tone="muted">Control value: "{{ value() }}" · status: {{ status() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputExpDateFormExample {
    protected readonly maxYear = new Date().getFullYear() + 10
    protected readonly expires = new FormControl('', {nonNullable: true, validators: Validators.required})
    protected readonly value = toSignal(this.expires.valueChanges, {initialValue: this.expires.value})
    protected readonly status = toSignal(this.expires.statusChanges, {initialValue: this.expires.status})
}
