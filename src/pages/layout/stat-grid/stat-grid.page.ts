import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCardStat} from '@banzamel/mineralui-angular/cards/card-stat'
import type {MSimpleGridColumns} from '@banzamel/mineralui-angular/layout/simple-grid'
import {mSimpleGridColumnValues} from '@banzamel/mineralui-angular/layout/simple-grid'
import {MStatGrid} from '@banzamel/mineralui-angular/layout/stat-grid'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

interface Stat {
    readonly label: string
    readonly value: string
    readonly trend: number
    readonly color: MColor
}

const STATS: readonly Stat[] = [
    {label: 'Active clients', value: '284', trend: 12, color: 'primary'},
    {label: 'Team online', value: '19', trend: 4, color: 'success'},
    {label: 'Pending reviews', value: '7', trend: -2, color: 'warning'},
    {label: 'Critical alerts', value: '2', trend: -1, color: 'error'},
]
const COLUMNS = mSimpleGridColumnValues.map(String)

const isColumns = (value: number): value is MSimpleGridColumns =>
    mSimpleGridColumnValues.some((columns) => columns === value)

@Component({
    selector: 'doc-stat-grid-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPropsTable, MCardStat, MStatGrid],
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
                            <m-card-stat
                                [label]="stat.label"
                                [value]="stat.value"
                                [trend]="stat.trend"
                                [color]="stat.color"
                            />
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
            '        <m-card-stat [label]="stat.label" [value]="stat.value" [trend]="stat.trend" [color]="stat.color" />',
            '    }',
            '</m-stat-grid>',
        ].join('\n')
    })
}
