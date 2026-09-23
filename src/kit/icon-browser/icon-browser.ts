import {
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    ElementRef,
    inject,
    input,
    signal,
} from '@angular/core'
import type {MIconDef} from '@banzamel/mineralui-angular/icons'
import {MIcon} from '@banzamel/mineralui-angular/icons'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'

export interface IconGroup {
    readonly title: string
    readonly tone: string
    /** Export names, e.g. `mSearchIcon`. */
    readonly items: readonly string[]
}

export interface IconTab {
    readonly id: string
    readonly label: string
    readonly groups: readonly IconGroup[]
}

const isIconDef = (value: unknown): value is MIconDef =>
    typeof value === 'object' && value !== null && 'name' in value && 'svg' in value

/** Export name → definition, from `import * as icons from '@banzamel/mineralui-angular/icons'`. */
export function iconMap(module: Readonly<Record<string, unknown>>): ReadonlyMap<string, MIconDef> {
    return new Map(Object.entries(module).flatMap(([name, value]) => (isIconDef(value) ? [[name, value]] : [])))
}

const COPIED_FOR_MS = 1200

/**
 * Searchable, tabbed icon catalog; each card copies the export name (counterpart of the docs-react icon browsers).
 *
 * TEMP: search, tabs, cards and badges replace with MInputSearch (etap 4), MTabs / MCard (etap 6), MBadge (etap 5).
 */
@Component({
    selector: 'doc-icon-browser',
    imports: [MStack, MText, MIcon, MHeading],
    templateUrl: './icon-browser.html',
    styleUrl: './icon-browser.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconBrowser {
    private readonly host = inject<ElementRef<HTMLElement>>(ElementRef)

    readonly tabs = input.required<readonly IconTab[]>()
    readonly icons = input.required<ReadonlyMap<string, MIconDef>>()
    /** Draw V2 icons with their card shell. */
    readonly shell = input(false)
    /** Export names marked with a "new" badge. */
    readonly newIcons = input<ReadonlySet<string>>(new Set())

    protected readonly query = signal('')
    protected readonly activeTab = signal(0)
    protected readonly copied = signal('')
    private copyTimer: ReturnType<typeof setTimeout> | undefined

    /** Tabs with groups filtered by the query (by export name, like docs-react). */
    protected readonly visible = computed(() => {
        const query = this.query().trim().toLowerCase()
        return this.tabs().map((tab) => ({
            ...tab,
            groups: tab.groups
                .map((group) => ({
                    ...group,
                    items: group.items.filter((name) => !query || name.toLowerCase().includes(query)),
                }))
                .filter((group) => group.items.length > 0),
        }))
    })

    constructor() {
        inject(DestroyRef).onDestroy(() => clearTimeout(this.copyTimer))
    }

    protected onSearch(event: Event): void {
        if (event.target instanceof HTMLInputElement) this.query.set(event.target.value)
    }

    protected onTabKeydown(event: KeyboardEvent): void {
        const count = this.tabs().length
        const current = this.activeTab()
        const next =
            event.key === 'ArrowRight'
                ? (current + 1) % count
                : event.key === 'ArrowLeft'
                  ? (current - 1 + count) % count
                  : event.key === 'Home'
                    ? 0
                    : event.key === 'End'
                      ? count - 1
                      : null
        if (next === null) return
        event.preventDefault()
        this.activeTab.set(next)
        this.host.nativeElement.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus()
    }

    protected async copy(name: string): Promise<void> {
        try {
            await navigator.clipboard.writeText(name)
        } catch {
            return
        }
        this.copied.set(name)
        clearTimeout(this.copyTimer)
        this.copyTimer = setTimeout(() => this.copied.set(''), COPIED_FOR_MS)
    }
}
