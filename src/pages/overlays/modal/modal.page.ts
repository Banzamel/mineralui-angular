import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MModal, MModalFooter} from '@banzamel/mineralui-angular/overlays/modal'
import type {MModalSize} from '@banzamel/mineralui-angular/overlays/modal'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import modalForm from '@generated/examples/overlays/modal/modal-form'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SIZES: readonly MModalSize[] = ['sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-modal-page',
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
        MModal,
        MModalFooter,
        MStack,
        MText,
    ],
    template: `
        <doc-article
            title="MModal"
            description="Blocking overlay for dense details, confirmations and mobile-friendly drilldown flows."
        >
            <doc-section title="Playground" description="Toggle inputs and open the modal to test combinations.">
                <doc-playground [controls]="controls" [code]="code()">
                    <button mButton size="sm" (click)="open.set(true)">Open modal</button>
                    <m-modal
                        [(open)]="open"
                        [heading]="withHeading() ? 'Release checklist' : undefined"
                        [description]="
                            withDescription() ? 'Confirm the visual pass before publishing the package.' : undefined
                        "
                        ariaLabel="Release checklist"
                        [size]="size()"
                        [closeOnBackdrop]="closeOnBackdrop()"
                        [closeOnEscape]="closeOnEscape()"
                    >
                        <m-stack>
                            <p mText>Verify docs coverage for new exports.</p>
                            <p mText>Run the framework build and smoke-check the website preview.</p>
                            <p mText>Publish only after the documented release is verified.</p>
                        </m-stack>
                        @if (withFooter()) {
                            <button mButton mModalFooter (click)="open.set(false)">Close</button>
                        }
                    </m-modal>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Form, lazy content and focus"
                description="Content in <ng-template mModalContent> exists only while the modal is open. Focus starts on the field marked autoFocus (or autofocus); Save shows a toast above the open modal."
            >
                <doc-preview [example]="examples.modalForm" />
            </doc-section>

            <doc-section title="Behaviour">
                <ul mList>
                    <li mListItem>
                        The modal is a native <code mCode>&lt;dialog&gt;</code> opened with
                        <code mCode>showModal()</code>: it sits in the browser's top layer, the rest of the page is
                        inert (Tab cannot leave the modal) and the page does not scroll.
                    </li>
                    <li mListItem>
                        Focus moves to the element with <code mCode>autofocus</code>, otherwise to the panel, and
                        returns to the element that had it (usually the trigger) after closing.
                    </li>
                    <li mListItem>
                        <strong>Escape</strong> closes the topmost layer only — a popover inside the modal closes first.
                    </li>
                    <li mListItem>
                        <code mCode>(closed)</code> reports why the modal closed itself: <code mCode>escape</code> or
                        <code mCode>backdrop</code>. Setting <code mCode>open</code> to
                        <code mCode>false</code> yourself emits nothing.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="Differences from MineralUI for React">
                <ul mList>
                    <li mListItem>
                        <code mCode>open</code> + <code mCode>onClose</code> → <code mCode>[(open)]</code> and
                        <code mCode>(closed)</code>; <code mCode>title</code> → <code mCode>heading</code>;
                        <code mCode>footer</code> → an element with <code mCode>mModalFooter</code>.
                    </li>
                    <li mListItem>
                        React keeps focus on the page behind the modal and lets Tab wander out of it; the Angular modal
                        traps focus, starts it inside and restores it on close (WAI-ARIA dialog pattern). The
                        description is announced as the dialog's description.
                    </li>
                    <li mListItem>
                        The modal renders where you place it, not in a portal: the top layer puts it above everything,
                        and a local <code mCode>[mTheme]</code> around it applies.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MModal" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalPage {
    protected readonly examples = {modalForm}

    protected readonly open = signal(false)
    protected readonly size = signal<MModalSize>('md')
    protected readonly withHeading = signal(true)
    protected readonly withDescription = signal(true)
    protected readonly withFooter = signal(true)
    protected readonly closeOnBackdrop = signal(true)
    protected readonly closeOnEscape = signal(true)
    protected readonly controls = [
        selectControl('size', this.size, SIZES),
        booleanControl('heading', this.withHeading),
        booleanControl('description', this.withDescription),
        booleanControl('footer', this.withFooter),
        booleanControl('closeOnBackdrop', this.closeOnBackdrop),
        booleanControl('closeOnEscape', this.closeOnEscape),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '[(open)]="open"',
            this.withHeading() ? 'heading="Release checklist"' : 'ariaLabel="Release checklist"',
            this.withDescription() && 'description="Confirm the visual pass before publishing."',
            this.size() !== 'md' && `size="${this.size()}"`,
            !this.closeOnBackdrop() && '[closeOnBackdrop]="false"',
            !this.closeOnEscape() && '[closeOnEscape]="false"',
        ].filter((attr) => attr !== false)
        const footer = this.withFooter()
            ? '\n    <button mButton mModalFooter (click)="open.set(false)">Close</button>'
            : ''
        return `<button mButton (click)="open.set(true)">Open modal</button>

<m-modal
    ${attrs.join('\n    ')}
>
    <p mText>Modal content here.</p>${footer}
</m-modal>`
    })
}
