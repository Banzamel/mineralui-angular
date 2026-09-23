import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MQuickActions} from '@banzamel/mineralui-angular/controls/quick-actions'
import type {MQuickActionItem} from '@banzamel/mineralui-angular/controls/quick-actions'
import {mBellIcon, mCalendarIcon, mChartIcon, mDownloadIcon, mFileIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-quick-actions-grid',
    imports: [MQuickActions],
    template: `
        <!-- The grid collapses to 2 columns up to 1024 px and to 1 column up to 720 px. -->
        <m-quick-actions
            aria-label="Shortcuts"
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
export class QuickActionsGridExample {
    protected readonly actions: readonly MQuickActionItem[] = [
        {label: 'Calendar', icon: mCalendarIcon},
        {label: 'Reports', icon: mChartIcon},
        {label: 'Documents', icon: mFileIcon, badge: 12},
        {label: 'Downloads', icon: mDownloadIcon},
        {label: 'Alerts', icon: mBellIcon, badge: true, badgeColor: 'error'},
        {label: 'Help center', href: 'https://mineralui.io', target: '_blank', rel: 'noopener', variant: 'ghost'},
    ]
}
