import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MMiniCalendar} from '@banzamel/mineralui-angular/calendar/mini-calendar'
import {
    injectMScheduler,
    MSchedulerBody,
    MSchedulerEventDetailsDef,
    MSchedulerProvider,
} from '@banzamel/mineralui-angular/calendar/scheduler'
import type {MSchedulerEvent, MSchedulerView} from '@banzamel/mineralui-angular/calendar/scheduler'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MText} from '@banzamel/mineralui-angular/typography/text'

function at(dayOffset: number, hour: number): Date {
    const date = new Date()
    date.setDate(date.getDate() + dayOffset)
    date.setHours(hour, 0, 0, 0)
    return date
}

const EVENTS: readonly MSchedulerEvent[] = [
    {
        id: 'c1',
        title: 'Design review',
        startAt: at(0, 10),
        endAt: at(0, 11),
        color: 'var(--mineral-info)',
        meta: {agenda: 'Walk through the new onboarding screens.'},
    },
    {
        id: 'c2',
        title: 'Sprint planning',
        startAt: at(1, 9),
        endAt: at(1, 11),
        color: 'var(--mineral-success)',
        meta: {agenda: 'Pick the stories for sprint 14.'},
    },
    {id: 'c3', title: 'Retro', startAt: at(4, 15), endAt: at(4, 16), color: 'var(--mineral-warning)'},
]

// Your own header: it reads and drives the same state as the parts.
@Component({
    selector: 'app-scheduler-header',
    imports: [MButton, MText],
    template: `
        <div class="scheduler-header">
            <button mButton size="sm" variant="outlined" (click)="scheduler.goPrev()">Back</button>
            <strong mText>{{ scheduler.title() }}</strong>
            <button mButton size="sm" variant="outlined" (click)="scheduler.goNext()">Forward</button>
        </div>
    `,
    styles: `
        .scheduler-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            padding: 8px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class SchedulerHeader {
    protected readonly scheduler = injectMScheduler()
}

@Component({
    selector: 'app-scheduler-composed',
    imports: [MMiniCalendar, MSchedulerBody, MSchedulerEventDetailsDef, MSchedulerProvider, MText, SchedulerHeader],
    template: `
        <div
            class="composed"
            mSchedulerProvider
            [events]="events"
            [views]="['week', 'day']"
            [(view)]="view"
            [(date)]="date"
        >
            <!-- Declared on the provider, the template applies to every part. -->
            <ng-template mSchedulerEventDetails let-event>
                <p mText>{{ event.meta?.['agenda'] ?? 'No agenda yet.' }}</p>
            </ng-template>
            <aside>
                <m-mini-calendar size="sm" [value]="date() ?? today" (valueChange)="date.set($event ?? undefined)" />
            </aside>
            <section>
                <app-scheduler-header />
                <m-scheduler-body />
            </section>
        </div>
    `,
    styles: `
        .composed {
            display: grid;
            grid-template-columns: minmax(0, 280px) minmax(0, 1fr);
            gap: 16px;
            height: 560px;
        }
        .composed section {
            display: flex;
            flex-direction: column;
            min-height: 0;
            border: 1px solid var(--mineral-border);
            border-radius: var(--mineral-radius-lg);
            overflow: hidden;
        }
        @media (max-width: 640px) {
            .composed {
                grid-template-columns: minmax(0, 1fr);
                height: auto;
            }
            .composed section {
                height: 520px;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerComposedExample {
    protected readonly events = EVENTS
    protected readonly today = new Date()
    protected readonly view = signal<MSchedulerView | undefined>('week')
    protected readonly date = signal<Date | undefined>(undefined)
}
