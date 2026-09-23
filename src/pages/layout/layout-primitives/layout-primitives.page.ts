import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MContainerSize} from '@banzamel/mineralui-angular/layout/container'
import {MContainer} from '@banzamel/mineralui-angular/layout/container'
import type {MInlineJustify, MInlineWrap} from '@banzamel/mineralui-angular/layout/inline'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import type {MStackAlign} from '@banzamel/mineralui-angular/layout/stack'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import type {MSurfaceTone} from '@banzamel/mineralui-angular/layout/surface'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import type {MBreakpoint} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import stackBasics from '@generated/examples/layout/layout-primitives/stack-basics'
import surfaceLink from '@generated/examples/layout/layout-primitives/surface-link'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SIZES: readonly MContainerSize[] = ['content', 'wide', 'full']
const TONES: readonly MSurfaceTone[] = ['default', 'subtle', 'raised', 'inverse']
const ALIGNS: readonly MStackAlign[] = ['stretch', 'start', 'center', 'end']
const JUSTIFIES: readonly MInlineJustify[] = ['start', 'center', 'end', 'between']
const WRAPS: readonly MInlineWrap[] = ['wrap', 'nowrap']
const HIDDEN = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const

type Hidden = (typeof HIDDEN)[number]
const breakpoint = (value: Hidden): MBreakpoint | undefined => (value === 'none' ? undefined : value)
const attr = (condition: boolean, text: string) => (condition ? ` ${text}` : '')

/**
 * Counterpart of docs-react `LayoutPrimitivesDoc`. The shell playground (MHeader / MSection / MFooter) joins with
 * MHeader and MFooter (etap 2, step 5).
 */
@Component({
    selector: 'doc-layout-primitives-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MContainer,
        MInline,
        MStack,
        MSurface,
        MText,
    ],
    templateUrl: './layout-primitives.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPrimitivesPage {
    protected readonly examples = {stackBasics, surfaceLink}
    protected readonly tiles = ['Sidebar', 'Main content', 'Actions'] as const

    protected readonly containerSize = signal<MContainerSize>('content')
    protected readonly surfaceTone = signal<MSurfaceTone>('default')
    protected readonly stackAlign = signal<MStackAlign>('stretch')
    protected readonly inlineJustify = signal<MInlineJustify>('start')
    protected readonly inlineWrap = signal<MInlineWrap>('wrap')
    protected readonly padded = signal(true)
    protected readonly outlined = signal(true)
    protected readonly containerHidden = signal<Hidden>('none')
    protected readonly surfaceHidden = signal<Hidden>('none')
    protected readonly stackHidden = signal<Hidden>('none')
    protected readonly inlineHidden = signal<Hidden>('none')
    protected readonly controls = [
        selectControl('containerSize', this.containerSize, SIZES),
        selectControl('surfaceTone', this.surfaceTone, TONES),
        selectControl('stackAlign', this.stackAlign, ALIGNS),
        selectControl('inlineJustify', this.inlineJustify, JUSTIFIES),
        selectControl('inlineWrap', this.inlineWrap, WRAPS),
        booleanControl('padded', this.padded),
        booleanControl('outlined', this.outlined),
        selectControl('containerHidden', this.containerHidden, HIDDEN),
        selectControl('surfaceHidden', this.surfaceHidden, HIDDEN),
        selectControl('stackHidden', this.stackHidden, HIDDEN),
        selectControl('inlineHidden', this.inlineHidden, HIDDEN),
    ]

    protected readonly hidden = {
        container: computed(() => breakpoint(this.containerHidden())),
        surface: computed(() => breakpoint(this.surfaceHidden())),
        stack: computed(() => breakpoint(this.stackHidden())),
        inline: computed(() => breakpoint(this.inlineHidden())),
    }

    protected readonly code = computed(() => {
        const container =
            attr(this.containerSize() !== 'content', `size="${this.containerSize()}"`) +
            attr(!this.padded(), '[padded]="false"') +
            attr(this.containerHidden() !== 'none', `hiddenUpTo="${this.containerHidden()}"`)
        const surface =
            attr(this.surfaceTone() !== 'default', `tone="${this.surfaceTone()}"`) +
            attr(!this.outlined(), '[outlined]="false"') +
            attr(!this.padded(), '[padded]="false"') +
            attr(this.surfaceHidden() !== 'none', `hiddenUpTo="${this.surfaceHidden()}"`)
        const stack =
            attr(this.stackAlign() !== 'stretch', `align="${this.stackAlign()}"`) +
            attr(this.stackHidden() !== 'none', `hiddenUpTo="${this.stackHidden()}"`)
        const inline =
            attr(this.inlineJustify() !== 'start', `justify="${this.inlineJustify()}"`) +
            attr(this.inlineWrap() !== 'wrap', `wrap="${this.inlineWrap()}"`) +
            attr(this.inlineHidden() !== 'none', `hiddenUpTo="${this.inlineHidden()}"`)
        return [
            `<m-container${container}>`,
            `    <div mSurface${surface}>`,
            `        <m-stack${stack}>`,
            '            <div>',
            '                <p mText weight="semibold">Project overview</p>',
            '                <p mText tone="muted" size="sm">',
            '                    Compose wrappers, surfaces and flow primitives before reaching for custom CSS.',
            '                </p>',
            '            </div>',
            `            <m-inline${inline}>`,
            ...this.tiles.map((tile) => `                <div mSurface tone="subtle">${tile}</div>`),
            '            </m-inline>',
            '        </m-stack>',
            '    </div>',
            '</m-container>',
        ].join('\n')
    })
}
