import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {
    MCalendarEvent,
    MCalendarEventActionEvent,
    MCalendarEventActionId,
} from '@banzamel/mineralui-angular/calendar/calendar-event'
import {MCalendarEventList} from '@banzamel/mineralui-angular/calendar/calendar-event-list'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import calendarEventMenu from '@generated/examples/calendar/calendar-event/calendar-event-menu'
import calendarEventTemplate from '@generated/examples/calendar/calendar-event/calendar-event-template'
import calendarTimelineDay from '@generated/examples/calendar/calendar-event/calendar-timeline-day'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocProNotice} from '@kit/doc-pro-notice/doc-pro-notice'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import {CALENDAR_AVATARS} from '../calendar-samples'

const EVENTS: readonly MCalendarEvent[] = [
    {
        id: 'planning',
        title: 'Sprint planning',
        description: 'Define scope for the next framework pass.',
        date: '2026-03-20',
        startTime: '09:00',
        endTime: '10:00',
        status: 'planned',
        type: 'Meeting',
        user: {
            id: 'anna',
            name: 'Anna Kowalska',
            avatar: CALENDAR_AVATARS.annaKowalska,
            color: 'rgba(14, 165, 233, 0.18)',
        },
    },
    {
        id: 'review',
        title: 'Release notes review',
        description: 'Opens the related documentation.',
        date: '2026-03-20',
        startTime: '09:30',
        endTime: '10:15',
        status: 'active',
        href: '/docs/calendar-event',
    },
    {id: 'offsite', title: 'Offsite', date: '2026-03-20', badgeLabel: 'Travel', status: 'cancelled'},
]

@Component({
    selector: 'doc-calendar-event-page',
    imports: [
        DocArticle,
        DocProNotice,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MCalendarEventList,
        MStack,
        MText,
    ],
    template: `
        <doc-article
            title="Calendar events"
            description="The agenda of a day as an event list (MCalendarEventList) or an hour timeline (MCalendarTimeline) — the building blocks MCalendarBoard shows in its day details, usable on their own."
        >
            <doc-pro-notice
                [components]="['MCalendarEventList', 'MCalendarTimeline']"
                reason="Calendar building blocks ship with MineralUI Pro alongside MCalendarBoard."
            />

            <doc-section
                title="Playground"
                description="Rows show the time, status and type badges, the owner and an actions menu. An event with href is a link; selectable turns the other titles into buttons. The list reports (eventSelect) and (eventAction); the page changes events."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack>
                        <m-calendar-event-list
                            label="Friday, March 20"
                            currentDate="2026-03-20"
                            [events]="events()"
                            [selectable]="selectable()"
                            [overlapWarning]="overlapWarning()"
                            [eventActions]="actions()"
                            (eventSelect)="log.set('Selected ' + $event.title)"
                            (eventAction)="onAction($event)"
                        />
                        <p mText size="sm" tone="muted" role="status">{{ log() }}</p>
                    </m-stack>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Day timeline"
                description="MCalendarTimeline places timed events on an hour axis (startHour – endHour); overlapping events stand side by side and all-day events move to a second tab. Activating an event opens its details with the menu; addable adds an 'add event' button to every hour. Hours before now are dimmed, the current one is highlighted."
            >
                <doc-preview [example]="examples.timeline" />
            </doc-section>

            <doc-section
                title="Own menu"
                description="eventMenuItems returns the menu of an event — or undefined to keep the built-in one ('Open' for href, then eventActions). Every chosen item without href arrives in (eventAction) with its id."
            >
                <doc-preview [example]="examples.menu" />
            </doc-section>

            <doc-section
                title="Own rows"
                description="An ng-template mCalendarEvent replaces the whole row (context: the event and its overlap flag); the component keeps the list item and, on the timeline, the place on the axis. The built-in menu and selection go away with the row."
            >
                <doc-preview [example]="examples.template" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="Both components give screen readers an ordered list in time order. A row's title is its only control (link or button, stretched over the row); the menu button next to it is a WAI-ARIA menu button named 'Event actions: title'. On the timeline the hour rows are hidden decoration, each block is a button naming the time and title (plus 'Overlaps another event'), and its details open as a dialog named by the title — Escape closes it and focus returns to the block. The 'add event at HH:00' buttons form one toolbar: a single Tab stop, ↑ / ↓ move between hours."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="MCalendarEventItem, the hour bar and the event popover are not public — MCalendarEventList and MCalendarTimeline are. onSelect / onEdit / onDelete and item.onSelect become (eventSelect) and (eventAction) with {actionId, event}; Edit / Delete appear through eventActions (React: when the handlers are passed), own items through eventMenuItems (event.menuItems is gone), renderEventItem through ng-template mCalendarEvent. React makes the whole row a link or button with the menu button inside it; here the title is the control. Selection needs selectable, and the timeline details opening needs eventDetails (React: both depend on whether onSelect is passed). New: label, heading, the add-event toolbar (React: loose buttons inside the hour rows), translated status badges, status colors from theme tokens (React: fixed rgba), a yyyy-MM-dd date read as local (React: UTC — the previous day west of Greenwich)."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MCalendarEventList" />
                    <doc-props-table api="MCalendarTimeline" />
                    <doc-props-table api="MCalendarEventDef" />
                    <doc-props-table api="MCalendarEvent" />
                    <doc-props-table api="MCalendarEventUser" />
                    <doc-props-table api="MCalendarActionItem" />
                    <doc-props-table api="MCalendarEventActionEvent" />
                    <doc-props-table api="MCalendarAddEvent" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarEventPage {
    protected readonly examples = {
        timeline: calendarTimelineDay,
        menu: calendarEventMenu,
        template: calendarEventTemplate,
    }

    protected readonly events = signal<readonly MCalendarEvent[]>(EVENTS)
    protected readonly log = signal('Choose an event or an action.')
    protected readonly selectable = signal(true)
    protected readonly overlapWarning = signal(true)
    protected readonly editDelete = signal(true)
    protected readonly actions = computed<readonly MCalendarEventActionId[]>(() =>
        this.editDelete() ? ['edit', 'delete'] : []
    )
    protected readonly controls = [
        booleanControl('selectable', this.selectable),
        booleanControl('overlapWarning', this.overlapWarning),
        booleanControl('editDelete', this.editDelete),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '[events]="events()"',
            this.selectable() && 'selectable',
            this.overlapWarning() && 'overlapWarning',
            this.editDelete() && `[eventActions]="['edit', 'delete']"`,
            this.selectable() && '(eventSelect)="open($event)"',
            '(eventAction)="onAction($event)"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-calendar-event-list\n    ${attrs.join('\n    ')}\n/>`
    })

    protected onAction({actionId, event}: MCalendarEventActionEvent): void {
        if (actionId === 'delete') {
            this.events.update((events) => events.filter((item) => item.id !== event.id))
            this.log.set(`Deleted ${event.title} (reset by reloading the page)`)
            return
        }
        this.log.set(`${actionId} ${event.title}`)
    }
}
