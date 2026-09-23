import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink, RouterLinkActive} from '@angular/router'
import {MNavs} from '@banzamel/mineralui-angular/layout/navs'
import {MLink} from '@banzamel/mineralui-angular/typography/link'

@Component({
    selector: 'app-navs-router',
    imports: [MLink, MNavs, RouterLink, RouterLinkActive],
    template: `
        <nav aria-label="Navigation components">
            <m-navs>
                @for (page of pages; track page.path) {
                    <a
                        mLink
                        routerLink="/docs/{{ page.path }}"
                        routerLinkActive
                        #active="routerLinkActive"
                        [current]="active.isActive"
                    >
                        {{ page.title }}
                    </a>
                }
            </m-navs>
        </nav>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavsRouterExample {
    protected readonly pages = [
        {path: 'navs', title: 'Navs'},
        {path: 'breadcrumb', title: 'Breadcrumb'},
        {path: 'link', title: 'Link'},
    ]
}
