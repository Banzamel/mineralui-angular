import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MSegment, MSegmented} from '@banzamel/mineralui-angular/controls/segmented'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MIcon, mCalendarIcon, mListIcon} from '@banzamel/mineralui-angular/icons'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-segmented-custom',
    imports: [MBadge, MIcon, MSegment, MSegmented, MStack, MText],
    template: `
        <m-stack align="start">
            <m-segmented ariaLabel="View" size="sm" [(value)]="view">
                <m-segment value="list" label="List" [icon]="listIcon" />
                <m-segment value="calendar" label="Calendar" [icon]="calendarIcon" />
                <m-segment value="inbox"> Inbox <m-badge size="sm" rounded color="warning">3</m-badge> </m-segment>
                <m-segment value="archive" disabled>Archive</m-segment>
            </m-segmented>
            <!-- Icon-only options: ariaLabel gives each one its accessible name. -->
            <m-segmented ariaLabel="Density" size="sm" color="neutral" [(value)]="density">
                <m-segment value="compact" ariaLabel="Compact"><m-icon [icon]="listIcon" /></m-segment>
                <m-segment value="comfortable" ariaLabel="Comfortable"><m-icon [icon]="calendarIcon" /></m-segment>
            </m-segmented>
            <p mText size="sm" tone="muted">View: {{ view() }}, density: {{ density() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedCustomExample {
    protected readonly listIcon = mListIcon
    protected readonly calendarIcon = mCalendarIcon
    protected readonly view = signal('list')
    protected readonly density = signal('comfortable')
}
