import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MToastService} from '@banzamel/mineralui-angular/feedback/toast'
import {mWarningIcon} from '@banzamel/mineralui-angular/icons'
import {MPopconfirm} from '@banzamel/mineralui-angular/overlays/popconfirm'
import {MPopoverTrigger} from '@banzamel/mineralui-angular/primitives/popover'
import type {MPopoverPlacement} from '@banzamel/mineralui-angular/primitives/popover'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['warning', 'error', 'primary', 'success', 'info', 'neutral']
const PLACEMENTS: readonly MPopoverPlacement[] = ['top-start', 'top-end', 'bottom-start', 'bottom-end']

@Component({
    selector: 'doc-popconfirm-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPropsTable,
        MButton,
        MCode,
        MList,
        MListItem,
        MPopconfirm,
        MPopoverTrigger,
    ],
    template: `
        <doc-article
            title="MPopconfirm"
            description="A confirmation popover that asks the user to confirm an action before proceeding."
        >
            <doc-section title="Playground" description="Open it, then answer with the mouse or the keyboard.">
                <doc-playground [controls]="controls" [code]="code()">
                    <button mButton [color]="color()" [mPopoverTrigger]="confirm">Delete item</button>
                    <m-popconfirm
                        #confirm
                        heading="Delete this item?"
                        [description]="withDescription() ? 'This action cannot be undone.' : undefined"
                        [color]="color()"
                        [placement]="placement()"
                        [icon]="withIcon() ? warningIcon : undefined"
                        (confirmed)="notify('Deleted', 'success')"
                        (cancelled)="notify('Cancelled', 'neutral')"
                    />
                </doc-playground>
            </doc-section>

            <doc-section title="Behaviour">
                <ul mList>
                    <li mListItem>
                        Open it with <code mCode>[mPopoverTrigger]</code> on any button; the trigger gets
                        <code mCode>aria-expanded</code>, <code mCode>aria-controls</code> and
                        <code mCode>aria-haspopup="dialog"</code>.
                    </li>
                    <li mListItem>
                        An <code mCode>alertdialog</code> named by the heading and described by the description. Focus
                        starts on the cancel button (the safer choice) and returns to the trigger.
                    </li>
                    <li mListItem>
                        <code mCode>(confirmed)</code> for the confirm button; <code mCode>(cancelled)</code> for the
                        cancel button, Escape, a click outside, Tab away and the trigger.
                    </li>
                    <li mListItem>
                        Default button labels come from i18n: <code mCode>mineralui.popconfirm.confirm</code> ("Yes"),
                        <code mCode>mineralui.popconfirm.cancel</code> ("No").
                    </li>
                </ul>
            </doc-section>

            <doc-section title="Differences from MineralUI for React">
                <ul mList>
                    <li mListItem>
                        <code mCode>open</code> + <code mCode>onOpenChange</code> + <code mCode>anchorRef</code> →
                        <code mCode>[mPopoverTrigger]</code> (or <code mCode>[(open)]</code>);
                        <code mCode>onConfirm</code> / <code mCode>onCancel</code> → <code mCode>(confirmed)</code> /
                        <code mCode>(cancelled)</code>; <code mCode>title</code> → <code mCode>heading</code>;
                        <code mCode>icon</code> takes an icon constant.
                    </li>
                    <li mListItem>
                        React keeps focus on the trigger, so a keyboard user cannot reach the buttons, and gives the
                        popover a listbox role.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MPopconfirm" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopconfirmPage {
    protected readonly warningIcon = mWarningIcon
    private readonly toast = inject(MToastService)

    protected readonly color = signal<MColor>('warning')
    protected readonly placement = signal<MPopoverPlacement>('top-start')
    protected readonly withDescription = signal(true)
    protected readonly withIcon = signal(true)
    protected readonly controls = [
        selectControl('color', this.color, COLORS),
        selectControl('placement', this.placement, PLACEMENTS),
        booleanControl('description', this.withDescription),
        booleanControl('icon', this.withIcon),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '#confirm',
            'heading="Delete this item?"',
            this.withDescription() && 'description="This action cannot be undone."',
            this.color() !== 'warning' && `color="${this.color()}"`,
            this.placement() !== 'top-start' && `placement="${this.placement()}"`,
            this.withIcon() && '[icon]="warningIcon"',
            '(confirmed)="delete()"',
        ].filter((attr) => attr !== false)
        return `<button mButton [mPopoverTrigger]="confirm">Delete item</button>

<m-popconfirm
    ${attrs.join('\n    ')}
/>`
    })

    protected notify(title: string, color: MColor): void {
        this.toast.show({title, color, duration: 1600})
    }
}
