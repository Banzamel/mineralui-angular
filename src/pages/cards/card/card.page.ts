import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCard, MCardBody, MCardFooter, MCardHeader} from '@banzamel/mineralui-angular/cards/card'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import type {MSurfaceTone} from '@banzamel/mineralui-angular/layout/surface'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import cardGrid from '@generated/examples/cards/card/card-grid'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const TONES: readonly MSurfaceTone[] = ['raised', 'default', 'subtle', 'inverse']

@Component({
    selector: 'doc-card-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MCard,
        MCardHeader,
        MCardBody,
        MCardFooter,
        MButton,
        MCode,
        MHeading,
        MText,
    ],
    template: `
        <doc-article
            title="MCard"
            description="Surface container with optional header, body and footer sections. Use it for dense app panels, summary blocks and modular content sections."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-card
                        class="doc-card-demo"
                        [tone]="tone()"
                        [color]="color()"
                        [outlined]="outlined()"
                        [padded]="padded()"
                        [stretch]="stretch()"
                        [skeleton]="skeleton()"
                    >
                        <m-card-header><h3 mHeading>Deployment status</h3></m-card-header>
                        <m-card-body>
                            <p mText tone="muted">
                                Your production build is ready to be published and the release checklist is complete.
                            </p>
                        </m-card-body>
                        <m-card-footer><button mButton size="sm">Review changes</button></m-card-footer>
                    </m-card>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Cards in a grid"
                description="Cards in a row share its height and the body grows, so the footers line up."
            >
                <doc-preview [example]="examples.cardGrid" />
            </doc-section>

            <doc-section
                title="Differences from MineralUI for React"
                description="Link and action cards (href, to, component, onClick, interactive, clickEffect) come with the rest of the cards group. Until then, put a link or a button inside a card. The skeleton state also sets aria-busy on the card."
            />

            <doc-section title="MCard API">
                <doc-props-table api="MCard" />
            </doc-section>

            <doc-section title="Sections">
                <p mText tone="muted" size="sm">
                    <code mCode>&lt;m-card-header&gt;</code>, <code mCode>&lt;m-card-body&gt;</code> and
                    <code mCode>&lt;m-card-footer&gt;</code> have no inputs — they only lay out and pad their content.
                </p>
                <doc-props-table api="MCardHeader" />
                <doc-props-table api="MCardBody" />
                <doc-props-table api="MCardFooter" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-card-demo {
            max-width: 420px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPage {
    protected readonly examples = {cardGrid}

    protected readonly tone = signal<MSurfaceTone>('raised')
    protected readonly color = signal<MColor>('primary')
    protected readonly outlined = signal(true)
    protected readonly padded = signal(false)
    protected readonly stretch = signal(true)
    protected readonly skeleton = signal(false)
    protected readonly controls = [
        selectControl('tone', this.tone, TONES),
        selectControl('color', this.color, COLORS),
        booleanControl('outlined', this.outlined),
        booleanControl('padded', this.padded),
        booleanControl('stretch', this.stretch),
        booleanControl('skeleton', this.skeleton),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            this.tone() !== 'raised' && `tone="${this.tone()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            !this.outlined() && '[outlined]="false"',
            this.padded() && 'padded',
            !this.stretch() && '[stretch]="false"',
            this.skeleton() && 'skeleton',
        ].filter((attr) => attr !== false)
        const open = attrs.length > 0 ? `<m-card ${attrs.join(' ')}>` : '<m-card>'
        return `${open}
    <m-card-header><h3 mHeading>Deployment status</h3></m-card-header>
    <m-card-body>
        <p mText tone="muted">Your production build is ready to be published.</p>
    </m-card-body>
    <m-card-footer><button mButton size="sm">Review changes</button></m-card-footer>
</m-card>`
    })
}
