import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MBreakpoint} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import type {MLinkTone, MLinkUnderline} from '@banzamel/mineralui-angular/typography/link'
import {MLink} from '@banzamel/mineralui-angular/typography/link'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import linkButton from '@generated/examples/typography/link/link-button'
import linkRouter from '@generated/examples/typography/link/link-router'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const TONES: readonly MLinkTone[] = ['default', 'muted', 'accent', 'inherit']
const UNDERLINES: readonly MLinkUnderline[] = ['hover', 'always', 'none']
const HIDDEN = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const

@Component({
    selector: 'doc-link-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MCode, MLink, MText],
    templateUrl: './link.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkPage {
    protected readonly examples = {linkRouter, linkButton}

    protected readonly tone = signal<MLinkTone>('default')
    protected readonly underline = signal<MLinkUnderline>('hover')
    protected readonly current = signal(false)
    protected readonly block = signal(false)
    protected readonly disabled = signal(false)
    protected readonly hiddenOption = signal<(typeof HIDDEN)[number]>('none')
    protected readonly controls = [
        selectControl('tone', this.tone, TONES),
        selectControl('underline', this.underline, UNDERLINES),
        booleanControl('current', this.current),
        booleanControl('block', this.block),
        booleanControl('disabled', this.disabled),
        selectControl('hiddenUpTo', this.hiddenOption, HIDDEN),
    ]

    protected readonly hiddenUpTo = computed<MBreakpoint | undefined>(() => {
        const hidden = this.hiddenOption()
        return hidden === 'none' ? undefined : hidden
    })

    protected readonly code = computed(() => {
        const attrs = [
            'href="#playground"',
            this.tone() !== 'default' ? `tone="${this.tone()}"` : '',
            this.underline() !== 'hover' ? `underline="${this.underline()}"` : '',
            this.current() ? 'current' : '',
            this.block() ? 'block' : '',
            this.disabled() ? 'disabled' : '',
            this.hiddenOption() !== 'none' ? `hiddenUpTo="${this.hiddenOption()}"` : '',
        ].filter(Boolean)
        return `<a mLink ${attrs.join(' ')}>Explore the component library</a>`
    })
}
