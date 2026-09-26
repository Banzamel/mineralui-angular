import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCardWidget} from '@banzamel/mineralui-angular/cards/card-widget'
import {MIcon, mWalletIcon} from '@banzamel/mineralui-angular/icons'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const TRENDS = ['8.2', '-1.5', '0', 'none'] as const
const MODES = ['surface', 'interactive', 'link'] as const

@Component({
    selector: 'doc-card-widget-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPropsTable, MCardWidget, MIcon],
    template: `
        <doc-article
            title="MCardWidget"
            description="Dense dashboard tile with a heading, a large value, an icon, a trend and helper text."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    @if (mode() === 'link') {
                        <a
                            mCardWidget
                            class="doc-card-widget"
                            href="#revenue"
                            heading="Monthly revenue"
                            value="$12,480"
                            [trend]="trendValue()"
                            [color]="color()"
                            [helperText]="showHelper() ? 'Compared to last month' : undefined"
                        >
                            @if (showIcon()) {
                                <m-icon mCardWidgetIcon [icon]="walletIcon" />
                            }
                        </a>
                    } @else {
                        <m-card-widget
                            class="doc-card-widget"
                            heading="Monthly revenue"
                            value="$12,480"
                            [trend]="trendValue()"
                            [color]="color()"
                            [interactive]="mode() === 'interactive'"
                            [helperText]="showHelper() ? 'Compared to last month' : undefined"
                        >
                            @if (showIcon()) {
                                <m-icon mCardWidgetIcon [icon]="walletIcon" />
                            }
                        </m-card-widget>
                    }
                </doc-playground>
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The trend direction is read as a hidden word before the value (mineralui.card.trendUp / trendDown). a[mCardWidget] is one link with a focus ring; interactive only adds the hover lift and ripple — the tile gets no role or click handling."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="title is renamed heading (ADR 0004) and the icon is the [mCardWidgetIcon] slot. component / href / to / onClick become a[mCardWidget] with your href or routerLink; a clickable div is not offered (ADR 0016)."
            />

            <doc-section title="MCardWidget API">
                <doc-props-table api="MCardWidget" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-card-widget {
            max-width: 320px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardWidgetPage {
    protected readonly walletIcon = mWalletIcon

    protected readonly mode = signal<(typeof MODES)[number]>('surface')
    protected readonly color = signal<MColor>('primary')
    protected readonly trend = signal<(typeof TRENDS)[number]>('8.2')
    protected readonly showIcon = signal(true)
    protected readonly showHelper = signal(true)
    protected readonly controls = [
        selectControl('mode', this.mode, MODES),
        selectControl('color', this.color, COLORS),
        selectControl('trend', this.trend, TRENDS),
        booleanControl('icon', this.showIcon),
        booleanControl('helperText', this.showHelper),
    ]

    protected readonly trendValue = computed(() => {
        const trend = this.trend()
        return trend === 'none' ? undefined : Number(trend)
    })

    protected readonly code = computed(() => {
        const attrs = [
            this.mode() === 'link' && 'mCardWidget href="/reports/revenue"',
            'heading="Monthly revenue"',
            'value="$12,480"',
            this.trend() !== 'none' && `[trend]="${this.trend()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.mode() === 'interactive' && 'interactive',
            this.showHelper() && 'helperText="Compared to last month"',
        ].filter((attr) => typeof attr === 'string')
        const tag = this.mode() === 'link' ? 'a' : 'm-card-widget'
        const body = this.showIcon() ? '\n    <m-icon mCardWidgetIcon [icon]="walletIcon" />\n' : ''
        return `<${tag} ${attrs.join(' ')}>${body}</${tag}>`
    })
}
