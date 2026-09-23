import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'

@Component({
    selector: 'app-button-links',
    imports: [MButton, MInline, RouterLink],
    template: `
        <m-inline>
            <!-- Navigation stays a link: put mButton on the anchor, with routerLink or href. -->
            <a mButton routerLink="/docs/button-group">Button group</a>
            <a mButton variant="outlined" href="https://mineralui.io" target="_blank" rel="noopener">mineralui.io</a>
            <!-- A disabled anchor gets aria-disabled and swallows clicks before routerLink sees them. -->
            <a mButton variant="ghost" routerLink="/docs/installation" disabled>Unavailable</a>
        </m-inline>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonLinksExample {}
