import {ChangeDetectionStrategy, Component, computed} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule} from '@angular/forms'
import {MSlider} from '@banzamel/mineralui-angular/controls/slider'
import type {MSliderMark} from '@banzamel/mineralui-angular/controls/slider'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-slider-budget',
    imports: [MSlider, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack>
            <!-- valueText is what a screen reader announces instead of the bare number. -->
            <m-slider
                label="Monthly budget"
                color="success"
                [formControl]="budget"
                [max]="1000"
                [step]="50"
                [marks]="marks"
                [valueText]="formatted()"
            />
            <p mText size="sm" tone="muted">Budget: {{ formatted() }}</p>
        </m-stack>
    `,
    styles: ':host { display: block; width: 100%; max-width: 28rem; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderBudgetExample {
    protected readonly budget = new FormControl(250, {nonNullable: true})
    protected readonly marks: readonly MSliderMark[] = [
        {value: 0, label: '$0'},
        {value: 500, label: '$500'},
        {value: 1000, label: '$1000'},
    ]
    private readonly value = toSignal(this.budget.valueChanges, {initialValue: this.budget.value})
    protected readonly formatted = computed(() => `$${this.value()}`)
}
