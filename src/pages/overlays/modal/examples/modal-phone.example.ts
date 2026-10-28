import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MModal, MModalFooter} from '@banzamel/mineralui-angular/overlays/modal'
import {MText} from '@banzamel/mineralui-angular/typography/text'

// Full screen at 768 px and below; footer actions end-aligned, stacked with the primary (last) on top on a phone.
@Component({
    selector: 'app-modal-phone',
    imports: [MButton, MModal, MModalFooter, MStack, MText],
    template: `
        <button mButton (click)="open.set(true)">Open competition</button>

        <m-modal
            [(open)]="open"
            heading="Spring regional cup"
            description="Saturday, 14 March · City sports hall"
            fullscreenBelow="md"
        >
            <m-stack>
                @for (round of rounds; track round) {
                    <p mText>{{ round }}</p>
                }
            </m-stack>
            <div mModalFooter="actions">
                <button mButton variant="ghost" (click)="open.set(false)">Later</button>
                <button mButton (click)="open.set(false)">Register</button>
            </div>
        </m-modal>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalPhoneExample {
    protected readonly open = signal(false)
    protected readonly rounds = Array.from(
        {length: 18},
        (_, index) => `Round ${index + 1} — qualification heats, results posted after each group.`
    )
}
