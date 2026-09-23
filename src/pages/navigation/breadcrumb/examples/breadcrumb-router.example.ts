import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MBreadcrumb, MBreadcrumbItemDef} from '@banzamel/mineralui-angular/layout/breadcrumb'

@Component({
    selector: 'app-breadcrumb-router',
    imports: [MBreadcrumb, MBreadcrumbItemDef, RouterLink],
    template: `
        <nav mBreadcrumb [maxItems]="3">
            <a *mBreadcrumbItem routerLink="/docs">Docs</a>
            @for (crumb of path; track crumb.path) {
                <a
                    *mBreadcrumbItem="let current"
                    [routerLink]="crumb.path"
                    [attr.aria-current]="current ? 'page' : null"
                >
                    {{ crumb.title }}
                </a>
            }
        </nav>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbRouterExample {
    protected readonly path = [
        {path: '/docs/layout-system', title: 'Layout'},
        {path: '/docs/navs', title: 'Navigation'},
        {path: '/docs/breadcrumb', title: 'Breadcrumb'},
    ]
}
