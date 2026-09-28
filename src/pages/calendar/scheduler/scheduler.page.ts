import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import schedulerAgenda from '@generated/examples/calendar/scheduler/scheduler-agenda'
import schedulerBasic from '@generated/examples/calendar/scheduler/scheduler-basic'
import schedulerComposed from '@generated/examples/calendar/scheduler/scheduler-composed'
import schedulerDetails from '@generated/examples/calendar/scheduler/scheduler-details'
import schedulerFilters from '@generated/examples/calendar/scheduler/scheduler-filters'
import schedulerMonth from '@generated/examples/calendar/scheduler/scheduler-month'
import schedulerResources from '@generated/examples/calendar/scheduler/scheduler-resources'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocProNotice} from '@kit/doc-pro-notice/doc-pro-notice'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

@Component({
    selector: 'doc-scheduler-page',
    imports: [DocArticle, DocSection, DocPreview, DocProNotice, DocPropsTable, MCode, MList, MListItem],
    template: `
        <doc-article
            title="MScheduler"
            description="A full scheduler — week, day, timeline, month and agenda views with resources, drag & drop, a toolbar, filters and event details — that you can also take apart and compose yourself."
        >
            <doc-pro-notice
                [components]="['MScheduler']"
                reason="The scheduler is part of MineralUI Pro alongside MCalendarBoard and MTimelineBoard."
            />

            <doc-section
                title="Scheduler"
                description="Switch views from the menu (it also hides weekends), page with the arrows or pick a date. Click an event for its details, an empty slot to report it. The filter narrows the events: the scheduler only reports filterValues, the app filters. Below 640 px the view falls back to the agenda and details open in a bottom sheet."
            >
                <doc-preview [example]="examples.schedulerBasic" />
            </doc-section>

            <doc-section
                title="Month"
                description="A day with more than monthMaxEvents events collapses to '+N more', which opens the whole day in a popover (morePopover; (moreClick) reports it either way). The day number or 'Open day' drills down to the day view, and 'Back to month' returns to the same month. monthDensityBar adds a bar of how busy each day is. With draggable a chip moves to another day — pointer or M, arrows by a day / week, Enter — keeping its time of day and duration; the holiday block refuses drops."
            >
                <doc-preview [example]="examples.schedulerMonth" />
            </doc-section>

            <doc-section
                title="Resources and drag & drop"
                description="With resource sets the day view gets a column and the timeline a row per resource (the view menu offers each set). Drag an event to another time or person, drag its bottom / right edge to change the end, or drag on empty space to add a lesson. Hatched bands are unavailable: advisory ones accept drops, the closed evening and the sick-leave block refuse them, and dropValidator refuses Physics outside the lab. The scheduler only reports (eventDrop), (eventResize) and (rangeSelect) — the app moves the events."
            >
                <doc-preview [example]="examples.schedulerResources" />
            </doc-section>

            <doc-section
                title="Filters and loading"
                description="Filters are definitions only: their values live in [(filterValues)] (a missing key means 'All'), a multiple filter holds an array, and a long option list gets a search field. Checkbox entries of the view menu come from [viewToggles] with their state in [(toggleValues)]. 'Clear filters' empties filterValues and emits (clearFilters). Here the lessons load for every drawn range from (rangeChange): while loading is set the old events stay under a scrim and the empty state waits."
            >
                <doc-preview [example]="examples.schedulerFilters" />
            </doc-section>

            <doc-section
                title="Details"
                description="detailsMode picks where the details open: auto (a popover, a bottom sheet below 640 px), popover, sheet or none — then only (eventSelect) and [(openEventId)] report the choice. ng-template[mSchedulerEvent] replaces the content of the bars and [mSchedulerEventHeader] the title block of the details. peopleClickable turns the leader and participants into buttons reported by (personClick); more than 12 people collapse behind '+N'."
            >
                <doc-preview [example]="examples.schedulerDetails" />
            </doc-section>

            <doc-section
                title="Composition"
                description="[mSchedulerProvider] holds the state; place the parts — m-scheduler-toolbar, m-scheduler-filter-bar, m-scheduler-body or a single view — where you need them, and read or drive the same state with injectMScheduler() in your own components. Here ng-template[mSchedulerEventDetails] on the provider replaces the body of the details (description, location and people) in every part."
            >
                <doc-preview [example]="examples.schedulerComposed" />
            </doc-section>

            <doc-section
                title="A single view"
                description="Any part works on its own with mSchedulerProvider on its host. This agenda lists seven days including the empty ones (showEmptyDays, their text comes from [texts]) and, with height='auto', grows with its content instead of scrolling inside — the page scrolls."
            >
                <doc-preview [example]="examples.schedulerAgenda" />
            </doc-section>

            <doc-section title="Data and outputs">
                <ul mList>
                    <li mListItem>
                        Events are plain data. Activating one emits <code mCode>(eventSelect)</code> and opens its
                        details (<code mCode>[(openEventId)]</code>); the actions from
                        <code mCode>eventMenuItems(event)</code> and <code mCode>event.menuItems</code> are reported by
                        <code mCode>(eventAction)</code>.
                    </li>
                    <li mListItem>
                        <code mCode>view</code>, <code mCode>date</code>, <code mCode>showWeekends</code>,
                        <code mCode>openEventId</code>, <code mCode>filterValues</code> and
                        <code mCode>toggleValues</code> are two-way bindable. <code mCode>(rangeChange)</code> reports
                        the drawn range once after the first render and on every change — the moment to load data.
                    </li>
                    <li mListItem>
                        <code mCode>ng-template[mSchedulerEvent]</code> replaces the content of event bars, chips and
                        agenda rows; <code mCode>[mSchedulerEventDetails]</code> /
                        <code mCode>[mSchedulerEventHeader]</code>
                        the body / title of the details. Declared in a part, a template applies to that part only.
                    </li>
                    <li mListItem>
                        <code mCode>height="auto"</code> sizes the scheduler to its content and lets the page scroll;
                        the day heads stick under <code mCode>--mineral-scheduler-sticky-top</code>.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="Accessibility">
                <ul mList>
                    <li mListItem>
                        The toolbar is a WAI-ARIA toolbar with one Tab stop: ← / → move between its controls (react-pro
                        has the role without the keys). Period changes are announced in a live region.
                    </li>
                    <li mListItem>
                        Events are buttons named by title, date, time and state (recurring, cancelled, conflict) with
                        <code mCode>aria-haspopup="dialog"</code> / <code mCode>aria-expanded</code>. Closing the
                        details returns focus to the event.
                    </li>
                    <li mListItem>
                        With <code mCode>draggable</code> an event is moved without a pointer: M enters the move mode
                        (<code mCode>aria-pressed</code>, <code mCode>aria-keyshortcuts</code>), arrows move it by
                        <code mCode>snapMinutes</code> or to the next day / resource, Shift+arrows by an hour, Enter
                        drops and Escape cancels; Shift+M changes the end (<code mCode>resizable</code>). The details
                        offer "Move" / "Resize" as the discoverable path. Every step and refusal is announced.
                    </li>
                    <li mListItem>
                        The month is a table (react-pro: a grid without grid keyboard navigation); day numbers are
                        buttons that open the day, with <code mCode>aria-current="date"</code> on today.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MScheduler" />
                <doc-props-table api="MSchedulerProvider" />
                <doc-props-table api="MSchedulerToolbar" />
                <doc-props-table api="MSchedulerFilterBar" />
                <doc-props-table api="MSchedulerBody" />
                <doc-props-table api="MSchedulerTimeGrid" />
                <doc-props-table api="MSchedulerTimeline" />
                <doc-props-table api="MSchedulerMonth" />
                <doc-props-table api="MSchedulerAgenda" />
                <doc-props-table api="MSchedulerEventDetail" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerPage {
    protected readonly examples = {
        schedulerBasic,
        schedulerMonth,
        schedulerResources,
        schedulerFilters,
        schedulerDetails,
        schedulerComposed,
        schedulerAgenda,
    }
}
