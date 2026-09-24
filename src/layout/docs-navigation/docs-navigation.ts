import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {RouterLink, RouterLinkActive} from '@angular/router'
import {MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {MIcon} from '@banzamel/mineralui-angular/icons'
import {MInputSearch} from '@banzamel/mineralui-angular/inputs/input-search'
import type {DocsNavSection} from '@locales/docs-navigation'
import {DOCS_NAVIGATION, sectionIcon} from '@locales/docs-navigation'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const SEARCH_THRESHOLD = 2

const byTitle = (section: DocsNavSection): DocsNavSection => ({
    ...section,
    items: [...section.items].sort((a, b) => a.title.localeCompare(b.title)),
})

// TEMP: replace with MSidebarNav / MSidebarGroup / MSidebarItem (etap 2)
@Component({
    selector: 'doc-docs-navigation',
    imports: [MText, RouterLink, RouterLinkActive, MIcon, MInputSearch, MTranslatePipe],
    templateUrl: './docs-navigation.html',
    styleUrl: './docs-navigation.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsNavigation {
    protected readonly search = signal('')
    protected readonly sectionIcon = sectionIcon

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
}
