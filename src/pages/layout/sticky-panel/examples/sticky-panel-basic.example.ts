import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCard, MCardBody} from '@banzamel/mineralui-angular/cards/card'
import {MTimeline, MTimelineItem} from '@banzamel/mineralui-angular/display/timeline'
import {MGrid, MGridItem} from '@banzamel/mineralui-angular/layout/grid'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MStickyPanel} from '@banzamel/mineralui-angular/layout/sticky-panel'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

@Component({
    selector: 'app-sticky-panel-basic',
    imports: [MCard, MCardBody, MGrid, MGridItem, MStack, MStickyPanel, MText, MTimeline, MTimelineItem],
    template: `
        <m-grid>
            <m-grid-item [sm]="12" [md]="7">
                <m-stack>
                    @for (section of sections; track section) {
                        <m-card>
                            <m-card-body>
                                <p mText weight="semibold">Section {{ section }}</p>
                                <p mText tone="muted" size="sm">
                                    Long-form copy that simulates a detail page. Scroll the page to see the rail on the
                                    right stick below the header.
                                </p>
                            </m-card-body>
                        </m-card>
                    }
                </m-stack>
            </m-grid-item>
            <m-grid-item [sm]="12" [md]="5">
                <m-sticky-panel [top]="88" [bottomGap]="32" label="Lessons timeline">
                    <m-stack>
                        <p mText size="sm" weight="semibold">Lessons timeline</p>
                        <ol mTimeline size="sm">
                            @for (lesson of lessons; track lesson.id) {
                                <li mTimelineItem [heading]="lesson.heading" [date]="lesson.date"></li>
                            }
                        </ol>
                    </m-stack>
                </m-sticky-panel>
            </m-grid-item>
        </m-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyPanelBasicExample {
    protected readonly sections = Array.from({length: 16}, (_, index) => index + 1)
    protected readonly lessons = Array.from({length: 20}, (_, index) => ({
        id: index + 1,
        heading: `Lesson ${index + 1}`,
        date: `${WEEKDAYS[index % WEEKDAYS.length]} 09:00`,
    }))
}
