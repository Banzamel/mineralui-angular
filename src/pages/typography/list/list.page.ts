import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS = ['none', 'primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news'] as const
const ITEMS = [
    'Use headings for hierarchy.',
    'Use text for long-form copy.',
    'Use code for commands, tokens and inline snippets.',
] as const

@Component({
    selector: 'doc-list-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPropsTable, MCode, MList, MListItem, MText],
    template: `
        <doc-article
            title="MList"
            description="Ordered and unordered lists built from the shared typography system. Put mList on ul or ol — the tag decides whether the list is numbered."
        >
            <doc-section title="Playground" description="Switch between ul and ol and try a semantic color.">
                <doc-playground [controls]="controls" [code]="code()">
                    @if (ordered()) {
                        <ol mList [color]="color()">
                            @for (item of items; track item) {
                                <li mListItem>{{ item }}</li>
                            }
                        </ol>
                    } @else {
                        <ul mList [color]="color()">
                            @for (item of items; track item) {
                                <li mListItem>{{ item }}</li>
                            }
                        </ul>
                    }
                </doc-playground>
            </doc-section>

            <doc-section title="MListItem notes">
                <p mText tone="muted">
                    <code mCode>li[mListItem]</code> adds the item line height under the parent list. The native
                    <code mCode>ul</code> / <code mCode>ol</code> and <code mCode>li</code> keep their list semantics —
                    screen readers announce the list and its length.
                </p>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MList" />
                <doc-props-table api="MListItem" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPage {
    protected readonly items = ITEMS

    protected readonly ordered = signal(false)
    protected readonly colorOption = signal<(typeof COLORS)[number]>('none')
    protected readonly controls = [
        booleanControl('ordered', this.ordered),
        selectControl('color', this.colorOption, COLORS),
    ]

    protected readonly color = computed<MColor | undefined>(() => {
        const color = this.colorOption()
        return color === 'none' ? undefined : color
    })

    protected readonly code = computed(() => {
        const tag = this.ordered() ? 'ol' : 'ul'
        const color = this.colorOption() === 'none' ? '' : ` color="${this.colorOption()}"`
        return [`<${tag} mList${color}>`, ...ITEMS.map((item) => `    <li mListItem>${item}</li>`), `</${tag}>`].join(
            '\n'
        )
    })
}
