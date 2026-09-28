import type {MIconDef} from '@banzamel/mineralui-angular/icons'
import {
    mBellIcon,
    mCalendarIcon,
    mClickIcon,
    mDashboardIcon,
    mDatabaseIcon,
    mFormIcon,
    mLayoutIcon,
    mMagicIcon,
    mMenuIcon,
    mSlidersIcon,
    mTranslateIcon,
    mWindowIcon,
} from '@banzamel/mineralui-angular/icons'
import {getMineralComponentPlan} from '@banzamel/mineralui-angular/utils'
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
    controls: mClickIcon,
    forms: mFormIcon,
    specialized_inputs: mSlidersIcon,
    feedback: mBellIcon,
    navigation: mMenuIcon,
    overlays: mWindowIcon,
    display: mMagicIcon,
    cards: mDashboardIcon,
    data: mDatabaseIcon,
    calendar: mCalendarIcon,
}

export function sectionIcon(section: DocsNavSection): MIconDef | undefined {
    return SECTION_ICONS[section.icon]
}

/**
 * Pro components each page documents (docs-react `docsRouteComponents`, without the dead `stepper` / `timeline`
 * entries). Drives the sidebar badge; pages pass the same names to `<doc-pro-notice>`.
 */
export const DOCS_PRO_COMPONENTS: Readonly<Record<string, readonly string[]>> = {
    'card-business': ['MCardBusiness', 'MQrCode'],
    'card-finance': ['MCardFinance'],
    'showcase-carousel-cards': ['MShowcaseCarousel'],
    'masonry-cards': ['MMasonry'],
    'calendar-board': ['MCalendarBoard'],
    'calendar-event': ['MCalendarEventList', 'MCalendarTimeline'],
    'timeline-board': ['MTimelineBoard'],
    scheduler: ['MScheduler'],
    'dashboard-grid': ['MDashboardGrid'],
    'file-manager': ['MFileManager'],
    'showcase-carousel': ['MShowcaseCarousel'],
    masonry: ['MMasonry'],
    'qr-code': ['MQrCode'],
    chat: ['MChat'],
    'avatar-stack': ['MAvatarStack'],
    'icons-v2': ['MIconV2'],
    topbar: ['MTopbar'],
    'line-chart': ['MLineChart'],
    'bar-chart': ['MBarChart'],
    'area-chart': ['MAreaChart'],
    'pie-chart': ['MPieChart'],
    sparkline: ['MSparkline'],
}

/** Whether the page documents a Pro component — the library's licensing metadata decides (docs-react `getDocsRouteAccess`). */
export function isProDoc(docId: string): boolean {
    return (DOCS_PRO_COMPONENTS[docId] ?? []).some((component) => getMineralComponentPlan(component) === 'pro')
}

/** Returns the docId of a `/docs/<id>` URL, `null` for the overview or other pages. */
export function docIdFromUrl(url: string): string | null {
    const match = /^\/docs\/([^/?#]+)/.exec(url)
    return match?.[1] ?? null
}
