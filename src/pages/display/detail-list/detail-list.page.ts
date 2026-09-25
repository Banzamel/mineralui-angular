import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MDetailList, MDetailListStatus} from '@banzamel/mineralui-angular/display/detail-list'
import type {MDetailListItem} from '@banzamel/mineralui-angular/display/detail-list'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import detailListLinks from '@generated/examples/display/detail-list/detail-list-links'
import detailListProfile from '@generated/examples/display/detail-list/detail-list-profile'
import detailListSizes from '@generated/examples/display/detail-list/detail-list-sizes'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-detail-list-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MBadge, MDetailList, MDetailListStatus],
    template: `
        <doc-article
            title="MDetailList"
            description="Description list for key / value facts — profile details, billing summaries, contact metadata, the details pane of a drawer or modal. Each row pairs a muted label with an optional bold value, a helper line and a right-aligned status."
        >
            <doc-section
                title="Playground"
                description="Use it instead of rebuilding the same label / value / status stack every time a detail pane needs metadata."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-detail-list
                        class="doc-detail-list-stage"
                        [items]="items"
                        [size]="size()"
                        [bordered]="bordered()"
                    >
                        <ng-template mDetailListStatus="family"><m-badge size="sm">Invoice</m-badge></ng-template>
                        <ng-template mDetailListStatus="amount">
                            <m-badge color="warning" size="sm">Due today</m-badge>
                        </ng-template>
                    </m-detail-list>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Size scale"
                description="size follows the shared xs–xl axis: the label is one step smaller than the value, and the row padding scales with it — a tight sidebar (sm) and a hero summary (xl) use the same component."
            >
                <doc-preview [example]="examples.sizes" />
            </doc-section>

            <doc-section
                title="Rich values — icons, badges, helper text and status"
                description='Item fields are plain strings. For markup, add ng-template mDetailListValue / mDetailListStatus: keyed (mDetailListValue="email") for one row, or without a key for every row. Statuses are right-aligned, so badges line up across rows.'
            >
                <doc-preview [example]="examples.profile" />
            </doc-section>

            <doc-section
                title="Link items"
                description="Set href (with target / rel) and the value becomes an a[mLink] — same row layout, just a clickable value. For router links, render your own anchor in a keyed mDetailListValue template."
            >
                <doc-preview [example]="examples.links" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The list is a real <dl>: each row is a <div> with a <dt> term and <dd> descriptions (value, helper, status), so screen readers announce the pairs. When items is empty, the content of the [mDetailListEmpty] slot is shown instead."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="React renders divs and takes ReactNode in every field; here fields are strings and markup goes through mDetailListValue / mDetailListStatus templates. component / to are gone (router links via a template), and emptyState is the [mDetailListEmpty] slot."
            />

            <doc-section title="API">
                <doc-props-table api="MDetailList" />
                <doc-props-table api="MDetailListValue" />
                <doc-props-table api="MDetailListStatus" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-detail-list-stage {
            max-width: 480px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailListPage {
    protected readonly examples = {links: detailListLinks, profile: detailListProfile, sizes: detailListSizes}

    protected readonly items: readonly MDetailListItem[] = [
        {key: 'family', label: 'Family', value: 'Kowalski family'},
        {key: 'amount', label: 'Amount', value: '640 PLN', helperText: 'Due on 30 Apr 2026'},
        {key: 'owner', label: 'Owner', value: 'Anna Kowalska'},
    ]

    protected readonly size = signal<MSize>('md')
    protected readonly bordered = signal(true)
    protected readonly controls = [selectControl('size', this.size, SIZES), booleanControl('bordered', this.bordered)]

    protected readonly code = computed(() => {
        const attrs = [
            '[items]="items"',
            this.size() !== 'md' && `size="${this.size()}"`,
            !this.bordered() && '[bordered]="false"',
        ].filter((attr) => typeof attr === 'string')
        return [
            `<m-detail-list ${attrs.join(' ')}>`,
            '    <ng-template mDetailListStatus="family"><m-badge size="sm">Invoice</m-badge></ng-template>',
            '    <ng-template mDetailListStatus="amount"><m-badge color="warning" size="sm">Due today</m-badge></ng-template>',
            '</m-detail-list>',
        ].join('\n')
    })
}
