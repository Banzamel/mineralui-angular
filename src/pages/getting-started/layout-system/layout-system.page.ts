import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {WritableSignal} from '@angular/core'
import type {MGridAlign, MGridColumns} from '@banzamel/mineralui-angular/layout/grid'
import {MGrid, MGridItem, mGridColumnValues} from '@banzamel/mineralui-angular/layout/grid'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import type {MBreakpoint} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import appShell from '@generated/examples/getting-started/layout-system/app-shell'
import gridAlign from '@generated/examples/getting-started/layout-system/grid-align'
import gridEqual from '@generated/examples/getting-started/layout-system/grid-equal'
import gridMixed from '@generated/examples/getting-started/layout-system/grid-mixed'
import gridPlainChildren from '@generated/examples/getting-started/layout-system/grid-plain-children'
import gridResponsive from '@generated/examples/getting-started/layout-system/grid-responsive'
import {CodeBlock} from '@kit/code-block/code-block'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SPANS = ['auto', ...mGridColumnValues.map(String)] as const
const ALIGNS = ['auto', 'stretch', 'start', 'center', 'end', 'baseline'] as const
const HIDDEN = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const
const BREAKPOINTS = ['xxl', 'xl', 'lg', 'md', 'sm'] as const

type SpanOption = (typeof SPANS)[number]
type Breakpoint = (typeof BREAKPOINTS)[number]

const toSpan = (option: SpanOption): MGridColumns | undefined =>
    mGridColumnValues.find((columns) => String(columns) === option)

@Component({
    selector: 'doc-layout-system-page',
    imports: [
        CodeBlock,
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MCode,
        MGrid,
        MGridItem,
        MStack,
        MSurface,
        MText,
    ],
    templateUrl: './layout-system.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSystemPage {
    protected readonly examples = {gridResponsive, gridEqual, gridMixed, gridAlign, gridPlainChildren, appShell}
    protected readonly structure = [
        'm-app-shell           /* flex row, min-height: 100vh */',
        '├── m-sidebar         /* optional; or any element with mAppShellSidebar */',
        '└── .m-app-shell-main /* wraps every other child */',
        '    ├── header[mHeader]',
        '    ├── m-body         /* flex: 1, padded */',
        '    └── footer[mFooter]',
    ].join('\n')

    protected readonly options: Record<Breakpoint, WritableSignal<SpanOption>> = {
        xxl: signal<SpanOption>('auto'),
        xl: signal<SpanOption>('5'),
        lg: signal<SpanOption>('6'),
        md: signal<SpanOption>('12'),
        sm: signal<SpanOption>('12'),
    }
    protected readonly alignOption = signal<(typeof ALIGNS)[number]>('auto')
    protected readonly hiddenOption = signal<(typeof HIDDEN)[number]>('none')
    protected readonly controls = [
        ...BREAKPOINTS.map((breakpoint) => selectControl(breakpoint, this.options[breakpoint], SPANS)),
        selectControl('align', this.alignOption, ALIGNS),
        selectControl('hiddenUpTo', this.hiddenOption, HIDDEN),
    ]

    protected readonly spans = computed(() => ({
        xxl: toSpan(this.options.xxl()),
        xl: toSpan(this.options.xl()),
        lg: toSpan(this.options.lg()),
        md: toSpan(this.options.md()),
        sm: toSpan(this.options.sm()),
    }))
    protected readonly align = computed<MGridAlign | undefined>(() => {
        const align = this.alignOption()
        return align === 'auto' ? undefined : align
    })
    protected readonly hiddenUpTo = computed<MBreakpoint | undefined>(() => {
        const hidden = this.hiddenOption()
        return hidden === 'none' ? undefined : hidden
    })
    protected readonly summary = computed(() =>
        BREAKPOINTS.map((breakpoint) => `${breakpoint} ${this.options[breakpoint]()}`).join(' / ')
    )

    protected readonly code = computed(() => {
        const attrs = BREAKPOINTS.flatMap((breakpoint) => {
            const span = this.options[breakpoint]()
            return span === 'auto' ? [] : [`[${breakpoint}]="${span}"`]
        })
        if (this.hiddenOption() !== 'none') attrs.push(`hiddenUpTo="${this.hiddenOption()}"`)
        const itemAttrs = attrs.length ? ` ${attrs.join(' ')}` : ''
        const rowAlign = this.alignOption() === 'auto' ? '' : ` align="${this.alignOption()}"`
        return [
            `<m-grid${rowAlign}>`,
            `    <m-grid-item${itemAttrs}>Primary column</m-grid-item>`,
            '    <m-grid-item>Auto column fills remaining space</m-grid-item>',
            '</m-grid>',
        ].join('\n')
    })

    protected readonly tokens = [
        ':root {',
        '    --mineral-content-max-width: 1120px;',
        '    --mineral-navbar-height: 72px;',
        '    --mineral-sidebar-width: 240px;',
        '    --mineral-sidebar-collapsed-width: 64px;',
        '    --mineral-spacing-base: 8px;',
        '    --mineral-radius-base: 8px;',
        '}',
    ].join('\n')
}
