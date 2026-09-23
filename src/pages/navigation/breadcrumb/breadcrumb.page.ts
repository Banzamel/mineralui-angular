import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MBreadcrumbItem} from '@banzamel/mineralui-angular/layout/breadcrumb'
import {MBreadcrumb} from '@banzamel/mineralui-angular/layout/breadcrumb'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import breadcrumbRouter from '@generated/examples/navigation/breadcrumb/breadcrumb-router'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SEPARATORS = {slash: '/', chevron: '>', dot: '•'} as const
type SeparatorName = keyof typeof SEPARATORS
const SEPARATOR_NAMES: readonly SeparatorName[] = ['slash', 'chevron', 'dot']

@Component({
    selector: 'doc-breadcrumb-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MBreadcrumb, MCode, MStack, MText],
    templateUrl: './breadcrumb.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbPage {
    protected readonly examples = {breadcrumbRouter}
    protected readonly items: readonly MBreadcrumbItem[] = [
        {label: 'Docs', href: '#'},
        {label: 'Navigation', href: '#'},
        {label: 'Breadcrumb', href: '#'},
        {label: 'Responsive patterns', href: '#'},
        {label: 'Current page'},
    ]

    protected readonly separatorName = signal<SeparatorName>('slash')
    protected readonly maxItemsValue = signal(0)
    protected readonly controls = [
        selectControl('separator', this.separatorName, SEPARATOR_NAMES),
        sliderControl('maxItems', this.maxItemsValue, {min: 0, max: 5}),
    ]

    protected readonly separator = computed(() => SEPARATORS[this.separatorName()])
    protected readonly maxItems = computed(() => this.maxItemsValue() || undefined)

    protected readonly code = computed(() => {
        const attrs = [
            '[items]="items"',
            this.separatorName() !== 'slash' ? `separator="${this.separator()}"` : '',
            this.maxItems() ? `[maxItems]="${this.maxItems()}"` : '',
        ].filter(Boolean)
        return [
            '<!-- items: MBreadcrumbItem[] = [',
            "    {label: 'Docs', href: '#'},",
            "    {label: 'Navigation', href: '#'},",
            "    {label: 'Breadcrumb', href: '#'},",
            "    {label: 'Current page'},",
            '] -->',
            `<nav mBreadcrumb ${attrs.join(' ')}></nav>`,
        ].join('\n')
    })
}
