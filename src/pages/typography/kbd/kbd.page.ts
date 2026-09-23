import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import {MKbd} from '@banzamel/mineralui-angular/typography/kbd'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-kbd-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPropsTable, MKbd, MStack, MText],
    template: `
        <doc-article title="MKbd" description="Inline keyboard key indicator for shortcuts and key combinations.">
            <doc-section
                title="Playground"
                description="Preview key sizes, alone and in a combination. A combination nests the keys in an outer kbd, as HTML intends."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack>
                        @if (combo()) {
                            <p mText>
                                Press
                                <kbd mKbd [size]="size()"
                                    ><kbd mKbd [size]="size()">Ctrl</kbd> + <kbd mKbd [size]="size()">K</kbd></kbd
                                >
                                to focus search
                            </p>
                        }
                        <p mText>Press <kbd mKbd [size]="size()">Esc</kbd> to close the current panel</p>
                    </m-stack>
                </doc-playground>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MKbd" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KbdPage {
    protected readonly size = signal<MSize>('md')
    protected readonly combo = signal(true)
    protected readonly controls = [selectControl('size', this.size, SIZES), booleanControl('combo', this.combo)]

    protected readonly code = computed(() => {
        const size = this.size() === 'md' ? '' : ` size="${this.size()}"`
        const combo = [
            '<p mText>',
            `    Press <kbd mKbd${size}><kbd mKbd${size}>Ctrl</kbd> + <kbd mKbd${size}>K</kbd></kbd> to focus search`,
            '</p>',
        ]
        const esc = [`<p mText>Press <kbd mKbd${size}>Esc</kbd> to close the current panel</p>`]
        return [...(this.combo() ? combo : []), ...esc].join('\n')
    })
}
