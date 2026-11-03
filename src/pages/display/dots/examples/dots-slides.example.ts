import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MDots} from '@banzamel/mineralui-angular/display/dots'
import {mChevronLeftIcon, mChevronRightIcon, MIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Tip {
    readonly title: string
    readonly text: string
}

const TIPS: readonly [Tip, ...Tip[]] = [
    {title: 'Plan the week', text: 'Block focus time before the meetings fill the calendar.'},
    {title: 'Review on Friday', text: 'Ten minutes of notes saves an hour on Monday.'},
    {title: 'Share early', text: 'A rough draft today beats a polished one next week.'},
    {title: 'Rest', text: 'Close the laptop — tomorrow starts with a clear head.'},
]

@Component({
    selector: 'app-dots-slides',
    imports: [MButton, MDots, MHeading, MIcon, MInline, MStack, MText],
    template: `
        <m-stack spacing="sm" align="center">
            <m-inline justify="center" wrap="nowrap">
                <button
                    mButton
                    variant="ghost"
                    shape="circle"
                    iconOnly
                    aria-label="Previous tip"
                    aria-controls="dots-tip"
                    (click)="move(-1)"
                >
                    <m-icon [icon]="previousIcon" />
                </button>
                <div id="dots-tip" class="app-dots-tip" aria-live="polite">
                    <h3 mHeading [size]="5">{{ tip().title }}</h3>
                    <p mText tone="muted" size="sm">{{ tip().text }}</p>
                </div>
                <button
                    mButton
                    variant="ghost"
                    shape="circle"
                    iconOnly
                    aria-label="Next tip"
                    aria-controls="dots-tip"
                    (click)="move(1)"
                >
                    <m-icon [icon]="nextIcon" />
                </button>
            </m-inline>
            <m-dots
                ariaLabel="Choose tip"
                controls="dots-tip"
                [count]="tips.length"
                [itemLabel]="tipLabel"
                [(active)]="index"
            />
        </m-stack>
    `,
    styles: `
        .app-dots-tip {
            width: min(320px, 60vw);
            min-height: 88px;
            text-align: center;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotsSlidesExample {
    protected readonly tips = TIPS
    protected readonly previousIcon = mChevronLeftIcon
    protected readonly nextIcon = mChevronRightIcon
    protected readonly index = signal<number | null>(0)
    protected readonly tip = computed(() => TIPS[this.index() ?? 0] ?? TIPS[0])
    protected readonly tipLabel = (position: number) => `Tip ${position}`

    protected move(step: number): void {
        this.index.set(((this.index() ?? 0) + step + TIPS.length) % TIPS.length)
    }
}
