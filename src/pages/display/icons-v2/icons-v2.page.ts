import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MIconColor} from '@banzamel/mineralui-angular/icons'
import * as icons from '@banzamel/mineralui-angular/icons'
import {MIcon} from '@banzamel/mineralui-angular/icons'
import iconV2Shell from '@generated/examples/display/icons-v2/icon-v2-shell'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import {IconBrowser, iconMap} from '@kit/icon-browser/icon-browser'
import {ICON_TABS, PLAYGROUND_ICONS} from './icons-v2.catalog'
import {MCode} from '@banzamel/mineralui-angular/typography/code'

type PlaygroundIcon = (typeof PLAYGROUND_ICONS)[number]

const COLORS: readonly MIconColor[] = [
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
    selector: 'doc-icons-v2-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, IconBrowser, MIcon, MCode],
    templateUrl: './icons-v2.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsV2Page {
    protected readonly icons = iconMap(icons)
    protected readonly tabs = ICON_TABS
    protected readonly count = ICON_TABS.reduce(
        (sum, tab) => sum + tab.groups.reduce((groupSum, group) => groupSum + group.items.length, 0),
        0
    )
    protected readonly iconV2Shell = iconV2Shell

    protected readonly iconName = signal<PlaygroundIcon>('mHomeIconV2')
    protected readonly color = signal<MIconColor>('primary')
    protected readonly size = signal(48)
    protected readonly shell = signal(false)
    protected readonly controls = [
        selectControl('icon', this.iconName, PLAYGROUND_ICONS),
        selectControl('color', this.color, COLORS),
        sliderControl('size', this.size, {min: 24, max: 72, step: 2}),
        booleanControl('shell', this.shell),
    ]
    protected readonly selectedIcon = computed(() => this.icons.get(this.iconName()))
    protected readonly code = computed(
        () =>
            `<m-icon [icon]="${this.iconName()}" color="${this.color()}" [size]="${this.size()}"` +
            `${this.shell() ? ' shell' : ''} />`
    )
}
