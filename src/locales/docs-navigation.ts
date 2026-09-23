import type {MIconDef} from '@banzamel/mineralui-angular/icons'
import {mDashboardIcon, mLayoutIcon, mMagicIcon, mMenuIcon, mTranslateIcon} from '@banzamel/mineralui-angular/icons'
import en from './en.json'

export interface DocsNavItem {
    readonly id: string
    readonly title: string
    readonly description: string
}

export interface DocsNavSection {
    readonly category: string
    readonly icon: string
    readonly collapsible?: boolean
    readonly items: readonly DocsNavItem[]
}

/** Navigation tree (from `locales/en.json`, same shape as docs-react). The docs are English-only. */
export const DOCS_NAVIGATION: readonly DocsNavSection[] = en.docsNavigation

const SECTION_ICONS: Readonly<Record<string, MIconDef>> = {
    getting_started: mDashboardIcon,
    typography: mTranslateIcon,
    layout: mLayoutIcon,
    navigation: mMenuIcon,
    display: mMagicIcon,
}

export function sectionIcon(section: DocsNavSection): MIconDef | undefined {
    return SECTION_ICONS[section.icon]
}

/** Returns the docId of a `/docs/<id>` URL, `null` for the overview or other pages. */
export function docIdFromUrl(url: string): string | null {
    const match = /^\/docs\/([^/?#]+)/.exec(url)
    return match?.[1] ?? null
}
