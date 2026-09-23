import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MGrid, MGridItem} from '@banzamel/mineralui-angular/layout/grid'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import type {MBreakpoint} from '@banzamel/mineralui-angular/theme'
import {MHidden} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import hiddenAnyElement from '@generated/examples/layout/responsive-hidden/hidden-any-element'
import hiddenLayout from '@generated/examples/layout/responsive-hidden/hidden-layout'
import hiddenSwap from '@generated/examples/layout/responsive-hidden/hidden-swap'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const TARGETS = ['text', 'action', 'grid', 'swap'] as const
const HIDDEN = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const
type Target = (typeof TARGETS)[number]
type HiddenOption = (typeof HIDDEN)[number]

const toBreakpoint = (option: HiddenOption): MBreakpoint | undefined => (option === 'none' ? undefined : option)

@Component({
    selector: 'doc-responsive-hidden-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MCode,
        MGrid,
        MGridItem,
        MHeading,
        MHidden,
        MInline,
        MStack,
        MSurface,
        MText,
    ],
    templateUrl: './responsive-hidden.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponsiveHiddenPage {
    protected readonly examples = {hiddenLayout, hiddenAnyElement, hiddenSwap}

    protected readonly target = signal<Target>('text')
    protected readonly hiddenOption = signal<HiddenOption>('md')
    protected readonly hiddenAboveOption = signal<HiddenOption>('none')
    protected readonly controls = [
        selectControl('component', this.target, TARGETS),
        selectControl('hiddenUpTo', this.hiddenOption, HIDDEN),
        selectControl('hiddenAbove', this.hiddenAboveOption, HIDDEN),
    ]

    protected readonly hiddenUpTo = computed(() => toBreakpoint(this.hiddenOption()))
    protected readonly hiddenAbove = computed(() => toBreakpoint(this.hiddenAboveOption()))
    /** The swap demo pairs hiddenUpTo and hiddenAbove on one breakpoint. */
    protected readonly swapBreakpoint = computed<MBreakpoint>(() => this.hiddenAbove() ?? 'lg')

    protected readonly code = computed(() => {
        const visibility =
            (this.hiddenUpTo() ? ` hiddenUpTo="${this.hiddenUpTo()}"` : '') +
            (this.hiddenAbove() ? ` hiddenAbove="${this.hiddenAbove()}"` : '')
        switch (this.target()) {
            case 'swap':
                return [
                    '<m-grid>',
                    `    <m-grid-item [sm]="12" hiddenUpTo="${this.swapBreakpoint()}">Desktop layout</m-grid-item>`,
                    `    <m-grid-item [sm]="12" hiddenAbove="${this.swapBreakpoint()}">Compact layout</m-grid-item>`,
                    '</m-grid>',
                ].join('\n')
            case 'action':
                return [
                    '<m-inline justify="between" fullWidth>',
                    '    <strong mText>MineralUI</strong>',
                    `    <button type="button" mHidden${visibility}>Desktop CTA</button>`,
                    '</m-inline>',
                ].join('\n')
            case 'grid':
                return [
                    '<m-grid>',
                    '    <m-grid-item [sm]="12" [lg]="6">Primary content</m-grid-item>',
                    `    <m-grid-item [sm]="12" [lg]="6"${visibility}>Secondary panel</m-grid-item>`,
                    '</m-grid>',
                ].join('\n')
            case 'text':
                return [
                    '<m-stack>',
                    '    <h2 mHeading>Dashboard overview</h2>',
                    `    <p mText tone="muted"${visibility}>Extra supporting copy shown only on larger layouts.</p>`,
                    '</m-stack>',
                ].join('\n')
        }
    })
}
