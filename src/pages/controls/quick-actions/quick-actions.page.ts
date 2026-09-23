import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MButtonVariant} from '@banzamel/mineralui-angular/controls/button'
import type {MButtonGroupOrientation} from '@banzamel/mineralui-angular/controls/button-group'
import {MQuickActions} from '@banzamel/mineralui-angular/controls/quick-actions'
import type {MQuickActionItem, MQuickActionsLayout} from '@banzamel/mineralui-angular/controls/quick-actions'
import {mCalendarIcon, mChartIcon, mUsersIcon} from '@banzamel/mineralui-angular/icons'
import type {MSimpleGridColumns} from '@banzamel/mineralui-angular/layout/simple-grid'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import quickActionsGrid from '@generated/examples/controls/quick-actions/quick-actions-grid'
import quickActionsItems from '@generated/examples/controls/quick-actions/quick-actions-items'
import quickActionsProjected from '@generated/examples/controls/quick-actions/quick-actions-projected'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const LAYOUTS: readonly MQuickActionsLayout[] = ['group', 'grid']
const ORIENTATIONS: readonly MButtonGroupOrientation[] = ['horizontal', 'vertical']
const COLUMNS = ['1', '2', '3', '4'] as const
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const VARIANTS: readonly MButtonVariant[] = ['filled', 'secondary', 'outlined', 'ghost']

const ITEMS: readonly MQuickActionItem[] = [
    {
        key: 'calendar',
        label: 'Open calendar',
        icon: mCalendarIcon,
        color: 'info',
        badge: 'Now',
        badgeColor: 'news',
        badgePulsing: true,
    },
    {key: 'families', label: 'Families', icon: mUsersIcon, color: 'primary', badge: 3, badgeColor: 'warning'},
    {key: 'reports', label: 'Reports', icon: mChartIcon, color: 'success', pulsing: true},
]

@Component({
    selector: 'doc-quick-actions-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MQuickActions],
    template: `
        <doc-article
            title="MQuickActions"
            description="Shortcut layer for button groups and mini action panels with badges, pulsing alerts and shared styling."
        >
            <doc-section
                title="Playground"
                description="Replace hand-built action clusters with one shared primitive for dashboard shortcuts."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-quick-actions
                        aria-label="Playground"
                        [items]="items"
                        [layout]="layout()"
                        [orientation]="orientation()"
                        [columns]="columnCount()"
                        [size]="size()"
                        [variant]="variant()"
                        [fullWidth]="fullWidth()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Items and the action output"
                description="Describe actions as data — label, icon, color, badge, pulsing, disabled — and handle clicks in (action), which emits the clicked item. An item with href renders a link."
            >
                <doc-preview [example]="examples.quickActionsItems" />
            </doc-section>

            <doc-section
                title="Grid"
                description='layout="grid" places the buttons in an MSimpleGrid with 1–4 columns; grid buttons always fill their cell.'
            >
                <doc-preview [example]="examples.quickActionsGrid" />
            </doc-section>

            <doc-section
                title="Projected buttons"
                description="For router links or custom handlers, project mButton elements: they inherit variant, size, color and fullWidth through M_BUTTON_GROUP, and their own inputs still win."
            >
                <doc-preview [example]="examples.quickActionsProjected" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MQuickActions" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickActionsPage {
    protected readonly examples = {quickActionsGrid, quickActionsItems, quickActionsProjected}
    protected readonly items = ITEMS

    protected readonly layout = signal<MQuickActionsLayout>('group')
    protected readonly orientation = signal<MButtonGroupOrientation>('horizontal')
    protected readonly columns = signal<(typeof COLUMNS)[number]>('4')
    protected readonly size = signal<MSize>('sm')
    protected readonly variant = signal<MButtonVariant>('ghost')
    protected readonly fullWidth = signal(true)

    protected readonly controls = [
        selectControl('layout', this.layout, LAYOUTS),
        selectControl('orientation', this.orientation, ORIENTATIONS),
        selectControl('columns', this.columns, COLUMNS),
        selectControl('size', this.size, SIZES),
        selectControl('variant', this.variant, VARIANTS),
        booleanControl('fullWidth', this.fullWidth),
    ]

    protected readonly columnCount = computed<MSimpleGridColumns>(() => {
        const columns = Number(this.columns())
        return columns === 1 || columns === 2 || columns === 3 ? columns : 4
    })

    protected readonly code = computed(() => {
        const grid = this.layout() === 'grid'
        const attrs = [
            '[items]="items"',
            grid && 'layout="grid"',
            grid && this.columns() !== '4' && `[columns]="${this.columns()}"`,
            !grid && this.orientation() !== 'horizontal' && `orientation="${this.orientation()}"`,
            this.size() !== 'sm' && `size="${this.size()}"`,
            this.variant() !== 'ghost' && `variant="${this.variant()}"`,
            !this.fullWidth() && '[fullWidth]="false"',
            '(action)="run($event)"',
        ].filter((attr) => typeof attr === 'string')

        return `<m-quick-actions ${attrs.join(' ')} />`
    })
}
