import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MTimePicker} from '@banzamel/mineralui-angular/dropdowns/time-picker'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-time-picker-typing',
    imports: [MStack, MText, MTimePicker],
    template: `
        <m-stack align="start">
            <m-time-picker label="Start" helperText="Type 9 or 930, then Tab or Enter" clearable [(value)]="start" />
            <m-time-picker
                label="Slot"
                [minuteStep]="15"
                helperText="Minutes round to a quarter on blur"
                [(value)]="slot"
            />
            <p mText tone="muted">Values: {{ start() ?? 'null' }}, {{ slot() ?? 'null' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerTypingExample {
    protected readonly start = signal<string | null>(null)
    protected readonly slot = signal<string | null>('10:30')
}
