import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MReveal} from '@banzamel/mineralui-angular/display/reveal'
import type {MRevealDirection, MRevealTrigger} from '@banzamel/mineralui-angular/display/reveal'
import {MCard} from '@banzamel/mineralui-angular/cards/card'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import revealStagger from '@generated/examples/display/reveal/reveal-stagger'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const DIRECTIONS: readonly MRevealDirection[] = ['up', 'down', 'left', 'right', 'none']
const TRIGGERS: readonly MRevealTrigger[] = ['view', 'mount']
const DELAYS = ['0', '0.08', '0.2', '0.4'] as const
const DURATIONS = ['0.2', '0.46', '0.8', '1.2'] as const

@Component({
    selector: 'doc-reveal-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MReveal, MButton, MCard, MText],
    template: `
        <doc-article
            title="MReveal"
            description="Fades and slides any element in when it scrolls into view or right after it renders — sections, cards, hero content."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <div class="doc-reveal-stage">
                        <!-- Re-created on every change (and on Replay), so each setting plays from the start. -->
                        @for (run of [run()]; track run) {
                            <m-card
                                class="doc-reveal-card"
                                padded
                                [stretch]="false"
                                [mReveal]="direction()"
                                [revealTrigger]="trigger()"
                                [revealDelay]="delay()"
                                [revealDuration]="duration()"
                                [revealDistance]="distance()"
                                [revealOnce]="once()"
                            >
                                <p mText weight="semibold">Revealed content</p>
                                <p mText tone="muted" size="sm">
                                    Direction {{ direction() }}, trigger {{ trigger() }}.
                                </p>
                            </m-card>
                        }
                        <button mButton size="sm" variant="outlined" (click)="replays.set(replays() + 1)">
                            Replay
                        </button>
                    </div>
                </doc-playground>
            </doc-section>

            <doc-section title="Staggered list" description="Growing delays make items arrive one after another.">
                <doc-preview [example]="examples.stagger" />
            </doc-section>

            <doc-section
                title="Server rendering"
                description="The server never hides anything, so a prerendered page reads fine without JavaScript. While the page hydrates, elements already on screen stay as they are and only those below the fold animate in; after client-side navigation everything animates as usual. prefers-reduced-motion shows the element without motion."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="MReveal is a directive on your own element instead of a wrapping div: direction is the mReveal value (the bare attribute means up), the other props are prefixed — revealDelay, revealDuration, revealDistance, revealOnce, revealTrigger. Hydration keeps on-screen content visible, and reduced motion is handled in CSS."
            />

            <doc-section title="MReveal API">
                <doc-props-table api="MReveal" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-reveal-stage {
            display: grid;
            justify-items: center;
            gap: var(--mineral-spacing-md);
        }

        .doc-reveal-card {
            width: min(100%, 22rem);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevealPage {
    protected readonly examples = {stagger: revealStagger}

    protected readonly direction = signal<MRevealDirection>('up')
    protected readonly trigger = signal<MRevealTrigger>('view')
    protected readonly delay = signal<(typeof DELAYS)[number]>('0.08')
    protected readonly duration = signal<(typeof DURATIONS)[number]>('0.46')
    protected readonly distance = signal(20)
    protected readonly once = signal(true)
    protected readonly controls = [
        selectControl('mReveal', this.direction, DIRECTIONS),
        selectControl('revealTrigger', this.trigger, TRIGGERS),
        selectControl('revealDelay', this.delay, DELAYS),
        selectControl('revealDuration', this.duration, DURATIONS),
        sliderControl('revealDistance', this.distance, {min: 0, max: 48, step: 2}),
        booleanControl('revealOnce', this.once),
    ]

    protected readonly replays = signal(0)
    // Changes with every setting and every Replay click: the demo card is re-created and plays again.
    protected readonly run = computed(() =>
        [
            this.direction(),
            this.trigger(),
            this.delay(),
            this.duration(),
            this.distance(),
            this.once(),
            this.replays(),
        ].join('|')
    )

    protected readonly code = computed(() => {
        const attrs = [
            this.direction() === 'up' ? 'mReveal' : `mReveal="${this.direction()}"`,
            this.trigger() !== 'view' && `revealTrigger="${this.trigger()}"`,
            this.delay() !== '0' && `revealDelay="${this.delay()}"`,
            this.duration() !== '0.46' && `revealDuration="${this.duration()}"`,
            this.distance() !== 20 && `[revealDistance]="${this.distance()}"`,
            !this.once() && '[revealOnce]="false"',
        ].filter((attr): attr is string => typeof attr === 'string')
        return `<m-card ${attrs.join(' ')}>…</m-card>`
    })
}
