import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MBreakpoint, MColor} from '@banzamel/mineralui-angular/theme'
import type {MHeadingTone} from '@banzamel/mineralui-angular/typography/heading'
import type {MTextAlign} from '@banzamel/mineralui-angular/typography/text'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import headingFragment from '@generated/examples/typography/heading/heading-fragment'
import headingLevels from '@generated/examples/typography/heading/heading-levels'
import headingSize from '@generated/examples/typography/heading/heading-size'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
const TONES: readonly MHeadingTone[] = ['default', 'muted', 'accent', 'inherit']
const ALIGNS = ['none', 'left', 'center', 'right', 'justify'] as const
const COLORS = ['none', 'primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news'] as const
const TRUNCATES = ['none', 'line', '2', '3'] as const
const HIDDEN = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const

const TITLE = 'Build calm, readable product interfaces'

@Component({
    selector: 'doc-heading-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MHeading],
    templateUrl: './heading.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingPage {
    protected readonly examples = {headingLevels, headingSize, headingFragment}
    protected readonly title = TITLE

    protected readonly tag = signal<(typeof TAGS)[number]>('h2')
    protected readonly tone = signal<MHeadingTone>('default')
    protected readonly colorOption = signal<(typeof COLORS)[number]>('none')
    protected readonly alignOption = signal<(typeof ALIGNS)[number]>('none')
    protected readonly truncateOption = signal<(typeof TRUNCATES)[number]>('none')
    protected readonly hiddenOption = signal<(typeof HIDDEN)[number]>('none')
    protected readonly controls = [
        selectControl('tag', this.tag, TAGS),
        selectControl('tone', this.tone, TONES),
        selectControl('color', this.colorOption, COLORS),
        selectControl('align', this.alignOption, ALIGNS),
        selectControl('truncate', this.truncateOption, TRUNCATES),
        selectControl('hiddenUpTo', this.hiddenOption, HIDDEN),
    ]

    protected readonly color = computed<MColor | undefined>(() => {
        const color = this.colorOption()
        return color === 'none' ? undefined : color
    })
    protected readonly align = computed<MTextAlign | undefined>(() => {
        const align = this.alignOption()
        return align === 'none' ? undefined : align
    })
    protected readonly truncate = computed(() => {
        const truncate = this.truncateOption()
        if (truncate === 'none') return undefined
        return truncate === 'line' ? true : Number(truncate)
    })
    protected readonly hiddenUpTo = computed<MBreakpoint | undefined>(() => {
        const hidden = this.hiddenOption()
        return hidden === 'none' ? undefined : hidden
    })

    protected readonly code = computed(() => {
        const truncate = this.truncateOption()
        const attrs = [
            this.tone() !== 'default' ? `tone="${this.tone()}"` : '',
            this.colorOption() !== 'none' ? `color="${this.colorOption()}"` : '',
            this.alignOption() !== 'none' ? `align="${this.alignOption()}"` : '',
            truncate === 'line' ? 'truncate' : truncate === 'none' ? '' : `truncate="${truncate}"`,
            this.hiddenOption() !== 'none' ? `hiddenUpTo="${this.hiddenOption()}"` : '',
        ].filter(Boolean)
        const tag = this.tag()
        return `<${tag} mHeading${attrs.map((attr) => ` ${attr}`).join('')}>${TITLE}</${tag}>`
    })
}
