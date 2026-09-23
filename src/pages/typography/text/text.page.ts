import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MBreakpoint, MColor} from '@banzamel/mineralui-angular/theme'
import type {MTextAlign, MTextSize, MTextTone, MTextWeight} from '@banzamel/mineralui-angular/typography/text'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import textTags from '@generated/examples/typography/text/text-tags'
import textTruncate from '@generated/examples/typography/text/text-truncate'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const TAGS = ['p', 'span', 'div', 'strong', 'em'] as const
const TONES: readonly MTextTone[] = ['default', 'muted', 'accent']
const SIZES: readonly MTextSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const ALIGNS: readonly MTextAlign[] = ['left', 'center', 'right', 'justify']
const WEIGHTS: readonly MTextWeight[] = ['normal', 'medium', 'semibold', 'bold']
const COLORS = ['none', 'primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news'] as const
const TRUNCATES = ['none', 'line', '2', '3'] as const
const HIDDEN = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const

const COPY =
    'Use MText for product copy, helper content, settings descriptions and richer inline layout content without ' +
    'falling back to custom CSS for every paragraph.'

@Component({
    selector: 'doc-text-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MText],
    templateUrl: './text.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextPage {
    protected readonly examples = {textTags, textTruncate}
    protected readonly copy = COPY

    protected readonly tag = signal<(typeof TAGS)[number]>('p')
    protected readonly tone = signal<MTextTone>('default')
    protected readonly size = signal<MTextSize>('md')
    protected readonly align = signal<MTextAlign>('left')
    protected readonly weight = signal<MTextWeight>('normal')
    protected readonly colorOption = signal<(typeof COLORS)[number]>('none')
    protected readonly truncateOption = signal<(typeof TRUNCATES)[number]>('none')
    protected readonly hiddenOption = signal<(typeof HIDDEN)[number]>('none')
    protected readonly controls = [
        selectControl('tag', this.tag, TAGS),
        selectControl('tone', this.tone, TONES),
        selectControl('size', this.size, SIZES),
        selectControl('align', this.align, ALIGNS),
        selectControl('weight', this.weight, WEIGHTS),
        selectControl('color', this.colorOption, COLORS),
        selectControl('truncate', this.truncateOption, TRUNCATES),
        selectControl('hiddenUpTo', this.hiddenOption, HIDDEN),
    ]

    protected readonly color = computed<MColor | undefined>(() => {
        const color = this.colorOption()
        return color === 'none' ? undefined : color
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
        const attrs = [
            this.tone() !== 'default' ? `tone="${this.tone()}"` : '',
            this.size() !== 'md' ? `size="${this.size()}"` : '',
            this.align() !== 'left' ? `align="${this.align()}"` : '',
            this.weight() !== 'normal' ? `weight="${this.weight()}"` : '',
            this.colorOption() !== 'none' ? `color="${this.colorOption()}"` : '',
            this.truncateOption() === 'line' ? 'truncate' : '',
            this.truncateOption() === '2' || this.truncateOption() === '3' ? `truncate="${this.truncateOption()}"` : '',
            this.hiddenOption() !== 'none' ? `hiddenUpTo="${this.hiddenOption()}"` : '',
        ].filter(Boolean)
        const tag = this.tag()
        return `<${tag} mText${attrs.map((attr) => ` ${attr}`).join('')}>\n    ${COPY}\n</${tag}>`
    })
}
