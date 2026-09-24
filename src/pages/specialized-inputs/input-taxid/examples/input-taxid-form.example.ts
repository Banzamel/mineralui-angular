import {ChangeDetectionStrategy, Component} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {MInputTaxId} from '@banzamel/mineralui-angular/inputs/input-tax-id'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-taxid-form',
    imports: [MInputTaxId, MStack, MText, ReactiveFormsModule],
    template: `
        <form [formGroup]="company">
            <m-stack align="start">
                <m-input-tax-id label="Company NIP" taxIdType="NIP" formControlName="nip" />
                <m-input-tax-id label="REGON" taxIdType="REGON" formControlName="regon" />
                <p mText size="sm" tone="muted">
                    nip: "{{ value().nip }}" · regon: "{{ value().regon }}" · form: {{ status() }}
                </p>
            </m-stack>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTaxIdFormExample {
    protected readonly company = new FormGroup({
        nip: new FormControl('5260250274', {nonNullable: true, validators: Validators.required}),
        regon: new FormControl('', {nonNullable: true}),
    })
    protected readonly value = toSignal(this.company.valueChanges, {initialValue: this.company.getRawValue()})
    protected readonly status = toSignal(this.company.statusChanges, {initialValue: this.company.status})
}
