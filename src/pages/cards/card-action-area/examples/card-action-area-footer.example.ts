import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MCard, MCardBody, MCardFooter, MCardHeader} from '@banzamel/mineralui-angular/cards/card'
import {MCardActionArea} from '@banzamel/mineralui-angular/cards/card-action-area'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MIcon, mArrowRightIcon, mUserIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-card-action-area-footer',
    imports: [
        MCard,
        MCardHeader,
        MCardBody,
        MCardFooter,
        MCardActionArea,
        MButton,
        MIcon,
        MInline,
        MStack,
        MHeading,
        MText,
    ],
    template: `
        <m-card [stretch]="false" class="app-card-action-area-demo">
            <m-card-header><h3 mHeading>Customer workspace</h3></m-card-header>
            <m-card-body>
                <!-- A button holds phrasing content only: spans, text, icons. -->
                <button mCardActionArea color="success" (click)="opened.set(opened() + 1)">
                    <m-stack spacing="xs">
                        <m-inline justify="between" align="center">
                            <!-- Icons without their own color take the area's color. -->
                            <m-icon [icon]="icons.user" />
                            <span mText weight="semibold">Open profile</span>
                            <m-icon [icon]="icons.arrow" />
                        </m-inline>
                        <span mText tone="muted" size="sm">Opened {{ opened() }} times.</span>
                    </m-stack>
                </button>
            </m-card-body>
            <m-card-footer>
                <!-- The footer buttons are separate actions, outside the area. -->
                <m-inline justify="between">
                    <button mButton variant="ghost" size="sm">Archive</button>
                    <button mButton size="sm">Assign owner</button>
                </m-inline>
            </m-card-footer>
        </m-card>
    `,
    styles: `
        .app-card-action-area-demo {
            max-width: 26rem;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardActionAreaFooterExample {
    protected readonly icons = {user: mUserIcon, arrow: mArrowRightIcon}
    protected readonly opened = signal(0)
}
