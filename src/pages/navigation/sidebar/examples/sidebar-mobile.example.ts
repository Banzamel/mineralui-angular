import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MIcon, mFolderIcon, mHomeIcon, mMenuIcon} from '@banzamel/mineralui-angular/icons'
import {
    MSidebar,
    MSidebarBody,
    MSidebarHeader,
    MSidebarItem,
    MSidebarNav,
} from '@banzamel/mineralui-angular/layout/sidebar'

@Component({
    selector: 'app-sidebar-mobile',
    imports: [MButton, MIcon, MSidebar, MSidebarBody, MSidebarHeader, MSidebarItem, MSidebarNav],
    template: `
        <button mButton variant="outlined" aria-haspopup="dialog" (click)="menuOpen.set(true)">
            <m-icon mStart [icon]="icons.menu" />Open navigation
        </button>

        <!-- A huge mobileBreakpoint forces the dialog mode at any width, just for this demo. -->
        <m-sidebar
            ariaLabel="Demo navigation"
            [mobileBreakpoint]="100000"
            [mobileTrigger]="false"
            [(mobileOpen)]="menuOpen"
        >
            <m-sidebar-header bordered>Acme</m-sidebar-header>
            <m-sidebar-body>
                <nav mSidebarNav aria-label="Demo">
                    <a mSidebarItem href="#home" [active]="true" (click)="navigate($event)">
                        <m-icon mStart [icon]="icons.home" />Home
                    </a>
                    <a mSidebarItem href="#projects" (click)="navigate($event)">
                        <m-icon mStart [icon]="icons.folder" />Projects
                    </a>
                </nav>
            </m-sidebar-body>
        </m-sidebar>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMobileExample {
    protected readonly icons = {menu: mMenuIcon, home: mHomeIcon, folder: mFolderIcon}
    protected readonly menuOpen = signal(false)

    // In an app the router closes it: set mobileOpen to false on NavigationEnd.
    protected navigate(event: Event): void {
        event.preventDefault()
        this.menuOpen.set(false)
    }
}
