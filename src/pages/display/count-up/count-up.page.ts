import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCountUp} from '@banzamel/mineralui-angular/display/count-up'
import countUpStats from '@generated/examples/display/count-up/count-up-stats'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const DECIMALS = ['0', '1', '2'] as const
const FORMATS = ['plain', 'currency', 'percent'] as const

@Component({
    selector: 'doc-count-up-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MCountUp],
    template: `
        <doc-article
            title="MCountUp"
            description="Counts a number up to its value with an ease-out curve when it scrolls into view — KPIs, stats, landing pages."
        >
            <doc-section title="Playground" description="Changing the value counts on from the number on screen.">
                <doc-playground [controls]="controls" [code]="code()">
                    <p class="doc-count-up-demo">
                        <span
                            mCountUp
                            [value]="value()"
                            [from]="from()"
                            [duration]="duration()"
                            [decimals]="decimals()"
                            [prefix]="prefix()"
                            [suffix]="suffix()"
                            [separator]="separator() ? ',' : ''"
                        ></span>
                    </p>
                </doc-playground>
            </doc-section>

            <doc-section title="Stats row">
                <doc-preview [example]="examples.stats" />
            </doc-section>

            <doc-section
                title="Accessibility and server rendering"
                description="The counting digits are hidden from screen readers, which read the final value instead. The server renders the final value; while a prerendered page hydrates, a counter already on screen keeps it rather than jumping back to from. prefers-reduced-motion shows the value without counting."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="MCountUp goes on your own span (span[mCountUp]). It starts counting when it scrolls into view (React: on mount) and announces only the final value."
            />

            <doc-section title="MCountUp API">
                <doc-props-table api="MCountUp" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-count-up-demo {
            margin: 0;
            text-align: center;
            font-size: 2.5rem;
            font-weight: 700;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountUpPage {
    protected readonly examples = {stats: countUpStats}

    protected readonly value = signal(12340)
    protected readonly from = signal(0)
    protected readonly duration = signal(1200)
    protected readonly decimalsOption = signal<(typeof DECIMALS)[number]>('0')
    protected readonly format = signal<(typeof FORMATS)[number]>('plain')
    protected readonly separator = signal(true)
    protected readonly controls = [
        sliderControl('value', this.value, {min: 100, max: 50000, step: 100}),
        sliderControl('from', this.from, {min: 0, max: 25000, step: 100}),
        sliderControl('duration', this.duration, {min: 200, max: 3000, step: 100}),
        selectControl('decimals', this.decimalsOption, DECIMALS),
        selectControl('format', this.format, FORMATS),
        booleanControl('separator', this.separator),
    ]

    protected readonly decimals = computed(() => Number(this.decimalsOption()))
    protected readonly prefix = computed(() => (this.format() === 'currency' ? '$' : ''))
    protected readonly suffix = computed(() => (this.format() === 'percent' ? '%' : ''))

    protected readonly code = computed(() => {
        const attrs = [
            `[value]="${this.value()}"`,
            this.from() !== 0 && `[from]="${this.from()}"`,
            this.duration() !== 1000 && `[duration]="${this.duration()}"`,
            this.decimals() !== 0 && `[decimals]="${this.decimals()}"`,
            this.prefix() && `prefix="${this.prefix()}"`,
            this.suffix() && `suffix="${this.suffix()}"`,
            this.separator() && 'separator=","',
        ].filter((attr): attr is string => typeof attr === 'string' && attr !== '')
        return `<span mCountUp ${attrs.join(' ')}></span>`
    })
}
