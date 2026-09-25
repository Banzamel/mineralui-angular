import {ChangeDetectionStrategy, Component, computed} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import type {MDateRange} from '@banzamel/mineralui-angular/dropdowns/calendar'
import {MDateRangePicker} from '@banzamel/mineralui-angular/dropdowns/date-range-picker'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-date-range-picker-form',
    imports: [MDateRangePicker, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <m-date-range-picker
                label="Stay"
                helperText="From today on, at least one night"
                [min]="today"
                [allowSameDay]="false"
                [formControl]="stay"
            />
            <p mText tone="muted">Value: {{ state().value }}</p>
            <p mText tone="muted">Errors: {{ state().errors }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerFormExample {
    protected readonly today = new Date()
    protected readonly stay = new FormControl<MDateRange | null>(null, Validators.required)
    // Zoneless: every control event is a new object, so the signal changes even when the value stays null.
    private readonly events = toSignal(this.stay.events)
    protected readonly state = computed(() => {
        this.events()
        const value = this.stay.value
        return {
            value: value ? `${value.start.toDateString()} → ${value.end.toDateString()}` : 'null',
            errors: JSON.stringify(this.stay.errors),
        }
    })
}
