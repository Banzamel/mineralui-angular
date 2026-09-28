import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MMiniCalendar} from '@banzamel/mineralui-angular/calendar/mini-calendar'
import type {MMiniCalendarRange} from '@banzamel/mineralui-angular/calendar/mini-calendar'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-mini-calendar-week',
    imports: [MMiniCalendar, MStack, MText],
    template: `
        <m-stack align="start">
            <m-mini-calendar [(value)]="day" [(month)]="month" [highlightRange]="week()" color="success" />
            <p mText tone="muted">Week: {{ weekLabel() }}</p>
            <p mText tone="muted">Showing: {{ monthLabel() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniCalendarWeekExample {
    protected readonly day = signal<Date | null>(new Date())
    protected readonly month = signal<Date | undefined>(undefined)

    // The Monday – Sunday week of the picked day, as a scheduler beside the calendar would show it.
    protected readonly week = computed<MMiniCalendarRange | undefined>(() => {
        const day = this.day()
        if (!day) return undefined
        const start = new Date(day.getFullYear(), day.getMonth(), day.getDate() - ((day.getDay() + 6) % 7))
        return {start, end: new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6)}
    })

    protected readonly weekLabel = computed(() => {
        const week = this.week()
        if (!week) return 'none'
        return new Intl.DateTimeFormat('en-GB', {day: 'numeric', month: 'short'}).formatRange(week.start, week.end)
    })

    protected readonly monthLabel = computed(() => {
        const month = this.month() ?? this.day() ?? new Date()
        return new Intl.DateTimeFormat('en-GB', {month: 'long', year: 'numeric'}).format(month)
    })
}
