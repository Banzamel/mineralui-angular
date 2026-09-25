import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MTimeAgo} from '@banzamel/mineralui-angular/display/time-ago'
import type {MTimeAgoUpdate} from '@banzamel/mineralui-angular/display/time-ago'
import type {RelativeTimeFallbackFormat} from '@banzamel/mineralui-angular/utils'
import timeAgoFeed from '@generated/examples/display/time-ago/time-ago-feed'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const MOMENTS = ['30 s ago', '12 min ago', '5 h ago', '3 days ago', '2 months ago', 'in 2 days'] as const
const OFFSETS: Readonly<Record<(typeof MOMENTS)[number], number>> = {
    '30 s ago': -30 * 1000,
    '12 min ago': -12 * 60 * 1000,
    '5 h ago': -5 * 60 * 60 * 1000,
    '3 days ago': -3 * 24 * 60 * 60 * 1000,
    '2 months ago': -61 * 24 * 60 * 60 * 1000,
    'in 2 days': 2 * 24 * 60 * 60 * 1000,
}
const LOCALES = ['auto', 'en', 'pl', 'de'] as const
const THRESHOLDS = ['none', '30d', '1y'] as const
const FORMATS: readonly RelativeTimeFallbackFormat[] = ['date', 'datetime']
const UPDATES: readonly MTimeAgoUpdate[] = ['auto', 'none', 'minute', 'hour', 'day']

@Component({
    selector: 'doc-time-ago-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MTimeAgo],
    template: `
        <doc-article
            title="MTimeAgo"
            description="Relative timestamp on a time element that keeps itself up to date, with the absolute date as a tooltip."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <p class="doc-time-ago-demo">
                        Updated
                        <time
                            mTimeAgo
                            [value]="value()"
                            [locale]="locale()"
                            [maxRelative]="maxRelative()"
                            [fallbackFormat]="fallbackFormat()"
                            [update]="update()"
                            [titleAbsolute]="titleAbsolute()"
                        ></time>
                    </p>
                </doc-playground>
            </doc-section>

            <doc-section title="Activity feed">
                <doc-preview [example]="examples.feed" />
            </doc-section>

            <doc-section
                title="Server rendering"
                description="A prerendered page shows the text as of build time until it hydrates; the datetime attribute always holds the exact moment. The refresh interval runs only in the browser."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="MTimeAgo goes on your own time element (time[mTimeAgo]). The locale falls back to the MineralUI i18n locale, then LOCALE_ID, instead of watching the lang attribute of the page."
            />

            <doc-section title="MTimeAgo API">
                <doc-props-table api="MTimeAgo" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-time-ago-demo {
            margin: 0;
            text-align: center;
            font-size: 1.25rem;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeAgoPage {
    protected readonly examples = {feed: timeAgoFeed}

    private readonly now = Date.now()
    protected readonly moment = signal<(typeof MOMENTS)[number]>('12 min ago')
    protected readonly localeOption = signal<(typeof LOCALES)[number]>('auto')
    protected readonly threshold = signal<(typeof THRESHOLDS)[number]>('30d')
    protected readonly fallbackFormat = signal<RelativeTimeFallbackFormat>('date')
    protected readonly update = signal<MTimeAgoUpdate>('auto')
    protected readonly titleAbsolute = signal(true)
    protected readonly controls = [
        selectControl('value', this.moment, MOMENTS),
        selectControl('locale', this.localeOption, LOCALES),
        selectControl('maxRelative', this.threshold, THRESHOLDS),
        selectControl('fallbackFormat', this.fallbackFormat, FORMATS),
        selectControl('update', this.update, UPDATES),
        booleanControl('titleAbsolute', this.titleAbsolute),
    ]

    protected readonly value = computed(() => new Date(this.now + OFFSETS[this.moment()]))
    protected readonly locale = computed(() => (this.localeOption() === 'auto' ? undefined : this.localeOption()))
    protected readonly maxRelative = computed(() => (this.threshold() === 'none' ? undefined : this.threshold()))

    protected readonly code = computed(() => {
        const attrs = [
            '[value]="updatedAt"',
            this.locale() && `locale="${this.locale()}"`,
            this.maxRelative() && `maxRelative="${this.maxRelative()}"`,
            this.fallbackFormat() !== 'date' && `fallbackFormat="${this.fallbackFormat()}"`,
            this.update() !== 'auto' && `update="${this.update()}"`,
            !this.titleAbsolute() && '[titleAbsolute]="false"',
        ].filter((attr): attr is string => typeof attr === 'string' && attr !== '')
        return `<time mTimeAgo ${attrs.join(' ')}></time>`
    })
}
