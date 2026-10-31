import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MTooltip} from '@banzamel/mineralui-angular/overlays/tooltip'
import type {MTooltipPlacement} from '@banzamel/mineralui-angular/overlays/tooltip'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import tooltipIcons from '@generated/examples/overlays/tooltip/tooltip-icons'
import tooltipWrap from '@generated/examples/overlays/tooltip/tooltip-wrap'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const PLACEMENTS: readonly MTooltipPlacement[] = ['top', 'bottom', 'left', 'right']

@Component({
    selector: 'doc-tooltip-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MButton,
        MCode,
        MList,
        MListItem,
        MTooltip,
    ],
    template: `
        <doc-article
            title="MTooltip"
            description="Lightweight overlay that appears on hover or focus to provide extra context."
        >
            <doc-section title="Playground" description="Hover or focus the button.">
                <doc-playground [controls]="controls" [code]="code()">
                    <button
                        mButton
                        variant="outlined"
                        [mTooltip]="'Saves your changes as a draft'"
                        [tooltipPlacement]="placement()"
                        [tooltipDelay]="delay()"
                    >
                        Hover me
                    </button>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Icon buttons and rich content"
                description="The tooltip describes its element; an icon-only button still needs its own aria-label. A template gives formatted content."
            >
                <doc-preview [example]="examples.tooltipIcons" />
            </doc-section>

            <doc-section
                title="Longer explanations"
                description="By default the bubble keeps one line. tooltipWrap lets the text wrap within 20rem (never wider than the viewport); a short hint stays as narrow as its text, and a line feed in the text starts a new line."
            >
                <doc-preview [example]="examples.tooltipWrap" />
            </doc-section>

            <doc-section title="Behaviour">
                <ul mList>
                    <li mListItem>
                        Shown on hover and on keyboard focus, hidden on leave, blur and <strong>Escape</strong>. The
                        pointer can move onto the bubble without it disappearing (WCAG 1.4.13).
                    </li>
                    <li mListItem>
                        The text is the element's accessible description from the first render: a hidden copy next to
                        the element is linked with <code mCode>aria-describedby</code> (added to any description the
                        element already has), so a screen reader announces it on the first focus. The bubble itself is
                        created on first use, in the browser's top layer (a template: at once, unopened).
                    </li>
                    <li mListItem>
                        It flips to the opposite side and stays inside the viewport when there is no room.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="Differences from MineralUI for React">
                <ul mList>
                    <li mListItem>
                        A directive on the element instead of a wrapper:
                        <code mCode>&lt;MTooltip content="…"&gt;</code> around a button →
                        <code mCode>[mTooltip]="'…'"</code> on the button; <code mCode>placement</code> /
                        <code mCode>delay</code> → <code mCode>tooltipPlacement</code> /
                        <code mCode>tooltipDelay</code>.
                    </li>
                    <li mListItem>
                        Angular-only: <code mCode>tooltipWrap</code> (several lines within a bounded width, line feeds
                        kept); in React the bubble is always one line. React links the description only while the bubble
                        is shown.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MTooltip" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipPage {
    protected readonly examples = {tooltipIcons, tooltipWrap}

    protected readonly placement = signal<MTooltipPlacement>('top')
    protected readonly delay = signal(0)
    protected readonly controls = [
        selectControl('tooltipPlacement', this.placement, PLACEMENTS),
        sliderControl('tooltipDelay', this.delay, {min: 0, max: 1000, step: 100}),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '[mTooltip]="\'Saves your changes as a draft\'"',
            this.placement() !== 'top' && `tooltipPlacement="${this.placement()}"`,
            this.delay() > 0 && `[tooltipDelay]="${this.delay()}"`,
        ].filter((attr) => attr !== false)
        return `<button mButton variant="outlined" ${attrs.join(' ')}>Hover me</button>`
    })
}
