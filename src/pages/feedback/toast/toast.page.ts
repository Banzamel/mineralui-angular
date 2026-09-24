import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MToastService} from '@banzamel/mineralui-angular/feedback/toast'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import toastTemplate from '@generated/examples/feedback/toast/toast-template'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['info', 'success', 'warning', 'error', 'primary', 'neutral', 'light', 'dark', 'news']

@Component({
    selector: 'doc-toast-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MButton, MCode, MList, MListItem],
    template: `
        <doc-article
            title="MToast"
            description="Non-blocking notifications that appear for a moment and dismiss themselves. Inject MToastService and call show() — there is no element to place in your templates."
        >
            <doc-section
                title="Playground"
                description="Toggle inputs and fire a toast. Switching the message off shows the title-only form."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <button mButton (click)="fire()">Show toast</button>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Template message"
                description="message also takes a TemplateRef — for links or an Undo button. Its context holds the toast ($implicit) and dismiss()."
            >
                <doc-preview [example]="examples.toastTemplate" />
            </doc-section>

            <doc-section title="Behaviour">
                <ul mList>
                    <li mListItem>
                        The first <code mCode>show()</code> mounts the stack into <code mCode>&lt;body&gt;</code>, in
                        the browser's top layer — toasts stay visible above an open modal. On the server
                        <code mCode>show()</code> renders nothing.
                    </li>
                    <li mListItem>
                        The timer pauses while the pointer is over a toast or focus is inside it, so there is time to
                        read it or reach its buttons. <code mCode>duration</code> of 0 keeps the toast until it is
                        closed.
                    </li>
                    <li mListItem>
                        New toasts are announced by screen readers through live regions that exist before the first
                        toast; <code mCode>error</code> toasts are announced assertively.
                    </li>
                    <li mListItem>
                        Position and default duration:
                        <code mCode>provideMineralToast(&#123;position, duration&#125;)</code> in your app config
                        (optional; default <code mCode>top-right</code>, 4000 ms). Bottom toasts lift above an
                        <code mCode>mFooter</code>.
                    </li>
                    <li mListItem>
                        Migrating from React: <code mCode>&lt;MToastProvider position&gt;</code> →
                        <code mCode>provideMineralToast(&#123;position&#125;)</code>,
                        <code mCode>useMToast().toast(…)</code> → <code mCode>inject(MToastService).show(…)</code>.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="MToastService API">
                <doc-props-table api="MToastService" />
            </doc-section>

            <doc-section title="Toast options">
                <doc-props-table api="MToastOptions" />
            </doc-section>

            <doc-section title="Configuration">
                <doc-props-table api="feedback/toast/toast.provider" />
                <doc-props-table api="MToastConfig" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastPage {
    protected readonly examples = {toastTemplate}

    private readonly toast = inject(MToastService)

    protected readonly color = signal<MColor>('success')
    protected readonly withMessage = signal(true)
    protected readonly duration = signal(4000)
    protected readonly controls = [
        selectControl('color', this.color, COLORS),
        booleanControl('message', this.withMessage),
        sliderControl('duration', this.duration, {min: 0, max: 10000, step: 1000}),
    ]

    protected readonly code = computed(() => {
        const options = [
            "title: 'Changes saved'",
            this.withMessage() ? "message: 'Your changes have been saved successfully.'" : '',
            this.color() !== 'info' ? `color: '${this.color()}'` : '',
            this.duration() !== 4000 ? `duration: ${this.duration()}` : '',
        ].filter((part) => part !== '')
        return `private readonly toast = inject(MToastService)\n\nthis.toast.show({${options.join(', ')}})`
    })

    protected fire(): void {
        this.toast.show({
            title: 'Changes saved',
            message: this.withMessage() ? 'Your changes have been saved successfully.' : undefined,
            color: this.color(),
            duration: this.duration(),
        })
    }
}
