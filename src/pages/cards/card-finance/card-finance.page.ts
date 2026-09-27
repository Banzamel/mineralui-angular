import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCardFinance} from '@banzamel/mineralui-angular/cards/card-finance'
import type {MCardTrendType} from '@banzamel/mineralui-angular/cards/card-stat'
import type {MSparklineType} from '@banzamel/mineralui-angular/data/sparkline'
import {MIcon, mWalletIcon} from '@banzamel/mineralui-angular/icons'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import cardFinanceTrends from '@generated/examples/cards/card-finance/card-finance-trends'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocProNotice} from '@kit/doc-pro-notice/doc-pro-notice'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const SPARKLINE_TYPES: readonly MSparklineType[] = ['area', 'line', 'bar']
const CHANGE_TYPES = ['auto', 'up', 'down', 'neutral'] as const
const MODES = ['surface', 'link'] as const

@Component({
    selector: 'doc-card-finance-page',
    imports: [DocArticle, DocProNotice, DocSection, DocPlayground, DocPreview, DocPropsTable, MCardFinance, MIcon],
    template: `
        <doc-article
            title="MCardFinance"
            description="Finance KPI card: a value with its change in percent and a sparkline along the bottom edge, tinted by the direction of the change."
        >
            <doc-pro-notice
                [components]="['MCardFinance']"
                reason="Finance card is a Pro component in MineralUI licensing."
            />

            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    @if (mode() === 'link') {
                        <a
                            mCardFinance
                            class="doc-card-finance"
                            href="#revenue-report"
                            label="Revenue"
                            value="$24,500"
                            [sparkline]="sparkline"
                            [sparklineType]="sparklineType()"
                            [color]="color()"
                            [change]="change()"
                            [changeType]="resolvedChangeType()"
                            [changeLabel]="showChangeLabel() ? 'vs last month' : undefined"
                            [currency]="showCurrency() ? 'USD' : undefined"
                        >
                            @if (showIcon()) {
                                <m-icon mCardFinanceIcon [icon]="walletIcon" />
                            }
                        </a>
                    } @else {
                        <m-card-finance
                            class="doc-card-finance"
                            label="Revenue"
                            value="$24,500"
                            [sparkline]="sparkline"
                            [sparklineType]="sparklineType()"
                            [color]="color()"
                            [change]="change()"
                            [changeType]="resolvedChangeType()"
                            [changeLabel]="showChangeLabel() ? 'vs last month' : undefined"
                            [currency]="showCurrency() ? 'USD' : undefined"
                            [interactive]="interactive()"
                        >
                            @if (showIcon()) {
                                <m-icon mCardFinanceIcon [icon]="walletIcon" />
                            }
                        </m-card-finance>
                    }
                </doc-playground>
            </doc-section>

            <doc-section
                title="Up, down and flat"
                description="The change sign picks the arrow and tints the sparkline green or red; no change keeps the card color. changeType overrides the direction, e.g. when a drop is good news."
            >
                <doc-preview [example]="examples.trends" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The arrow is decorative; the direction is read as a hidden word before the change ('Increase +12.5% vs last month', mineralui.card.trendUp / trendDown). The sparkline is decorative — the value and the change are the text. On an anchor the whole card is one link with a focus ring."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="value is a string or number; icon is a slot ([mCardFinanceIcon]). href / to / onClick become a[mCardFinance] with your href or routerLink (ADR 0016). The change direction is also announced, not only colored. changeType uses the MCardTrendType of MCardStat (React: MCardFinanceChangeType, same values)."
            />

            <doc-section title="MCardFinance API">
                <doc-props-table api="MCardFinance" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-card-finance {
            max-width: 340px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFinancePage {
    protected readonly examples = {trends: cardFinanceTrends}
    protected readonly walletIcon = mWalletIcon
    protected readonly sparkline = [12, 15, 13, 18, 22, 20, 24, 28, 26, 31]

    protected readonly mode = signal<(typeof MODES)[number]>('surface')
    protected readonly color = signal<MColor>('primary')
    protected readonly sparklineType = signal<MSparklineType>('area')
    protected readonly changeType = signal<(typeof CHANGE_TYPES)[number]>('auto')
    protected readonly change = signal(12.5)
    protected readonly interactive = signal(false)
    protected readonly showIcon = signal(true)
    protected readonly showCurrency = signal(true)
    protected readonly showChangeLabel = signal(true)
    protected readonly controls = [
        selectControl('mode', this.mode, MODES),
        selectControl('color', this.color, COLORS),
        selectControl('sparklineType', this.sparklineType, SPARKLINE_TYPES),
        selectControl('changeType', this.changeType, CHANGE_TYPES),
        sliderControl('change', this.change, {min: -50, max: 50, step: 0.5}),
        booleanControl('interactive', this.interactive),
        booleanControl('icon', this.showIcon),
        booleanControl('currency', this.showCurrency),
        booleanControl('changeLabel', this.showChangeLabel),
    ]

    protected readonly resolvedChangeType = computed((): MCardTrendType | undefined => {
        const type = this.changeType()
        return type === 'auto' ? undefined : type
    })

    protected readonly code = computed(() => {
        const link = this.mode() === 'link'
        const attrs = [
            link ? 'mCardFinance href="/reports/revenue"' : '',
            'label="Revenue"',
            'value="$24,500"',
            '[sparkline]="sparkline"',
            `[change]="${this.change()}"`,
            this.resolvedChangeType() && `changeType="${this.resolvedChangeType()}"`,
            this.showChangeLabel() && 'changeLabel="vs last month"',
            this.showCurrency() && 'currency="USD"',
            this.sparklineType() !== 'area' && `sparklineType="${this.sparklineType()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            !link && this.interactive() && 'interactive',
        ].filter((attr) => typeof attr === 'string' && attr !== '')
        const tag = link ? 'a' : 'm-card-finance'
        const body = this.showIcon() ? '\n    <m-icon mCardFinanceIcon [icon]="walletIcon" />\n' : ''
        return `<${tag}\n    ${attrs.join('\n    ')}\n>${body}</${tag}>`
    })
}
