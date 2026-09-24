import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {NavigationEnd, Router, RouterLink} from '@angular/router'
import {MIcon} from '@banzamel/mineralui-angular/icons'
import type {MContainerSize} from '@banzamel/mineralui-angular/layout/container'
import {MTopbar, MTopbarLink} from '@banzamel/mineralui-angular/layout/topbar'
import {MDropdownItem, MDropdownMenu} from '@banzamel/mineralui-angular/overlays/dropdown-menu'
import {MPopoverTrigger} from '@banzamel/mineralui-angular/primitives/popover'
import type {DocsNavSection} from '@locales/docs-navigation'
import {DOCS_NAVIGATION, docIdFromUrl, sectionIcon} from '@locales/docs-navigation'
import {filter, map} from 'rxjs'

/** Sections of the docs as dropdowns under the header (docs-react `Topbar`), switched on in the settings. */
@Component({
    selector: 'doc-docs-topbar',
    imports: [MDropdownItem, MDropdownMenu, MIcon, MPopoverTrigger, MTopbar, MTopbarLink, RouterLink],
    template: `
        <nav mTopbar tone="subtle" aria-label="Documentation sections" [bordered]="false" [container]="container()">
            @for (section of sections; track section.category) {
                <button mTopbarLink [mPopoverTrigger]="menu" [active]="hasActive(section)">
                    @if (sectionIcon(section); as icon) {
                        <m-icon mStart [icon]="icon" />
                    }
                    {{ section.category }}
                </button>
                <m-dropdown-menu #menu panelClass="doc-topbar-menu">
                    @for (item of section.items; track item.id) {
                        <a
                            mDropdownItem
                            [routerLink]="['/docs', item.id]"
                            [attr.aria-current]="item.id === docId() ? 'page' : null"
                            >{{ item.title }}</a
                        >
                    }
                </m-dropdown-menu>
            }
        </nav>
    `,
    styles: `
        :host {
            display: block;
            position: sticky;
            top: var(--mineral-navbar-height);
            z-index: 40;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsTopbar {
    /** Width of the bar's container. */
    readonly container = input<MContainerSize>('content')

    private readonly router = inject(Router)
    protected readonly sections = DOCS_NAVIGATION
    protected readonly sectionIcon = sectionIcon
    protected readonly docId = toSignal(
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map((event) => docIdFromUrl(event.urlAfterRedirects))
        ),
        {initialValue: docIdFromUrl(this.router.url)}
    )

    protected hasActive(section: DocsNavSection): boolean {
        const docId = this.docId()
        return section.items.some((item) => item.id === docId)
    }
}
