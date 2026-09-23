import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {mHomeIcon, mSearchIcon, mSettingsIcon, mUserIcon} from '@banzamel/mineralui-angular/icons'
import type {MNavsItem, MNavsOrientation} from '@banzamel/mineralui-angular/layout/navs'
import {MNavs} from '@banzamel/mineralui-angular/layout/navs'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import navsRouter from '@generated/examples/navigation/navs/navs-router'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const ORIENTATIONS: readonly MNavsOrientation[] = ['horizontal', 'vertical']

@Component({
    selector: 'doc-navs-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MCode, MNavs, MText],
    templateUrl: './navs.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavsPage {
    protected readonly examples = {navsRouter}

    protected readonly orientation = signal<MNavsOrientation>('horizontal')
    protected readonly wrap = signal(true)
    protected readonly showDisabled = signal(true)
    protected readonly withIcons = signal(false)
    protected readonly iconOnly = signal(false)
    protected readonly controls = [
        selectControl('orientation', this.orientation, ORIENTATIONS),
        booleanControl('wrap', this.wrap),
        booleanControl('showDisabled', this.showDisabled),
        booleanControl('withIcons', this.withIcons),
        booleanControl('iconOnly', this.iconOnly),
    ]

    protected readonly items = computed<readonly MNavsItem[]>(() => {
        const icons = this.withIcons()
        const iconProps = (icon: MNavsItem['icon']) => (icons ? {icon, iconOnly: this.iconOnly(), iconSize: 28} : {})
        return [
            {href: '#overview', label: 'Overview', ...iconProps(mHomeIcon)},
            {href: '#components', label: 'Components', current: true, ...iconProps(mSearchIcon)},
            {href: '#tokens', label: 'Tokens', ...iconProps(mSettingsIcon)},
            {href: '#profile', label: 'Profile', ...iconProps(mUserIcon)},
            ...(this.showDisabled() ? [{href: '#archived', label: 'Archived', disabled: true}] : []),
        ]
    })

    protected readonly code = computed(() => {
        const icon = (name: string) =>
            this.withIcons() ? `, icon: ${name}${this.iconOnly() ? ', iconOnly: true' : ''}, iconSize: 28` : ''
        const attrs = [
            '[items]="items"',
            this.orientation() !== 'horizontal' ? `orientation="${this.orientation()}"` : '',
            this.wrap() ? 'wrap' : '',
        ].filter(Boolean)
        return [
            '<!-- items: MNavsItem[] = [',
            `    {href: '#overview', label: 'Overview'${icon('mHomeIcon')}},`,
            `    {href: '#components', label: 'Components', current: true${icon('mSearchIcon')}},`,
            `    {href: '#tokens', label: 'Tokens'${icon('mSettingsIcon')}},`,
            this.showDisabled() ? "    {href: '#archived', label: 'Archived', disabled: true}," : '',
            '] -->',
            `<m-navs ${attrs.join(' ')} />`,
        ]
            .filter(Boolean)
            .join('\n')
    })
}
