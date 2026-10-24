import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MModal} from '@banzamel/mineralui-angular/overlays/modal'

@Component({
    selector: 'app-delete-dialog',
    imports: [MButton, MModal],
    template: `
        <button mButton color="error" (click)="open.set(true)">Delete</button>
        <!-- open = model(): Escape and the backdrop write false back; title → heading, footer → slot. -->
        <m-modal [(open)]="open" heading="Delete project?">
            The project and its files are removed for good.
            <button mButton mModalFooter color="error" (click)="open.set(false)">Delete</button>
        </m-modal>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialog {
    protected readonly open = signal(false)
}
