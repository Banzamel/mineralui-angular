import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MIcon, mMenuIcon} from '@banzamel/mineralui-angular/icons'
import {
    MNavbar,
    MNavbarBrand,
    MNavbarMenu,
    MNavbarMenuFooter,
    MNavbarNavs,
    MNavbarToggle,
} from '@banzamel/mineralui-angular/layout/navbar'
import {MNavs} from '@banzamel/mineralui-angular/layout/navs'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-navbar-mobile',
    imports: [
        MButton,
        MIcon,
        MNavbar,
        MNavbarBrand,
        MNavbarMenu,
        MNavbarMenuFooter,
        MNavbarNavs,
        MNavbarToggle,
        MNavs,
        MText,
    ],
    template: `
        <!-- A huge breakpoint forces the mobile layout here; in an app keep the default 1024 px. -->
        <div class="stage">
            <nav mNavbar aria-label="Mobile demo" [mobileBreakpoint]="10000" [(open)]="open">
                <strong mNavbarBrand mText weight="bold">MineralUI</strong>
                <ng-template mNavbarNavs let-orientation>
                    <m-navs [orientation]="orientation" [items]="links" />
                </ng-template>
                <!-- Your own toggle replaces the default burger; the directive wires aria-expanded and the click. -->
                <button mButton mNavbarToggle variant="ghost" iconOnly aria-label="Site menu">
                    <m-icon [icon]="menuIcon" />
                </button>
                <p mNavbarMenu mText size="sm" tone="muted">Signed in as ann&#64;example.com</p>
                <button mNavbarMenuFooter mButton size="sm" variant="outlined">Sign out</button>
            </nav>
        </div>
        <p mText size="sm" tone="muted">Menu open: {{ open() }} — Escape, a press outside or a link closes it.</p>
    `,
    styles: '.stage { min-height: 320px; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarMobileExample {
    protected readonly menuIcon = mMenuIcon
    protected readonly open = signal(false)
    protected readonly links = [
        {href: '#overview', label: 'Overview'},
        {href: '#components', label: 'Components'},
        {href: '#pricing', label: 'Pricing'},
    ]
}
