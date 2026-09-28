import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MMiniCalendar} from '@banzamel/mineralui-angular/calendar/mini-calendar'
import type {MMiniCalendarMarker} from '@banzamel/mineralui-angular/calendar/mini-calendar'

@Component({
    selector: 'app-mini-calendar-markers',
    imports: [MMiniCalendar],
    template: `<m-mini-calendar [(value)]="day" [markers]="markers" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCalendarMarkersExample {
    protected readonly day = signal<Date | null>(new Date())

    // Up to three dots per day; their labels are read out with the day's name.
    protected readonly markers = (date: Date): MMiniCalendarMarker[] => {
        const markers: MMiniCalendarMarker[] = []
        if (date.getDay() === 1) markers.push({color: 'info', label: 'Team sync'})
        if (date.getDate() % 7 === 3) markers.push({color: 'error', label: 'Deadline'})
        if (date.getDate() === 15) markers.push({color: '#a855f7', label: 'Payday'})
        return markers
    }
}
