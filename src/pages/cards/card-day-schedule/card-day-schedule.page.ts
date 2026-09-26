import {ChangeDetectionStrategy, Component} from '@angular/core'
import cardDayScheduleOffice from '@generated/examples/cards/card-day-schedule/card-day-schedule-office'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

@Component({
    selector: 'doc-card-day-schedule-page',
    imports: [DocArticle, DocSection, DocPreview, DocPropsTable],
    template: `
        <doc-article
            title="MCardDaySchedule"
            description="Day overview card: a timeline of the day's events, and a side panel with a summary and tabs of free slots, alerts and info."
        >
            <doc-section
                title="Office day"
                description="The summary slot takes any block (here a progress bar); tabs with no items are skipped and the first remaining one is selected. Buttons in the footer take the card color."
            >
                <doc-preview [example]="examples.office" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The timeline is an ordered list; event dots are decorative. The side panel is an MTabs strip named by mineralui.daySchedule.details, each tab label includes its item count. The empty-timeline text comes from mineralui.daySchedule.empty or the [mDayScheduleEmpty] slot."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="title is renamed heading (ADR 0004); timeline titles, descriptions and times are strings and the icon is an MIconDef. summary, footer and emptyTimeline become the [mDayScheduleSummary], [mDayScheduleFooter] and [mDayScheduleEmpty] slots; footer colors come from M_COLOR_SCOPE instead of cloning children (ADR 0016). The two columns split when the card itself is at least 720 px wide (container query) instead of at the xl viewport breakpoint. All MCard inputs apply."
            />

            <doc-section title="MCardDaySchedule API">
                <doc-props-table api="MCardDaySchedule" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDaySchedulePage {
    protected readonly examples = {office: cardDayScheduleOffice}
}
