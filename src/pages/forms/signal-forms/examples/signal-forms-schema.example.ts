import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {disabled, form, FormField, readonly, required} from '@angular/forms/signals'
import {MRadio, MRadioGroup} from '@banzamel/mineralui-angular/controls/radio'
import {MToggle} from '@banzamel/mineralui-angular/controls/toggle'
import {MRules} from '@banzamel/mineralui-angular/form'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'
import {MInputEmail} from '@banzamel/mineralui-angular/inputs/input-email'
import {MInputTaxId} from '@banzamel/mineralui-angular/inputs/input-tax-id'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

interface Billing {
    account: string
    company: string
    nip: string
    email: string
    invoiceCode: string
    locked: boolean
}

@Component({
    selector: 'app-signal-forms-schema',
    imports: [FormField, MInput, MInputEmail, MInputTaxId, MRadio, MRadioGroup, MStack, MToggle],
    template: `
        <m-stack>
            <fieldset mRadioGroup label="Account" direction="horizontal" [formField]="billing.account">
                <m-radio value="personal">Personal</m-radio>
                <m-radio value="company">Company</m-radio>
            </fieldset>
            <!-- Required and enabled only for a company account: the schema decides, not [required] / [disabled]. -->
            <m-input label="Company name" [formField]="billing.company" fullWidth />
            <m-input-tax-id label="NIP" taxIdType="NIP" [formField]="billing.nip" fullWidth />
            <m-input
                label="Invoice code"
                helperText="Two letters and four digits, e.g. AB1234"
                [formField]="billing.invoiceCode"
                fullWidth
            />
            <m-toggle [formField]="billing.locked">Lock the billing email</m-toggle>
            <m-input-email label="Billing email" [formField]="billing.email" fullWidth />
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsSchemaExample {
    protected readonly model = signal<Billing>({
        account: 'personal',
        company: '',
        nip: '',
        email: 'billing@example.com',
        invoiceCode: '',
        locked: true,
    })
    protected readonly billing = form(this.model, (path) => {
        // A disabled field is not validated, so `required` applies to company accounts only.
        disabled(path.company, ({valueOf}) => valueOf(path.account) !== 'company')
        disabled(path.nip, ({valueOf}) => valueOf(path.account) !== 'company')
        required(path.company)
        required(path.nip)
        // MRules: the react-pro validation rules for a schema, with the same error keys as MValidators.
        MRules.pattern(path.invoiceCode, /^[A-Z]{2}\d{4}$/, {message: 'Use two capital letters and four digits'})
        readonly(path.email, ({valueOf}) => valueOf(path.locked))
    })
}
