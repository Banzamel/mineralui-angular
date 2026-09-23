import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS = ['none', 'primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news'] as const

@Component({
    selector: 'doc-code-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPropsTable, MCode, MText],
    template: `
        <doc-article
            title="MCode"
            description="Inline code primitive for commands, tokens and short technical snippets. For multi-line, highlighted code use MCodeBlock."
        >
            <doc-section title="Playground" description="Preview inline code inside body copy with a semantic color.">
                <doc-playground [controls]="controls" [code]="code()">
                    <p mText>
                        Install the package with
                        <code mCode [color]="color()">npm install &#64;banzamel/mineralui-angular</code> and import the
                        entry points you need.
                    </p>
                </doc-playground>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MCode" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodePage {
    protected readonly colorOption = signal<(typeof COLORS)[number]>('none')
    protected readonly controls = [selectControl('color', this.colorOption, COLORS)]

    protected readonly color = computed<MColor | undefined>(() => {
        const color = this.colorOption()
        return color === 'none' ? undefined : color
    })

    protected readonly code = computed(() => {
        const color = this.colorOption() === 'none' ? '' : ` color="${this.colorOption()}"`
        return [
            '<p mText>',
            `    Install the package with <code mCode${color}>npm install &#64;banzamel/mineralui-angular</code>`,
            '    and import the entry points you need.',
            '</p>',
        ].join('\n')
    })
}
