import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import schedulerBasic from '@generated/examples/calendar/scheduler/scheduler-basic'
import schedulerComposed from '@generated/examples/calendar/scheduler/scheduler-composed'
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
            description="A full scheduler — week, day, month and agenda views with a toolbar, filters and event details — that you can also take apart and compose yourself."
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
                title="Composition"
                description="[mSchedulerProvider] holds the state; place the parts — m-scheduler-toolbar, m-scheduler-filter-bar, m-scheduler-body or a single view — where you need them, and read or drive the same state with injectMScheduler() in your own components."
            >
                <doc-preview [example]="examples.schedulerComposed" />
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
                <doc-props-table api="MSchedulerMonth" />
                <doc-props-table api="MSchedulerAgenda" />
                <doc-props-table api="MSchedulerEventDetail" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerPage {
    protected readonly examples = {schedulerBasic, schedulerComposed}
}
