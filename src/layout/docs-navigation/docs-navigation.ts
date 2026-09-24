import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router'
import {MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {mCopyrightIcon, MIcon} from '@banzamel/mineralui-angular/icons'
import {MInputSearch} from '@banzamel/mineralui-angular/inputs/input-search'
import {
    MSidebarBody,
    MSidebarFooter,
    MSidebarGroup,
    MSidebarHeader,
    MSidebarItem,
    MSidebarNav,
} from '@banzamel/mineralui-angular/layout/sidebar'
import {MLink} from '@banzamel/mineralui-angular/typography/link'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import type {DocsNavSection} from '@locales/docs-navigation'
import {DOCS_NAVIGATION, docIdFromUrl, sectionIcon} from '@locales/docs-navigation'
import {filter, map} from 'rxjs'

const SEARCH_THRESHOLD = 2

const byTitle = (section: DocsNavSection): DocsNavSection => ({
    ...section,
    items: [...section.items].sort((a, b) => a.title.localeCompare(b.title)),
})

/** Content of the docs `MSidebar` (docs-react `Navigation`): current page title, search, grouped pages, footer. */
@Component({
    selector: 'doc-docs-navigation',
    imports: [
        MIcon,
        MInputSearch,
        MLink,
        MSidebarBody,
        MSidebarFooter,
        MSidebarGroup,
        MSidebarHeader,
        MSidebarItem,
        MSidebarNav,
        MText,
        MTranslatePipe,
        RouterLink,
        RouterLinkActive,
    ],
    templateUrl: './docs-navigation.html',
    styleUrl: './docs-navigation.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsNavigation {
    private readonly router = inject(Router)

    protected readonly search = signal('')
    protected readonly sectionIcon = sectionIcon
    protected readonly copyrightIcon = mCopyrightIcon

    private readonly docId = toSignal(
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map((event) => docIdFromUrl(event.urlAfterRedirects))
        ),
        {initialValue: docIdFromUrl(this.router.url)}
    )

    protected readonly searchActive = computed(() => this.search().trim().length >= SEARCH_THRESHOLD)

    /** Same rules as docs-react: a category match keeps the whole section, otherwise items are filtered by title. */
    protected readonly sections = computed(() => {
        const query = this.search().trim().toLowerCase()
        if (!this.searchActive()) return DOCS_NAVIGATION.map(byTitle)

        return DOCS_NAVIGATION.flatMap((section) => {
            if (section.category.toLowerCase().includes(query)) return [byTitle(section)]
            const items = section.items.filter((item) => item.title.toLowerCase().includes(query))
            return items.length > 0 ? [byTitle({...section, items})] : []
        })
    })

    /** Title of the current page for the sidebar header (docs-react `activeTitle`). */
    protected readonly activeTitle = computed(() => {
        const docId = this.docId()
        for (const section of DOCS_NAVIGATION) {
            const match = section.items.find((item) => item.id === docId)
            if (match) return match.title
        }
        return 'Docs'
    })

    protected hasActive(section: DocsNavSection): boolean {
        const docId = this.docId()
        return section.items.some((item) => item.id === docId)
    }
}
