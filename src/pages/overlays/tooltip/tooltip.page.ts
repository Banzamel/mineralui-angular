import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MTooltip} from '@banzamel/mineralui-angular/overlays/tooltip'
import type {MTooltipPlacement} from '@banzamel/mineralui-angular/overlays/tooltip'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import tooltipIcons from '@generated/examples/overlays/tooltip/tooltip-icons'
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

            <doc-section title="Behaviour">
                <ul mList>
                    <li mListItem>
                        Shown on hover and on keyboard focus, hidden on leave, blur and <strong>Escape</strong>. The
                        pointer can move onto the bubble without it disappearing (WCAG 1.4.13).
                    </li>
                    <li mListItem>
                        The bubble is created on first use next to the element, in the browser's top layer, and linked
                        with <code mCode>aria-describedby</code> (added to any description the element already has).
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
                        React renders the text without linking it to the element, ignores Escape and hides the bubble
                        when the pointer moves onto it.
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
    protected readonly examples = {tooltipIcons}

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
