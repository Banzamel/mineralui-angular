import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MWeekGrid} from '@banzamel/mineralui-angular/data/week-grid'
import type {MWeekGridCellContext} from '@banzamel/mineralui-angular/data/week-grid'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import weekGridColors from '@generated/examples/data/week-grid/week-grid-colors'
import weekGridShop from '@generated/examples/data/week-grid/week-grid-shop'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['warning', 'primary', 'success', 'error', 'info', 'neutral', 'news']
const WEEK_STARTS = ['monday', 'sunday'] as const
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// 7 × 24 office-week availability, indexed [day][hour], day 0 = Sunday.
const AVAILABILITY = Array.from({length: 7}, (_, day) =>
    Array.from({length: 24}, (_, hour) => {
        if (hour < 8 || hour > 20) return 0
        const weekday = day >= 1 && day <= 5
        const lunch = hour === 13 ? 0.6 : 1
        const evening = hour >= 18 ? 0.7 : 1
        const peak = hour === 9 || hour === 17 ? 1.05 : 1
        return Math.round((weekday ? 60 : 22) * (weekday ? 1 : 0.45) * lunch * evening * peak)
    })
)

@Component({
    selector: 'doc-week-grid-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MStack, MText, MWeekGrid],
    template: `
        <doc-article
            title="MWeekGrid"
            description="Week × hour heatmap. Rows are days, columns hours (or any fixed slot range); cells shade by density in four bands."
        >
            <doc-section
                title="Playground"
                description="A mocked 7 × 24 availability matrix shaped like an office week — weekday peaks at 9 and 17, a lunch dip at 13, lighter weekends. Turn on interactive and use the arrow keys."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack class="doc-week-grid">
                        <m-week-grid
                            label="Team availability"
                            [data]="availability"
                            [max]="65"
                            [color]="color()"
                            [weekStart]="weekStart() === 'sunday' ? 0 : 1"
                            [showLegend]="showLegend()"
                            [legendUnit]="showLegend() ? 'teachers' : undefined"
                            [heading]="showLabels() ? 'Team availability' : undefined"
                            [description]="
                                showLabels()
                                    ? 'How many teachers declared availability for each hour of the week.'
                                    : undefined
                            "
                            [hint]="showLabels() ? 'Hover a cell for details; the colour shows density.' : undefined"
                            [peakLabel]="showLabels() ? peakLabel : undefined"
                            [interactive]="interactive()"
                            (cellClick)="picked.set($event)"
                        />
                        @if (interactive()) {
                            <p mText size="sm" tone="muted">{{ pickedText() }}</p>
                        }
                    </m-stack>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Color families"
                description="color drives the three filled bands. The empty band always uses a faint neutral tint, so empty hours stay readable on any accent."
            >
                <doc-preview [example]="examples.colors" />
            </doc-section>

            <doc-section
                title="Custom labels, slot range and cell template"
                description="dayLabels + slotLabels when the grid is not weekly hours — here the opening hours of a shop (Mon–Sat, 9–18). ng-template mWeekGridCell replaces the cell content."
            >
                <doc-preview [example]="examples.shop" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="A native table: the heading (or label) names it, days are row headers and hours column headers, so every value is read with its day and hour. The legend states the bands in text (WCAG 1.4.1). With interactive the table becomes a WAI-ARIA grid — one Tab stop, arrow keys, Home / End along the row, Ctrl+Home / Ctrl+End to the corners, Enter or Space for (cellClick); tooltips also show on focus."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="A table instead of a CSS grid of divs. title becomes heading (title is a global HTML attribute); title, description, hint and peakLabel are text. renderCell becomes ng-template mWeekGridCell, renderTooltip the tooltip function; onCellClick becomes interactive + (cellClick) with keyboard support (React: clickable divs). Default weekday names follow the active locale; the scale and band labels come from the mineralui.weekGrid.* dictionary."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MWeekGrid" />
                    <doc-props-table api="MWeekGridCellContext" />
                    <doc-props-table api="MWeekGridCell" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-week-grid {
            width: 100%;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekGridPage {
    protected readonly examples = {colors: weekGridColors, shop: weekGridShop}
    protected readonly availability = AVAILABILITY
    protected readonly peakLabel = 'Peak: Mon 09:00 — 63/65'

    protected readonly color = signal<MColor>('warning')
    protected readonly weekStart = signal<(typeof WEEK_STARTS)[number]>('monday')
    protected readonly showLegend = signal(true)
    protected readonly showLabels = signal(true)
    protected readonly interactive = signal(false)
    protected readonly picked = signal<MWeekGridCellContext | null>(null)
    protected readonly controls = [
        selectControl('color', this.color, COLORS),
        selectControl('weekStart', this.weekStart, WEEK_STARTS),
        booleanControl('showLegend', this.showLegend),
        booleanControl('showLabels', this.showLabels),
        booleanControl('interactive', this.interactive),
    ]
    protected readonly pickedText = computed(() => {
        const cell = this.picked()
        if (!cell) return 'Click a cell or press Enter on it.'
        return `${DAY_NAMES[cell.day] ?? cell.day} ${String(cell.slot).padStart(2, '0')}:00 — ${cell.value} teachers`
    })

    protected readonly code = computed(() => {
        const attrs = [
            '[data]="grid"',
            '[max]="65"',
            this.color() !== 'warning' && `color="${this.color()}"`,
            this.weekStart() === 'sunday' && '[weekStart]="0"',
            !this.showLegend() && '[showLegend]="false"',
            this.showLegend() && 'legendUnit="teachers"',
            this.showLabels() && 'heading="Team availability"',
            this.interactive() && 'interactive',
            this.interactive() && '(cellClick)="open($event)"',
        ].filter((attr) => typeof attr === 'string')
        return `<!-- grid is number[7][24], indexed [day][hour], day 0 = Sunday -->\n<m-week-grid\n    ${attrs.join('\n    ')}\n/>`
    })
}
