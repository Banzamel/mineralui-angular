import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCardStat} from '@banzamel/mineralui-angular/cards/card-stat'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MIcon, mUsersIcon} from '@banzamel/mineralui-angular/icons'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import cardStatGrid from '@generated/examples/cards/card-stat/card-stat-grid'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const TRENDS = ['12', '-4', '0', '+8%'] as const
const MODES = ['surface', 'link'] as const

@Component({
    selector: 'doc-card-stat-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MBadge, MCardStat, MIcon],
    template: `
        <doc-article
            title="MCardStat"
            description="KPI card with a label, a large value, an icon, a badge and a trend — the fuller sibling of MCardWidget."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    @if (mode() === 'link') {
                        <a
                            mCardStat
                            class="doc-card-stat"
                            href="#active-learners"
                            label="Active learners"
                            value="284"
                            [trend]="trendValue()"
                            [color]="color()"
                            [helperText]="showHelper() ? 'vs last week' : undefined"
                        >
                            @if (showIcon()) {
                                <m-icon mCardStatIcon [icon]="usersIcon" />
                            }
                            @if (showBadge()) {
                                <m-badge mCardStatBadge size="sm" [color]="color()">Live</m-badge>
                            }
                        </a>
                    } @else {
                        <m-card-stat
                            class="doc-card-stat"
                            label="Active learners"
                            value="284"
                            [trend]="trendValue()"
                            [color]="color()"
                            [helperText]="showHelper() ? 'vs last week' : undefined"
                        >
                            @if (showIcon()) {
                                <m-icon mCardStatIcon [icon]="usersIcon" />
                            }
                            @if (showBadge()) {
                                <m-badge mCardStatBadge size="sm" [color]="color()">Live</m-badge>
                            }
                        </m-card-stat>
                    }
                </doc-playground>
            </doc-section>

            <doc-section
                title="Dashboard row"
                description="Stat cards stretch to the row height, so a row of KPIs lines up. trendType overrides the direction taken from the sign."
            >
                <doc-preview [example]="examples.grid" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The trend arrow is decorative; the direction is read as a hidden word before the value ('Increase +12', mineralui.card.trendUp / trendDown). On an anchor the whole card is one link with a focus ring."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="label and value are strings; icon and badge are slots ([mCardStatIcon], [mCardStatBadge]). href / to / onClick become a[mCardStat] with your href or routerLink (ADR 0016). The content has its own padding (React placed it against the card border). The trend direction is also announced, not only shown by the arrow color."
            />

            <doc-section title="MCardStat API">
                <doc-props-table api="MCardStat" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-card-stat {
            max-width: 360px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardStatPage {
    protected readonly examples = {grid: cardStatGrid}
    protected readonly usersIcon = mUsersIcon

    protected readonly mode = signal<(typeof MODES)[number]>('surface')
    protected readonly color = signal<MColor>('primary')
    protected readonly trend = signal<(typeof TRENDS)[number]>('12')
    protected readonly showIcon = signal(true)
    protected readonly showBadge = signal(false)
    protected readonly showHelper = signal(true)
    protected readonly controls = [
        selectControl('mode', this.mode, MODES),
        selectControl('color', this.color, COLORS),
        selectControl('trend', this.trend, TRENDS),
        booleanControl('icon', this.showIcon),
        booleanControl('badge', this.showBadge),
        booleanControl('helperText', this.showHelper),
    ]

    protected readonly trendValue = computed(() => {
        const trend = this.trend()
        return trend === '+8%' ? trend : Number(trend)
    })

    protected readonly code = computed(() => {
        const trend = this.trend()
        const attrs = [
            this.mode() === 'link' ? 'mCardStat href="/reports/learners"' : '',
            'label="Active learners"',
            'value="284"',
            trend === '+8%' ? 'trend="+8%" trendType="up"' : `[trend]="${trend}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.showHelper() && 'helperText="vs last week"',
        ].filter((attr) => typeof attr === 'string' && attr !== '')
        const slots = [
            this.showIcon() && '    <m-icon mCardStatIcon [icon]="usersIcon" />',
            this.showBadge() && '    <m-badge mCardStatBadge size="sm">Live</m-badge>',
        ].filter((slot) => typeof slot === 'string')
        const tag = this.mode() === 'link' ? 'a' : 'm-card-stat'
        const body = slots.length ? `\n${slots.join('\n')}\n` : ''
        return `<${tag} ${attrs.join(' ')}>${body}</${tag}>`
    })
}
