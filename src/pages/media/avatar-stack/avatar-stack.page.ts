import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MAvatarStack} from '@banzamel/mineralui-angular/media/avatar-stack'
import type {MAvatarStackItem} from '@banzamel/mineralui-angular/media/avatar-stack'
import type {MTooltipPlacement} from '@banzamel/mineralui-angular/overlays/tooltip'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import avatarStackStatic from '@generated/examples/media/avatar-stack/avatar-stack-static'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import {SAMPLE_PEOPLE} from '../media-samples'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const PLACEMENTS: readonly MTooltipPlacement[] = ['top', 'bottom', 'left', 'right']

@Component({
    selector: 'doc-avatar-stack-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MAvatarStack, MStack, MText],
    template: `
        <doc-article
            title="MAvatarStack"
            description="Overlapping avatar group for participants, collaborators, likes or comment authors. Hover lifts the active avatar above its neighbours and shows a tooltip with the name and description."
        >
            <doc-section
                title="Playground"
                description="Hover or focus an avatar to see the lift and the tooltip. clickable turns the avatars into buttons that report (itemClick); interactive off gives a static stack."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack align="start">
                        <m-avatar-stack
                            [items]="items()"
                            [max]="max()"
                            [size]="size()"
                            [color]="color()"
                            [overlap]="overlap()"
                            [interactive]="interactive()"
                            [clickable]="clickable()"
                            [showTooltip]="showTooltip()"
                            [tooltipPlacement]="tooltipPlacement()"
                            [tooltipDelay]="tooltipDelay()"
                            (itemClick)="clicked.set($event.name ?? '')"
                        />
                        <p mText tone="muted" size="sm">
                            {{ clicked() ? 'itemClick: ' + clicked() : 'No avatar clicked yet.' }}
                        </p>
                    </m-stack>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Static read-only stack"
                description="interactive off drops the hover lift, the tooltips and the buttons in one go — for attendance dots in dense tables. Items with href stay links."
            >
                <doc-preview [example]="examples.static" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="Each avatar is named by the person's name: an image in a static stack, a link with href, a button with clickable. The tooltip (name and description) becomes the avatar's description on hover and keyboard focus. The +N counter is an image named '3 more' (mineralui.avatarStack.more)."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="Items are plain data (ADR 0008): onClick in an item and onItemClick become the (itemClick) output, and the new clickable input decides whether items without href are buttons (React: whenever a handler was passed). tooltip is a string (no ReactNode). The avatar itself is the link or button (React wrapped MAvatar in one), so the item keeps the avatar's border; the +N counter sits above the last avatar, and a focused avatar shows its ring together with the lift."
            />

            <doc-section title="MAvatarStack API">
                <doc-props-table api="MAvatarStack" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarStackPage {
    protected readonly examples = {static: avatarStackStatic}

    protected readonly max = signal(5)
    protected readonly size = signal<MSize>('sm')
    protected readonly color = signal<MColor>('primary')
    protected readonly overlap = signal(10)
    protected readonly count = signal(8)
    protected readonly tooltipPlacement = signal<MTooltipPlacement>('top')
    protected readonly tooltipDelay = signal(150)
    protected readonly interactive = signal(true)
    protected readonly showTooltip = signal(true)
    protected readonly clickable = signal(true)
    protected readonly clicked = signal('')
    protected readonly controls = [
        sliderControl('max', this.max, {min: 1, max: 8}),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        sliderControl('overlap', this.overlap, {min: 4, max: 20, step: 2}),
        sliderControl('count', this.count, {min: 1, max: 8}),
        selectControl('tooltipPlacement', this.tooltipPlacement, PLACEMENTS),
        sliderControl('tooltipDelay', this.tooltipDelay, {min: 0, max: 1000, step: 50}),
        booleanControl('interactive', this.interactive),
        booleanControl('showTooltip', this.showTooltip),
        booleanControl('clickable', this.clickable),
    ]

    protected readonly items = computed((): readonly MAvatarStackItem[] => SAMPLE_PEOPLE.slice(0, this.count()))

    protected readonly code = computed(() => {
        const attrs = [
            '[items]="people"',
            this.max() !== 5 && `[max]="${this.max()}"`,
            this.size() !== 'sm' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.overlap() !== 10 && `[overlap]="${this.overlap()}"`,
            !this.interactive() && '[interactive]="false"',
            !this.showTooltip() && '[showTooltip]="false"',
            this.tooltipPlacement() !== 'top' && `tooltipPlacement="${this.tooltipPlacement()}"`,
            this.tooltipDelay() !== 150 && `[tooltipDelay]="${this.tooltipDelay()}"`,
            this.clickable() && 'clickable',
            this.clickable() && '(itemClick)="openProfile($event)"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-avatar-stack\n    ${attrs.join('\n    ')}\n/>`
    })
}
