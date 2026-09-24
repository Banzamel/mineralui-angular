import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MTopbar, MTopbarLink} from '@banzamel/mineralui-angular/layout/topbar'
import {MDropdownItem, MDropdownMenu} from '@banzamel/mineralui-angular/overlays/dropdown-menu'
import {MPopoverTrigger} from '@banzamel/mineralui-angular/primitives/popover'

@Component({
    selector: 'app-topbar-router',
    imports: [MBadge, MDropdownItem, MDropdownMenu, MPopoverTrigger, MTopbar, MTopbarLink],
    template: `
        <!-- In an app: routerLink on the anchors, [active] from routerLinkActive. -->
        <nav mTopbar tone="subtle" aria-label="Workspace" [compactBreakpoint]="0">
            <a mTopbarLink href="#board" [active]="section() === 'board'" (click)="go($event, 'board')">Board</a>
            <a mTopbarLink href="#inbox" [active]="section() === 'inbox'" (click)="go($event, 'inbox')">
                Inbox<m-badge mEnd size="xs" color="error">5</m-badge>
            </a>
            <button mTopbarLink [mPopoverTrigger]="more" [active]="section() === 'members' || section() === 'billing'">
                Admin
            </button>
            <m-dropdown-menu #more>
                <a mDropdownItem href="#members" (click)="go($event, 'members')">Members</a>
                <a mDropdownItem href="#billing" (click)="go($event, 'billing')">Billing</a>
            </m-dropdown-menu>
        </nav>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarRouterExample {
    protected readonly section = signal('board')

    protected go(event: Event, section: string): void {
        event.preventDefault()
        this.section.set(section)
    }
}
