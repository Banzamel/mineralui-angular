import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCardDaySchedule} from '@banzamel/mineralui-angular/cards/card-day-schedule'
import type {MCardDayScheduleTab, MDayScheduleEntry} from '@banzamel/mineralui-angular/cards/card-day-schedule'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MProgressBar} from '@banzamel/mineralui-angular/display/progress-bar'
import {mBellIcon, mCalendarIcon, mUsersIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-card-day-schedule-office',
    imports: [MButton, MCardDaySchedule, MProgressBar],
    template: `
        <m-card-day-schedule
            heading="Tuesday, 14 Oct"
            description="Office day"
            workdayStart="08:00"
            workdayEnd="16:00"
            color="info"
            [timeline]="timeline"
            [tabs]="tabs"
        >
            <m-progress-bar mDayScheduleSummary label="Day booked" [value]="62" showValue />
            <button mButton mDayScheduleFooter size="sm" variant="outlined">Open calendar</button>
        </m-card-day-schedule>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDayScheduleOfficeExample {
    protected readonly timeline: readonly MDayScheduleEntry[] = [
        {id: 'standup', time: '09:00', title: 'Team stand-up', description: 'Room B2 · 15 min', icon: mUsersIcon},
        {id: 'review', time: '11:30', title: 'Design review', description: 'Checkout redesign', icon: mCalendarIcon},
        {
            id: 'deadline',
            time: '15:00',
            title: 'Release notes due',
            description: 'Send to marketing',
            icon: mBellIcon,
            color: 'warning',
        },
    ]
    protected readonly tabs: readonly MCardDayScheduleTab[] = [
        {type: 'free', title: 'Free slots', items: [{label: '12:30 – 13:30', value: 'Lunch window'}]},
        {
            type: 'alerts',
            title: 'Alerts',
            items: [
                {label: 'Deadline', value: 'Release notes', status: '15:00'},
                {label: 'Room change', value: 'Review moved to B4'},
            ],
        },
        {type: 'info', title: 'Info', items: []},
    ]
}
