import {ChangeDetectionStrategy, Component, computed} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MInputCurrency} from '@banzamel/mineralui-angular/inputs/input-currency'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-currency-form',
    imports: [MInputCurrency, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <m-input-currency
                label="Price"
                currencySymbol="$"
                currencyPosition="start"
                decimalSeparator="."
                thousandSeparator=","
                placeholder="0.00"
                [formControl]="price"
                [errorMessages]="{min: 'The minimum price is {min}'}"
            />
            <p mText size="sm" tone="muted">Control value: {{ shown() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCurrencyFormExample {
    protected readonly price = new FormControl<number | null>(1299.9, [Validators.required, Validators.min(5)])
    private readonly value = toSignal(this.price.valueChanges, {initialValue: this.price.value})
    protected readonly shown = computed(() => {
        const value = this.value()
        return value === null ? 'null' : `${value} (${typeof value})`
    })
}
