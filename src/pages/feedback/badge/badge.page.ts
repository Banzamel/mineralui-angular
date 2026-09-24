import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MTag} from '@banzamel/mineralui-angular/feedback/tag'
import type {MTagVariant} from '@banzamel/mineralui-angular/feedback/tag'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import badgeIcons from '@generated/examples/feedback/badge/badge-icons'
import tagRemovable from '@generated/examples/feedback/badge/tag-removable'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const VARIANTS: readonly MTagVariant[] = ['solid', 'outlined']

@Component({
    selector: 'doc-badge-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MBadge, MTag],
    template: `
        <doc-article
            title="MBadge & MTag"
            description="MBadge handles compact status chips, while MTag adds close actions, icons and outlined variants."
        >
            <doc-section
                title="MBadge playground"
                description="Toggle inputs to preview rounded shapes and pulsing badge states."
            >
                <doc-playground [controls]="badgeControls" [code]="badgeCode()">
                    <m-badge
                        [color]="badgeColor()"
                        [size]="badgeSize()"
                        [rounded]="badgeRounded()"
                        [pulsing]="badgePulsing()"
                    >
                        New
                    </m-badge>
                </doc-playground>
            </doc-section>

            <doc-section title="Badges with icons" description="Project an m-icon with the mStart attribute.">
                <doc-preview [example]="examples.badgeIcons" />
            </doc-section>

            <doc-section
                title="MTag playground"
                description="Toggle inputs to preview outlined, rounded and closable tags."
            >
                <doc-playground [controls]="tagControls" [code]="tagCode()">
                    <m-tag
                        [color]="tagColor()"
                        [variant]="tagVariant()"
                        [size]="tagSize()"
                        [rounded]="tagRounded()"
                        [closable]="tagClosable()"
                    >
                        Angular
                    </m-tag>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Removable tags"
                description="closable adds a labelled remove button; (closed) tells you which tag to drop from your list. The click does not reach the tag's parent."
            >
                <doc-preview [example]="examples.tagRemovable" />
            </doc-section>

            <doc-section title="MBadge API">
                <doc-props-table api="MBadge" />
            </doc-section>

            <doc-section title="MTag API">
                <doc-props-table api="MTag" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgePage {
    protected readonly examples = {badgeIcons, tagRemovable}

    protected readonly badgeColor = signal<MColor>('primary')
    protected readonly badgeSize = signal<MSize>('md')
    protected readonly badgeRounded = signal(false)
    protected readonly badgePulsing = signal(false)
    protected readonly badgeControls = [
        selectControl('color', this.badgeColor, COLORS),
        selectControl('size', this.badgeSize, SIZES),
        booleanControl('rounded', this.badgeRounded),
        booleanControl('pulsing', this.badgePulsing),
    ]

    protected readonly tagColor = signal<MColor>('primary')
    protected readonly tagVariant = signal<MTagVariant>('solid')
    protected readonly tagSize = signal<MSize>('md')
    protected readonly tagRounded = signal(false)
    protected readonly tagClosable = signal(true)
    protected readonly tagControls = [
        selectControl('color', this.tagColor, COLORS),
        selectControl('variant', this.tagVariant, VARIANTS),
        selectControl('size', this.tagSize, SIZES),
        booleanControl('rounded', this.tagRounded),
        booleanControl('closable', this.tagClosable),
    ]

    protected readonly badgeCode = computed(() => {
        const attrs = [
            this.badgeColor() !== 'primary' ? ` color="${this.badgeColor()}"` : '',
            this.badgeSize() !== 'md' ? ` size="${this.badgeSize()}"` : '',
            this.badgeRounded() ? ' rounded' : '',
            this.badgePulsing() ? ' pulsing' : '',
        ].join('')
        return `<m-badge${attrs}>New</m-badge>`
    })

    protected readonly tagCode = computed(() => {
        const attrs = [
            this.tagColor() !== 'primary' ? ` color="${this.tagColor()}"` : '',
            this.tagVariant() !== 'solid' ? ` variant="${this.tagVariant()}"` : '',
            this.tagSize() !== 'md' ? ` size="${this.tagSize()}"` : '',
            this.tagRounded() ? ' rounded' : '',
            this.tagClosable() ? ' closable (closed)="remove()"' : '',
        ].join('')
        return `<m-tag${attrs}>Angular</m-tag>`
    })
}
