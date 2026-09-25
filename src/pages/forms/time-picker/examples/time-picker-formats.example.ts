import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MTimePicker} from '@banzamel/mineralui-angular/dropdowns/time-picker'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-time-picker-formats',
    imports: [MStack, MText, MTimePicker],
    template: `
        <m-stack align="start">
            <m-time-picker label="Alarm (12h)" format="12h" [(value)]="alarm" />
            <m-time-picker label="Lap time" showSeconds [(value)]="lap" />
            <p mText tone="muted">Values stay 24h: {{ alarm() ?? 'null' }}, {{ lap() ?? 'null' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerFormatsExample {
    protected readonly alarm = signal<string | null>('19:30')
    protected readonly lap = signal<string | null>('00:04:12')
}
