import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MSimpleGridColumns} from '@banzamel/mineralui-angular/layout/simple-grid'
import {MSimpleGrid, mSimpleGridColumnValues} from '@banzamel/mineralui-angular/layout/simple-grid'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {CodeBlock} from '@kit/code-block/code-block'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLUMNS = mSimpleGridColumnValues.map(String)

const TILES = [
    {title: 'Portfolio card', description: 'Useful for equal-width previews, feature blocks and compact grids.'},
    {title: 'Documentation panel', description: 'Works well when every tile shares a similar visual weight.'},
    {title: 'Gallery tile', description: 'A lighter alternative to MGrid when custom spans are not needed.'},
    {title: 'Pricing option', description: 'Keeps the markup short for standard card-based sections.'},
] as const

const isColumns = (value: number): value is MSimpleGridColumns =>
    mSimpleGridColumnValues.some((columns) => columns === value)

@Component({
    selector: 'doc-simple-grid-page',
    imports: [
        CodeBlock,
        DocArticle,
        DocSection,
        DocPlayground,
        DocPropsTable,
        MCode,
        MSimpleGrid,
        MStack,
        MSurface,
        MText,
    ],
    templateUrl: './simple-grid.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleGridPage {
    protected readonly tiles = TILES
    protected readonly usage = [
        '<m-simple-grid [columns]="3">',
        '    @for (card of cards; track card.id) {',
        '        <app-card [card]="card" />',
        '    }',
        '</m-simple-grid>',
    ].join('\n')

    protected readonly columnsOption = signal('3')
    protected readonly controls = [selectControl('columns', this.columnsOption, COLUMNS)]

    protected readonly columns = computed<MSimpleGridColumns>(() => {
        const columns = Number(this.columnsOption())
        return isColumns(columns) ? columns : 3
    })

    protected readonly code = computed(() => {
        const columns = this.columns() === 2 ? '' : ` [columns]="${this.columns()}"`
        return [
            `<m-simple-grid${columns}>`,
            '    <div mSurface>',
            '        <p mText weight="semibold">Portfolio card</p>',
            '        <p mText tone="muted" size="sm">Useful for equal-width previews and simple content grids.</p>',
            '    </div>',
            '</m-simple-grid>',
        ].join('\n')
    })
}
