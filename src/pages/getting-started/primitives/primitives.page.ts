import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import type {MPopoverPlacement} from '@banzamel/mineralui-angular/primitives/popover'
import {MPopover, MPopoverContent, MPopoverTrigger} from '@banzamel/mineralui-angular/primitives/popover'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import popoverNested from '@generated/examples/getting-started/primitives/popover-nested'
import popoverTrigger from '@generated/examples/getting-started/primitives/popover-trigger'
import portalBasic from '@generated/examples/getting-started/primitives/portal-basic'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const PLACEMENTS: readonly MPopoverPlacement[] = [
    'bottom-start',
    'bottom-end',
    'top-start',
    'top-end',
    'right-start',
    'right-end',
    'left-start',
    'left-end',
]

@Component({
    selector: 'doc-primitives-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MButton,
        MCode,
        MList,
        MListItem,
        MPopover,
        MPopoverContent,
        MPopoverTrigger,
        MText,
    ],
    templateUrl: './primitives.page.html',
    styles: `
        .doc-popover-demo {
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-width: 280px;
            padding: 16px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimitivesPage {
    protected readonly examples = {popoverTrigger, popoverNested, portalBasic}

    protected readonly placement = signal<MPopoverPlacement>('bottom-start')
    protected readonly matchWidth = signal(false)
    protected readonly offset = signal(4)

    protected readonly controls = [
        selectControl('placement', this.placement, PLACEMENTS),
        booleanControl('matchWidth', this.matchWidth),
        sliderControl('offset', this.offset, {min: 0, max: 24, step: 2}),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '#pop',
            'role="dialog"',
            'aria-label="Popover demo"',
            this.placement() !== 'bottom-start' && `placement="${this.placement()}"`,
            this.matchWidth() && 'matchWidth',
            this.offset() !== 4 && `[offset]="${this.offset()}"`,
        ].filter((attr) => typeof attr === 'string')
        return [
            '<button mButton [mPopoverTrigger]="pop">Toggle popover</button>',
            `<m-popover\n    ${attrs.join('\n    ')}\n>`,
            '    <ng-template mPopoverContent>Popover content</ng-template>',
            '</m-popover>',
        ].join('\n')
    })
}
