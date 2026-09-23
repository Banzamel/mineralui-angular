import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink, RouterLinkActive} from '@angular/router'
import {MLink} from '@banzamel/mineralui-angular/typography/link'

@Component({
    selector: 'app-link-router',
    imports: [MLink, RouterLink, RouterLinkActive],
    template: `
        <nav aria-label="Typography">
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
            <a mLink disabled routerLink="/docs/text">Text (disabled)</a>
        </nav>
    `,
    styles: 'nav { display: flex; flex-wrap: wrap; gap: 1rem; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkRouterExample {
    protected readonly pages = [
        {path: 'link', title: 'Link'},
        {path: 'heading', title: 'Heading'},
        {path: 'list', title: 'List'},
    ]
}
