import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MAppShell, MBody} from '@banzamel/mineralui-angular/layout/app-shell'
import {MContainer} from '@banzamel/mineralui-angular/layout/container'
import {MFooter} from '@banzamel/mineralui-angular/layout/footer'
import {MHeader} from '@banzamel/mineralui-angular/layout/header'
import {
    MSidebar,
    MSidebarBody,
    MSidebarHeader,
    MSidebarItem,
    MSidebarNav,
} from '@banzamel/mineralui-angular/layout/sidebar'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-app-shell',
    imports: [
        MAppShell,
        MBody,
        MContainer,
        MFooter,
        MHeader,
        MSidebar,
        MSidebarBody,
        MSidebarHeader,
        MSidebarItem,
        MSidebarNav,
        MSurface,
        MText,
    ],
    template: `
        <!-- The shell is at least one viewport tall; the demo caps it (and its sidebar) to fit the preview. -->
        <m-app-shell style="min-height: 22rem; --sidebar-height: 22rem">
            <!-- mobileBreakpoint 0: the demo sidebar stays in the preview instead of becoming a dialog. -->
            <m-sidebar [mobileBreakpoint]="0" [collapsible]="false">
                <m-sidebar-header>Mineral Admin</m-sidebar-header>
                <m-sidebar-body>
                    <nav mSidebarNav aria-label="Demo">
                        @for (link of links; track link.href) {
                            <a mSidebarItem [href]="link.href" [active]="link.current">{{ link.label }}</a>
                        }
                    </nav>
                </m-sidebar-body>
            </m-sidebar>

            <header mHeader>
                <strong mText weight="bold">Workspace</strong>
                <p mText size="sm" tone="muted">Billing and team settings</p>
            </header>

            <m-body>
                <m-container size="wide">
                    <div mSurface>
                        <p mText weight="semibold">Workspace</p>
                        <p mText tone="muted" size="sm">m-body fills the height left between header and footer.</p>
                    </div>
                </m-container>
            </m-body>

            <footer mFooter tone="subtle">
                <p mText size="sm" tone="muted">Built with MineralUI</p>
            </footer>
        </m-app-shell>
    `,
    styles: `
        :host {
            display: block;
            width: 100%;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellExample {
    protected readonly links = [
        {label: 'Dashboard', href: '#dashboard', current: true},
        {label: 'Users', href: '#users', current: false},
        {label: 'Settings', href: '#settings', current: false},
    ]
}
