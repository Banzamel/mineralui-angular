import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {mDashboardIcon, mDocIcon, mPaletteIcon} from '@banzamel/mineralui-angular/icons'
import {MTab, MTabs} from '@banzamel/mineralui-angular/layout/tabs'
import type {MTabsOrientation, MTabsVariant} from '@banzamel/mineralui-angular/layout/tabs'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import tabsItems from '@generated/examples/navigation/tabs/tabs-items'
import tabsLazy from '@generated/examples/navigation/tabs/tabs-lazy'
import tabsPanels from '@generated/examples/navigation/tabs/tabs-panels'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MTabsVariant[] = ['underline', 'pills']
const ORIENTATIONS: readonly MTabsOrientation[] = ['horizontal', 'vertical']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const EFFECTS = ['ripple', 'none'] as const

@Component({
    selector: 'doc-tabs-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MTab, MTabs, MText],
    template: `
        <doc-article
            title="MTabs"
            description="Keyboard-friendly tab navigation for settings, documentation sections and compact multi-view interfaces."
        >
            <doc-section
                title="Playground"
                description="Switch between underline, pills and vertical layouts while testing size and width. Focus a tab and use the arrow keys, Home and End."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-tabs
                        class="doc-tabs-stage"
                        ariaLabel="Playground"
                        [(value)]="value"
                        [variant]="variant()"
                        [orientation]="orientation()"
                        [size]="size()"
                        [fullWidth]="fullWidth()"
                        [clickEffect]="clickEffect()"
                    >
                        <m-tab value="overview" label="Overview" [icon]="docIcon">
                            <p mText>Project summary, release notes and package highlights.</p>
                        </m-tab>
                        <m-tab value="tokens" label="Tokens" [icon]="paletteIcon">
                            <p mText>Theme tokens, semantic colors and typography decisions.</p>
                        </m-tab>
                        <m-tab value="layout" label="Layout" [icon]="dashboardIcon">
                            <p mText>Grid, container and spacing rules for responsive UI shells.</p>
                        </m-tab>
                    </m-tabs>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Tabs with panels"
                description="Declare m-tab children: each is a trigger and a tabpanel wired with aria-controls / aria-labelledby. Inactive panels are hidden but keep their state; disabled tabs are skipped by the arrow keys."
            >
                <doc-preview [example]="examples.tabsPanels" />
            </doc-section>

            <doc-section
                title="Lazy content and rich labels"
                description="Wrap heavy content in ng-template mTabContent to render it on first open; ng-template mTabLabel replaces the label text with any markup."
            >
                <doc-preview [example]="examples.tabsLazy" />
            </doc-section>

            <doc-section
                title="Header-only tabs"
                description="With [items] the component renders just the triggers — a filter or view switch whose content you render yourself from the value."
            >
                <doc-preview [example]="examples.tabsItems" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MTabs" />
                <doc-props-table api="MTab" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-tabs-stage {
            width: 100%;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPage {
    protected readonly examples = {tabsItems, tabsLazy, tabsPanels}
    protected readonly docIcon = mDocIcon
    protected readonly paletteIcon = mPaletteIcon
    protected readonly dashboardIcon = mDashboardIcon

    protected readonly value = signal('overview')
    protected readonly variant = signal<MTabsVariant>('underline')
    protected readonly orientation = signal<MTabsOrientation>('horizontal')
    protected readonly size = signal<MSize>('md')
    protected readonly fullWidth = signal(false)
    protected readonly clickEffect = signal<(typeof EFFECTS)[number]>('ripple')

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('orientation', this.orientation, ORIENTATIONS),
        selectControl('size', this.size, SIZES),
        selectControl('clickEffect', this.clickEffect, EFFECTS),
        booleanControl('fullWidth', this.fullWidth),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'ariaLabel="Sections"',
            '[(value)]="section"',
            this.variant() !== 'underline' && `variant="${this.variant()}"`,
            this.orientation() !== 'horizontal' && `orientation="${this.orientation()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.fullWidth() && 'fullWidth',
            this.clickEffect() !== 'ripple' && `clickEffect="${this.clickEffect()}"`,
        ].filter((attr) => typeof attr === 'string')

        return [
            `<m-tabs ${attrs.join(' ')}>`,
            '    <m-tab value="overview" label="Overview">Overview panel</m-tab>',
            '    <m-tab value="tokens" label="Tokens">Tokens panel</m-tab>',
            '    <m-tab value="layout" label="Layout">Layout panel</m-tab>',
            '</m-tabs>',
        ].join('\n')
    })
}
