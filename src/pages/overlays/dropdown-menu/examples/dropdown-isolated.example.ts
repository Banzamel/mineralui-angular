import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MCard, MCardBody} from '@banzamel/mineralui-angular/cards/card'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MIcon, mEllipsisVerticalIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MDropdownItem, MDropdownMenu} from '@banzamel/mineralui-angular/overlays/dropdown-menu'
import {MPopoverTrigger} from '@banzamel/mineralui-angular/primitives/popover'
import {MText} from '@banzamel/mineralui-angular/typography/text'

// The whole card reacts to clicks (like a table row that opens a record); the menu inside must not trigger it.
@Component({
    selector: 'app-dropdown-isolated',
    imports: [MButton, MCard, MCardBody, MIcon, MInline, MDropdownItem, MDropdownMenu, MPopoverTrigger, MText],
    template: `
        <m-card class="doc-clickable-card">
            <m-card-body>
                <m-inline justify="between" align="center">
                    <span mText weight="semibold">Project Mineral</span>
                    <button
                        mButton
                        variant="ghost"
                        size="sm"
                        iconOnly
                        aria-label="Project actions"
                        [mPopoverTrigger]="menu"
                        (click)="$event.stopPropagation()"
                    >
                        <m-icon [icon]="moreIcon" />
                    </button>
                    <m-dropdown-menu #menu isolateClick placement="bottom-end">
                        <button mDropdownItem>Rename</button>
                        <button mDropdownItem>Archive</button>
                    </m-dropdown-menu>
                </m-inline>
                <p mText tone="muted" size="sm">Card clicked {{ clicks() }} times</p>
            </m-card-body>
        </m-card>
    `,
    styles: `
        .doc-clickable-card {
            max-width: 360px;
            cursor: pointer;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {'(click)': 'clicks.set(clicks() + 1)'},
})
export class DropdownIsolatedExample {
    protected readonly moreIcon = mEllipsisVerticalIcon
    protected readonly clicks = signal(0)
}
