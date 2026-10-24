import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MQuickActions} from '@banzamel/mineralui-angular/controls/quick-actions'
import type {MQuickActionItem} from '@banzamel/mineralui-angular/controls/quick-actions'
import {mCalendarIcon, mChartIcon, mFileIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-quick-actions-description',
    imports: [MQuickActions],
    template: `
        <!-- description adds a smaller second line under the label. -->
        <m-quick-actions
            aria-label="Create"
            layout="grid"
            size="md"
            variant="outlined"
            color="neutral"
            [columns]="3"
            [items]="actions"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickActionsDescriptionExample {
    protected readonly actions: readonly MQuickActionItem[] = [
        {label: 'New invoice', description: 'Draft and send to a client', icon: mFileIcon},
        {label: 'Schedule', description: 'Book a meeting slot', icon: mCalendarIcon},
        {label: 'Report', description: 'Monthly revenue summary', icon: mChartIcon},
    ]
}
