import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MIcon, mMoonIcon, mSearchIcon, mTranslateIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MNavbar, MNavbarActions, MNavbarBrand, MNavbarNavs} from '@banzamel/mineralui-angular/layout/navbar'
import {MNavs} from '@banzamel/mineralui-angular/layout/navs'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-navbar-product',
    imports: [MButton, MIcon, MInline, MNavbar, MNavbarActions, MNavbarBrand, MNavbarNavs, MNavs, MText],
    template: `
        <nav mNavbar aria-label="Product">
            <strong mNavbarBrand mText weight="bold">MineralUI</strong>
            <!-- Rendered horizontally in the bar and vertically in the mobile menu. -->
            <ng-template mNavbarNavs let-orientation>
                <m-navs [orientation]="orientation" [items]="links" />
            </ng-template>
            <button mButton size="sm">Get started</button>
            <!-- End of the bar; the mobile menu footer below the breakpoint. -->
            <ng-template mNavbarActions>
                <m-inline>
                    <button mButton size="sm" variant="ghost" iconOnly aria-label="Search">
                        <m-icon [icon]="icons.search" />
                    </button>
                    <button mButton size="sm" variant="ghost" iconOnly aria-label="Language">
                        <m-icon [icon]="icons.language" />
                    </button>
                    <button mButton size="sm" variant="ghost" iconOnly aria-label="Theme">
                        <m-icon [icon]="icons.theme" />
                    </button>
                </m-inline>
            </ng-template>
        </nav>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarProductExample {
    protected readonly icons = {search: mSearchIcon, language: mTranslateIcon, theme: mMoonIcon}
    protected readonly links = [
        {href: '#overview', label: 'Overview', current: true},
        {href: '#components', label: 'Components'},
        {href: '#tokens', label: 'Tokens'},
        {href: '#pricing', label: 'Pricing'},
    ]
}
