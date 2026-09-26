import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MWeekGrid, MWeekGridCellDef} from '@banzamel/mineralui-angular/data/week-grid'

@Component({
    selector: 'app-week-grid-shop',
    imports: [MWeekGrid, MWeekGridCellDef],
    template: `
        <m-week-grid
            heading="Shop visits"
            description="Customers per hour, Monday to Saturday"
            color="info"
            legendUnit="customers"
            [data]="visits"
            [max]="17"
            [days]="6"
            [slots]="10"
            [dayLabels]="days"
            [slotLabels]="hours"
            [cellHeight]="28"
        >
            <ng-template mWeekGridCell let-cell>{{ cell.value || '—' }}</ng-template>
        </m-week-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekGridShopExample {
    protected readonly days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    protected readonly hours = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18']
    protected readonly visits = [
        [0, 4, 7, 8, 8, 7, 6, 9, 11, 10],
        [0, 5, 8, 9, 9, 8, 7, 10, 12, 11],
        [0, 3, 6, 7, 8, 7, 5, 8, 10, 9],
        [0, 6, 9, 10, 10, 9, 8, 11, 13, 12],
        [0, 7, 11, 12, 11, 10, 9, 13, 15, 14],
        [0, 8, 13, 14, 13, 12, 10, 15, 17, 14],
    ]
}
