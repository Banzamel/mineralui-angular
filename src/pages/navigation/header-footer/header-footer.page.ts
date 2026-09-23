import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import type {MContainerSize} from '@banzamel/mineralui-angular/layout/container'
import {MFooter} from '@banzamel/mineralui-angular/layout/footer'
import {MGrid, MGridItem} from '@banzamel/mineralui-angular/layout/grid'
import type {MHeaderTone} from '@banzamel/mineralui-angular/layout/header'
import {MHeader} from '@banzamel/mineralui-angular/layout/header'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MSection} from '@banzamel/mineralui-angular/layout/section'
import type {MBreakpoint} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import headerFooterShell from '@generated/examples/navigation/header-footer/header-footer-shell'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const CONTAINERS: readonly MContainerSize[] = ['content', 'wide', 'full']
const TONES: readonly MHeaderTone[] = ['surface', 'default', 'subtle']
const HIDDEN = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const
type HiddenOption = (typeof HIDDEN)[number]

const toBreakpoint = (option: HiddenOption): MBreakpoint | undefined => (option === 'none' ? undefined : option)

@Component({
    selector: 'doc-header-footer-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        MButton,
        DocPreview,
        DocPropsTable,
        MFooter,
        MGrid,
        MGridItem,
        MHeader,
        MInline,
        MSection,
        MText,
    ],
    templateUrl: './header-footer.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderFooterPage {
    protected readonly examples = {headerFooterShell}

    protected readonly container = signal<MContainerSize>('content')
    protected readonly tone = signal<MHeaderTone>('surface')
    protected readonly bordered = signal(true)
    protected readonly padded = signal(true)
    protected readonly stickyHeader = signal(false)
    protected readonly headerHidden = signal<HiddenOption>('none')
    protected readonly footerHidden = signal<HiddenOption>('none')
    protected readonly controls = [
        selectControl('container', this.container, CONTAINERS),
        selectControl('tone', this.tone, TONES),
        booleanControl('bordered', this.bordered),
        booleanControl('padded', this.padded),
        booleanControl('stickyHeader', this.stickyHeader),
        selectControl('headerHidden', this.headerHidden, HIDDEN),
        selectControl('footerHidden', this.footerHidden, HIDDEN),
    ]

    protected readonly headerHiddenUpTo = computed(() => toBreakpoint(this.headerHidden()))
    protected readonly footerHiddenUpTo = computed(() => toBreakpoint(this.footerHidden()))

    protected readonly code = computed(() => {
        const shared = [
            this.container() !== 'wide' ? `container="${this.container()}"` : '',
            this.tone() !== 'surface' ? `tone="${this.tone()}"` : '',
            this.bordered() ? '' : '[bordered]="false"',
            this.padded() ? '' : '[padded]="false"',
        ]
        const header = [...shared, this.stickyHeader() ? 'sticky' : '']
        const footer = [...shared]
        if (this.headerHidden() !== 'none') header.push(`hiddenUpTo="${this.headerHidden()}"`)
        if (this.footerHidden() !== 'none') footer.push(`hiddenUpTo="${this.footerHidden()}"`)
        const attrs = (parts: readonly string[]) =>
            parts
                .filter(Boolean)
                .map((part) => ` ${part}`)
                .join('')
        return [
            `<header mHeader${attrs(header)}>`,
            '    <strong mText weight="bold">MineralUI</strong>',
            '</header>',
            '',
            `<footer mFooter${attrs(footer)}>`,
            '    <p mText size="sm" tone="muted">Built with MineralUI</p>',
            '</footer>',
        ].join('\n')
    })
}
