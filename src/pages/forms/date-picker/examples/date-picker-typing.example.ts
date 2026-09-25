import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MDatePicker} from '@banzamel/mineralui-angular/dropdowns/date-picker'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-date-picker-typing',
    imports: [MDatePicker, MStack, MText],
    template: `
        <m-stack align="start">
            <m-date-picker label="Due date" helperText="Type 12 or 1.3, then Tab or Enter" clearable [(value)]="due" />
            <m-date-picker label="ISO order" format="YYYY/MM/DD" separator="-" />
            <m-date-picker label="US order" format="MM/DD/YYYY" separator="/" />
            <p mText tone="muted">Value: {{ due()?.toDateString() ?? 'null' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerTypingExample {
    protected readonly due = signal<Date | null>(null)
}
