import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MToastService} from '@banzamel/mineralui-angular/feedback/toast'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'
import {MSelect} from '@banzamel/mineralui-angular/dropdowns/select'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MModal, MModalContent, MModalFooter} from '@banzamel/mineralui-angular/overlays/modal'

@Component({
    selector: 'app-modal-form',
    imports: [MButton, MInput, MInline, MModal, MModalContent, MModalFooter, MSelect, MStack],
    template: `
        <button mButton (click)="open.set(true)">Rename project</button>

        <m-modal
            [(open)]="open"
            heading="Rename project"
            description="The new name shows up for the whole team."
            size="sm"
        >
            <ng-template mModalContent>
                <m-stack spacing="md">
                    <m-input label="Project name" autoFocus [(value)]="name" />
                    <m-select label="Visibility" fullWidth [options]="visibilities" [(value)]="visibility" />
                </m-stack>
            </ng-template>
            <m-inline mModalFooter justify="end">
                <button mButton variant="ghost" (click)="open.set(false)">Cancel</button>
                <button mButton (click)="save()">Save</button>
            </m-inline>
        </m-modal>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFormExample {
    protected readonly open = signal(false)
    protected readonly name = signal('Mineral docs')
    protected readonly visibility = signal<string | null>('team')
    protected readonly visibilities = [
        {value: 'private', label: 'Only me'},
        {value: 'team', label: 'Team'},
        {value: 'public', label: 'Everyone with the link'},
    ]

    private readonly toast = inject(MToastService)

    protected save(): void {
        this.toast.show({title: `Renamed to “${this.name()}”`, color: 'success'})
        this.open.set(false)
    }
}
