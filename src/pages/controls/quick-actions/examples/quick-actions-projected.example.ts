import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MQuickActions} from '@banzamel/mineralui-angular/controls/quick-actions'
import {MIcon, mDownloadIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'

@Component({
    selector: 'app-quick-actions-projected',
    imports: [MButton, MHeading, MIcon, MInline, MQuickActions, RouterLink],
    template: `
        <m-inline justify="between">
            <h3 mHeading>Buttons</h3>
            <!-- fullWidth=false lets the cluster hug its buttons next to other content. -->
            <!-- Projected mButtons inherit variant, size and color like the item buttons. -->
            <m-quick-actions variant="outlined" [fullWidth]="false" aria-label="Page actions">
                <a mButton routerLink="/docs/button">MButton docs</a>
                <a mButton routerLink="/docs/button-group">Button groups</a>
                <button mButton variant="filled"><m-icon mStart [icon]="downloadIcon" />Export</button>
            </m-quick-actions>
        </m-inline>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickActionsProjectedExample {
    protected readonly downloadIcon = mDownloadIcon
}
