import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MButtonVariant} from '@banzamel/mineralui-angular/controls/button'
import {MScrollTop} from '@banzamel/mineralui-angular/controls/scroll-top'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import * as snippets from '@generated/snippets/controls/scroll-top'
import {CodeBlock} from '@kit/code-block/code-block'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MButtonVariant[] = ['filled', 'secondary', 'outlined', 'ghost']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']

@Component({
    selector: 'doc-scroll-top-page',
    imports: [CodeBlock, DocArticle, DocSection, DocPlayground, DocPropsTable, MScrollTop, MText],
    template: `
        <doc-article
            title="MScrollTop"
            description="Fixed floating button that scrolls the page back to the top after the user scrolls past a configurable threshold."
        >
            <doc-section
                title="Playground"
                description="The preview pins the button to this box instead of the window. Scroll the page past the threshold to see it appear; the docs' own button stays in the bottom-right corner of the window."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <div class="doc-scroll-top-stage">
                        <p mText size="sm" tone="muted">Scroll the page by {{ threshold() }} px or more.</p>
                        <m-scroll-top
                            [threshold]="threshold()"
                            [variant]="variant()"
                            [color]="color()"
                            [smooth]="smooth()"
                        />
                    </div>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Placement"
                description="Add one instance to your app layout. While hidden, the button is inert — it cannot take keyboard focus and is left out of the accessibility tree. Smooth scrolling is skipped for users who prefer reduced motion."
            >
                <doc-code-block [snippet]="snippets.appLayoutComponentTs" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MScrollTop" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        /* A transformed box becomes the containing block of position: fixed, so the demo stays inside it. */
        .doc-scroll-top-stage {
            position: relative;
            width: 100%;
            min-height: 140px;
            transform: translateZ(0);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollTopPage {
    protected readonly snippets = snippets

    protected readonly threshold = signal(100)
    protected readonly variant = signal<MButtonVariant>('filled')
    protected readonly color = signal<MColor>('primary')
    protected readonly smooth = signal(true)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('color', this.color, COLORS),
        sliderControl('threshold', this.threshold, {min: 0, max: 600, step: 50}),
        booleanControl('smooth', this.smooth),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            this.threshold() !== 300 && `[threshold]="${this.threshold()}"`,
            this.variant() !== 'filled' && `variant="${this.variant()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            !this.smooth() && '[smooth]="false"',
        ].filter((attr) => typeof attr === 'string')

        return `<m-scroll-top${attrs.map((attr) => ` ${attr}`).join('')} />`
    })
}
