import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, signal} from '@angular/core'
import {MAlert} from '@banzamel/mineralui-angular/feedback/alert'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MToastService} from '@banzamel/mineralui-angular/feedback/toast'
import type {MIconDef} from '@banzamel/mineralui-angular/icons'
import {MIcon} from '@banzamel/mineralui-angular/icons'
import {MInputSearch} from '@banzamel/mineralui-angular/inputs/input-search'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MTab, MTabContent, MTabs} from '@banzamel/mineralui-angular/layout/tabs'
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
 * TEMP: cards replace with MCard (etap 6).
 */
@Component({
    selector: 'doc-icon-browser',
    imports: [MAlert, MBadge, MStack, MTab, MTabContent, MTabs, MText, MIcon, MHeading, MInputSearch],
    templateUrl: './icon-browser.html',
    styleUrl: './icon-browser.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconBrowser {
    readonly tabs = input.required<readonly IconTab[]>()
    readonly icons = input.required<ReadonlyMap<string, MIconDef>>()
    /** Draw V2 icons with their card shell. */
    readonly shell = input(false)
    /** Export names marked with a "new" badge. */
    readonly newIcons = input<ReadonlySet<string>>(new Set())

    protected readonly query = signal('')
    protected readonly activeTab = signal<string | undefined>(undefined)
    protected readonly copied = signal('')
    private readonly toast = inject(MToastService)
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

    protected async copy(name: string): Promise<void> {
        try {
            await navigator.clipboard.writeText(name)
        } catch {
            return
        }
        this.copied.set(name)
        this.toast.show({title: 'Copied to clipboard', message: name, color: 'success', duration: 1600})
        clearTimeout(this.copyTimer)
        this.copyTimer = setTimeout(() => this.copied.set(''), COPIED_FOR_MS)
    }
}
