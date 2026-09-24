import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MIcon, mMenuIcon} from '@banzamel/mineralui-angular/icons'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MDrawer, MDrawerContent, MDrawerHeader} from '@banzamel/mineralui-angular/overlays/drawer'

@Component({
    selector: 'app-drawer-navigation',
    imports: [MButton, MIcon, MStack, MDrawer, MDrawerContent, MDrawerHeader],
    template: `
        <button mButton variant="outlined" (click)="open.set(true)">
            <m-icon mStart [icon]="menuIcon" />
            Menu
        </button>

        <m-drawer [(open)]="open" side="left" size="sm">
            <m-drawer-header bordered>Workspace</m-drawer-header>
            <ng-template mDrawerContent>
                <nav aria-label="Workspace">
                    <m-stack>
                        @for (link of links; track link) {
                            <a mButton variant="ghost" href="#" (click)="open.set(false)">{{ link }}</a>
                        }
                    </m-stack>
                </nav>
            </ng-template>
        </m-drawer>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerNavigationExample {
    protected readonly menuIcon = mMenuIcon
    protected readonly open = signal(false)
    protected readonly links = ['Dashboard', 'Projects', 'Team', 'Billing']
}
