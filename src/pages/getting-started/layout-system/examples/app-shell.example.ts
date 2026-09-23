import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MAppShell, MBody} from '@banzamel/mineralui-angular/layout/app-shell'
import {MContainer} from '@banzamel/mineralui-angular/layout/container'
import {MFooter} from '@banzamel/mineralui-angular/layout/footer'
import {MHeader} from '@banzamel/mineralui-angular/layout/header'
import {MNavs} from '@banzamel/mineralui-angular/layout/navs'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-app-shell',
    imports: [MAppShell, MBody, MContainer, MFooter, MHeader, MNavs, MSurface, MText],
    template: `
        <!-- The shell is at least one viewport tall; the demo caps it to fit the preview. -->
        <m-app-shell style="min-height: 22rem">
            <!-- TEMP: replace with MSidebar (etap 5) -->
            <aside mAppShellSidebar class="demo-sidebar">
                <m-navs orientation="vertical" [items]="links" />
            </aside>

            <header mHeader>
                <strong mText weight="bold">Mineral Admin</strong>
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
        .demo-sidebar {
            width: 12rem;
            padding: var(--mineral-spacing-md);
            border-right: 1px solid var(--mineral-border);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellExample {
    protected readonly links = [
        {label: 'Dashboard', href: '#dashboard', current: true},
        {label: 'Users', href: '#users'},
        {label: 'Settings', href: '#settings'},
    ]
}
