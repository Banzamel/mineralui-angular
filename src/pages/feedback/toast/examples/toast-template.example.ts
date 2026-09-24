import {ChangeDetectionStrategy, Component, inject, signal, viewChild} from '@angular/core'
import type {TemplateRef} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MToastService} from '@banzamel/mineralui-angular/feedback/toast'
import type {MToastContext} from '@banzamel/mineralui-angular/feedback/toast'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-toast-template',
    imports: [MButton, MText],
    template: `
        <button mButton variant="outlined" (click)="archive()">Archive conversation</button>
        <p mText size="sm" tone="muted">Archived: {{ archived() ? 'yes' : 'no' }}</p>

        <!-- The template context gives the toast and dismiss(). -->
        <ng-template #undo let-dismiss="dismiss">
            The conversation moved to the archive.
            <button mButton variant="link" size="xs" (click)="restore(); dismiss()">Undo</button>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastTemplateExample {
    private readonly toast = inject(MToastService)
    private readonly undo = viewChild.required<TemplateRef<MToastContext>>('undo')
    protected readonly archived = signal(false)

    protected archive(): void {
        this.archived.set(true)
        this.toast.show({title: 'Archived', message: this.undo(), color: 'neutral', duration: 8000})
    }

    protected restore(): void {
        this.archived.set(false)
    }
}
