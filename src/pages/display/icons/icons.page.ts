import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MIconColor} from '@banzamel/mineralui-angular/icons'
import * as icons from '@banzamel/mineralui-angular/icons'
import {MIcon} from '@banzamel/mineralui-angular/icons'
import iconAccessible from '@generated/examples/display/icons/icon-accessible'
import iconBasics from '@generated/examples/display/icons/icon-basics'
import iconColors from '@generated/examples/display/icons/icon-colors'
import iconCustom from '@generated/examples/display/icons/icon-custom'
import iconSizes from '@generated/examples/display/icons/icon-sizes'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import {IconBrowser, iconMap} from '@kit/icon-browser/icon-browser'
import {ICON_TABS, NEW_ICONS, PLAYGROUND_ICONS} from './icons.catalog'

type PlaygroundIcon = (typeof PLAYGROUND_ICONS)[number]

const COLORS: readonly MIconColor[] = [
    'inherit',
    'primary',
    'neutral',
    'success',
    'error',
    'warning',
    'info',
    'light',
    'dark',
    'news',
]

@Component({
    selector: 'doc-icons-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, IconBrowser, MIcon],
    templateUrl: './icons.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsPage {
    protected readonly icons = iconMap(icons)
    protected readonly tabs = ICON_TABS
    protected readonly newIcons = NEW_ICONS
    protected readonly count = ICON_TABS.reduce(
        (sum, tab) => sum + tab.groups.reduce((groupSum, group) => groupSum + group.items.length, 0),
        0
    )
    protected readonly examples = {iconBasics, iconSizes, iconColors, iconAccessible, iconCustom}

    protected readonly iconName = signal<PlaygroundIcon>('mSearchIcon')
    protected readonly color = signal<MIconColor>('primary')
    protected readonly size = signal(48)
    protected readonly strokeWidth = signal(1.8)
    protected readonly controls = [
        selectControl('icon', this.iconName, PLAYGROUND_ICONS),
        selectControl('color', this.color, COLORS),
        sliderControl('size', this.size, {min: 20, max: 72, step: 2}),
        sliderControl('strokeWidth', this.strokeWidth, {min: 1, max: 3, step: 0.1}),
    ]
    protected readonly selectedIcon = computed(() => this.icons.get(this.iconName()))
    protected readonly code = computed(
        () =>
            `<m-icon [icon]="${this.iconName()}" color="${this.color()}" [size]="${this.size()}" ` +
            `[strokeWidth]="${this.strokeWidth()}" />`
    )
}
