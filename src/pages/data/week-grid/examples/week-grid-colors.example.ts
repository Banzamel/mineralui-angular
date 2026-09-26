import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MWeekGrid} from '@banzamel/mineralui-angular/data/week-grid'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

/** 7 × 24 office-week availability: weekday peaks at 9 and 17, a lunch dip, lighter weekends. */
function officeWeek(): number[][] {
    return Array.from({length: 7}, (_, day) =>
        Array.from({length: 24}, (_, hour) => {
            if (hour < 8 || hour > 20) return 0
            const weekday = day >= 1 && day <= 5
            const lunch = hour === 13 ? 0.6 : 1
            const evening = hour >= 18 ? 0.7 : 1
            const peak = hour === 9 || hour === 17 ? 1.05 : 1
            return Math.round((weekday ? 60 : 22) * (weekday ? 1 : 0.45) * lunch * evening * peak)
        })
    )
}

@Component({
    selector: 'app-week-grid-colors',
    imports: [MStack, MWeekGrid],
    template: `
        <m-stack>
            <m-week-grid
                heading="Bookings"
                description="primary"
                color="primary"
                legendUnit="bookings"
                [data]="week"
                [max]="65"
                [cellHeight]="20"
            />
            <m-week-grid
                heading="Attendance"
                description="success"
                color="success"
                legendUnit="staff"
                [data]="week"
                [max]="65"
                [cellHeight]="20"
            />
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekGridColorsExample {
    protected readonly week = officeWeek()
}
