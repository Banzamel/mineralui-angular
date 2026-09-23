import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import type {MBreakpoint, MColor} from '@banzamel/mineralui-angular/theme'
import type {MSubTextSize, MSubTextTone} from '@banzamel/mineralui-angular/typography/sub-text'
import {MSubText} from '@banzamel/mineralui-angular/typography/sub-text'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const TAGS = ['span', 'p', 'div', 'small'] as const
const SIZES: readonly MSubTextSize[] = ['xs', 'sm', 'md']
const TONES: readonly MSubTextTone[] = ['default', 'muted', 'accent']
const COLORS = ['none', 'primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news'] as const
const HIDDEN = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const

// TEMP: "3 hours ago" replaces with MTimeAgo (etap 6), as in docs-react.
const CAPTION = 'Updated 3 hours ago'

@Component({
    selector: 'doc-sub-text-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPropsTable, MStack, MSubText, MText],
    templateUrl: './sub-text.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubTextPage {
    protected readonly caption = CAPTION

    protected readonly tag = signal<(typeof TAGS)[number]>('span')
    protected readonly size = signal<MSubTextSize>('sm')
    protected readonly tone = signal<MSubTextTone>('muted')
    protected readonly colorOption = signal<(typeof COLORS)[number]>('none')
    protected readonly hiddenOption = signal<(typeof HIDDEN)[number]>('none')
    protected readonly controls = [
        selectControl('tag', this.tag, TAGS),
        selectControl('size', this.size, SIZES),
        selectControl('tone', this.tone, TONES),
        selectControl('color', this.colorOption, COLORS),
        selectControl('hiddenUpTo', this.hiddenOption, HIDDEN),
    ]

    protected readonly color = computed<MColor | undefined>(() => {
        const color = this.colorOption()
        return color === 'none' ? undefined : color
    })
    protected readonly hiddenUpTo = computed<MBreakpoint | undefined>(() => {
        const hidden = this.hiddenOption()
        return hidden === 'none' ? undefined : hidden
    })

    protected readonly code = computed(() => {
        const attrs = [
            this.size() !== 'sm' ? `size="${this.size()}"` : '',
            this.tone() !== 'muted' ? `tone="${this.tone()}"` : '',
            this.colorOption() !== 'none' ? `color="${this.colorOption()}"` : '',
            this.hiddenOption() !== 'none' ? `hiddenUpTo="${this.hiddenOption()}"` : '',
        ].filter(Boolean)
        const tag = this.tag()
        return [
            '<p mText>Main heading text</p>',
            `<${tag} mSubText${attrs.map((attr) => ` ${attr}`).join('')}>${CAPTION}</${tag}>`,
        ].join('\n')
    })
}
