import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MSimpleGridColumns} from '@banzamel/mineralui-angular/layout/simple-grid'
import {mSimpleGridColumnValues} from '@banzamel/mineralui-angular/layout/simple-grid'
import {MStatGrid} from '@banzamel/mineralui-angular/layout/stat-grid'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MSubText} from '@banzamel/mineralui-angular/typography/sub-text'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

interface Stat {
    readonly label: string
    readonly value: string
    readonly trend: string
    readonly color: MColor
}

const STATS: readonly Stat[] = [
    {label: 'Revenue', value: '$48,200', trend: '+12.4%', color: 'success'},
    {label: 'Active users', value: '3,218', trend: '+4.1%', color: 'primary'},
    {label: 'Churn', value: '1.8%', trend: '-0.3%', color: 'warning'},
    {label: 'Tickets', value: '42', trend: '+6', color: 'error'},
]
const COLUMNS = mSimpleGridColumnValues.map(String)

const isColumns = (value: number): value is MSimpleGridColumns =>
    mSimpleGridColumnValues.some((columns) => columns === value)

@Component({
    selector: 'doc-stat-grid-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPropsTable, MStatGrid, MSubText, MSurface, MText],
    template: `
        <doc-article
            title="MStatGrid"
            description="Thin responsive grid for stat and KPI cards, so dashboards stop repeating the same grid composition."
        >
            <doc-section
                title="Playground"
                description="Four columns by default. Render the tiles with @for — it replaces items + renderItem from MineralUI for React and keeps the item type."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stat-grid [columns]="columns()" style="width: 100%">
                        @for (stat of stats; track stat.label) {
                            <!-- TEMP: the tile replaces with MCardStat (etap 6) -->
                            <div mSurface>
                                <small mSubText>{{ stat.label }}</small>
                                <p mText size="xl" weight="bold">{{ stat.value }}</p>
                                <small mSubText [color]="stat.color">{{ stat.trend }}</small>
                            </div>
                        }
                    </m-stat-grid>
                </doc-playground>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MStatGrid" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatGridPage {
    protected readonly stats = STATS

    protected readonly columnsOption = signal('4')
    protected readonly controls = [selectControl('columns', this.columnsOption, COLUMNS)]

    protected readonly columns = computed<MSimpleGridColumns>(() => {
        const columns = Number(this.columnsOption())
        return isColumns(columns) ? columns : 4
    })

    protected readonly code = computed(() => {
        const columns = this.columns() === 4 ? '' : ` [columns]="${this.columns()}"`
        return [
            `<m-stat-grid${columns}>`,
            '    @for (stat of stats; track stat.label) {',
            '        <app-stat-card [stat]="stat" />',
            '    }',
            '</m-stat-grid>',
        ].join('\n')
    })
}
