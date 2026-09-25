import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MDatePicker} from '@banzamel/mineralui-angular/dropdowns/date-picker'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-date-picker-time',
    imports: [MDatePicker, MStack, MText],
    template: `
        <m-stack align="start">
            <m-date-picker
                label="Meeting"
                withTime
                [minuteStep]="15"
                helperText="Minutes round to a quarter on blur"
                [(value)]="meeting"
            />
            <m-date-picker label="Alarm" withTime timeFormat="12h" showSeconds />
            <p mText tone="muted">Value: {{ meeting()?.toLocaleString() ?? 'null' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerTimeExample {
    protected readonly meeting = signal<Date | null>(new Date(2026, 8, 24, 14, 30))
}
