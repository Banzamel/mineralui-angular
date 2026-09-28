import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal} from '@angular/core'
import {MScheduler} from '@banzamel/mineralui-angular/calendar/scheduler'
import type {
    MSchedulerEvent,
    MSchedulerFilter,
    MSchedulerFilterValues,
    MSchedulerRange,
    MSchedulerToggle,
    MSchedulerToggleValues,
} from '@banzamel/mineralui-angular/calendar/scheduler'

const SUBJECTS = [
    {value: 'math', label: 'Math', color: 'var(--mineral-info)'},
    {value: 'science', label: 'Science', color: 'var(--mineral-success)'},
    {value: 'languages', label: 'Languages', color: 'var(--mineral-warning)'},
]

const ROOMS = Array.from({length: 12}, (_, index) => ({
    value: `r${index + 1}`,
    label: `Room ${index + 1}`,
    group: index < 6 ? 'Ground floor' : 'First floor',
}))

type Lesson = MSchedulerEvent & {meta: {subject: string; room: string}}

// A fake API: two lessons per working day of the requested range, a few of them cancelled.
function lessonsFor(range: MSchedulerRange): Lesson[] {
    const lessons: Lesson[] = []
    for (const day = new Date(range.start); day < range.end; day.setDate(day.getDate() + 1)) {
        if (day.getDay() === 0 || day.getDay() === 6) continue
        for (const [slot, hour] of [9, 13].entries()) {
            const seed = day.getDate() + slot
            const subject = SUBJECTS[seed % SUBJECTS.length]
            const room = ROOMS[(seed * 5) % ROOMS.length]
            if (!subject || !room) continue
            const startAt = new Date(day)
            startAt.setHours(hour, 0, 0, 0)
            const endAt = new Date(startAt)
            endAt.setHours(hour + 1, 30)
            lessons.push({
                id: `${day.toDateString()}-${slot}`,
                title: `${subject.label} — ${room.label}`,
                startAt,
                endAt,
                color: subject.color,
                cancelled: seed % 5 === 0,
                meta: {subject: subject.value, room: room.value},
            })
        }
    }
    return lessons
}

@Component({
    selector: 'app-scheduler-filters',
    imports: [MScheduler],
    template: `
        <m-scheduler
            [height]="560"
            [events]="shown()"
            [loading]="loading()"
            emptyState="No lessons match the filters"
            [filters]="filters"
            [(filterValues)]="filterValues"
            [legend]="legend"
            [viewToggles]="toggles"
            [(toggleValues)]="toggleValues"
            [dayStartHour]="8"
            [dayEndHour]="16"
            (rangeChange)="load($event)"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerFiltersExample {
    protected readonly filters: readonly MSchedulerFilter[] = [
        {id: 'subject', label: 'Subject', options: SUBJECTS, multiple: true, allLabel: 'All subjects'},
        {id: 'room', label: 'Room', options: ROOMS},
    ]
    protected readonly legend = SUBJECTS.map((subject) => ({label: subject.label, color: subject.color}))
    protected readonly toggles: readonly MSchedulerToggle[] = [{id: 'cancelled', label: 'Show cancelled'}]
    protected readonly filterValues = signal<MSchedulerFilterValues>({})
    protected readonly toggleValues = signal<MSchedulerToggleValues>({cancelled: true})
    protected readonly loading = signal(false)
    private readonly lessons = signal<readonly Lesson[]>([])
    private timer: ReturnType<typeof setTimeout> | undefined

    constructor() {
        inject(DestroyRef).onDestroy(() => clearTimeout(this.timer))
    }

    // The scheduler only reports the values: the app filters (here on the client, usually in the query).
    protected readonly shown = computed(() => {
        const values = this.filterValues()
        const subject = values['subject']
        const room = values['room']
        const subjects = Array.isArray(subject) && subject.length > 0 ? subject : undefined
        const showCancelled = this.toggleValues()['cancelled'] === true
        return this.lessons().filter(
            (lesson) =>
                (!subjects || subjects.includes(lesson.meta.subject)) &&
                (!room || lesson.meta.room === room) &&
                (showCancelled || !lesson.cancelled)
        )
    })

    // rangeChange fires once after the first render and on every period change — the moment to load.
    protected load(range: MSchedulerRange): void {
        clearTimeout(this.timer)
        this.loading.set(true)
        this.timer = setTimeout(() => {
            this.lessons.set(lessonsFor(range))
            this.loading.set(false)
        }, 600)
    }
}
