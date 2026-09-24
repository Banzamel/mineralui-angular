import {ChangeDetectionStrategy, Component} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MInputSlider} from '@banzamel/mineralui-angular/inputs/input-slider'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-slider-form',
    imports: [MInputSlider, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack>
            <m-input-slider
                label="Monthly budget ($)"
                [max]="5000"
                [step]="50"
                [formControl]="budget"
                [valueText]="'$' + value()"
                [errorMessages]="{min: 'Plans start at {min} a month'}"
            />
            <p mText size="sm" tone="muted">Control value: {{ value() }} · status: {{ status() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSliderFormExample {
    protected readonly budget = new FormControl(250, {nonNullable: true, validators: Validators.min(500)})
    protected readonly value = toSignal(this.budget.valueChanges, {initialValue: this.budget.value})
    protected readonly status = toSignal(this.budget.statusChanges, {initialValue: this.budget.status})
}
