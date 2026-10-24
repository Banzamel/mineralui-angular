import {ChangeDetectionStrategy, Component, ElementRef, signal, viewChild} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MCheckbox} from '@banzamel/mineralui-angular/controls/checkbox'
import {MPopover, MPopoverTrigger} from '@banzamel/mineralui-angular/primitives/popover'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-popover-focus',
    imports: [MButton, MCheckbox, MPopover, MPopoverTrigger, MText],
    template: `
        <div class="row">
            <button mButton color="error" variant="outlined" [mPopoverTrigger]="confirm">Delete file</button>

            <!-- Focus starts on the safe action. On a component host (mButton) a template reference is the
                 component, so the element comes from viewChild with read: ElementRef. -->
            <m-popover
                #confirm
                role="dialog"
                aria-label="Delete file?"
                [initialFocus]="cancelButton() ?? 'first'"
                [restoreFocus]="restoreFocus()"
            >
                <div class="confirm">
                    <p mText size="sm">Delete report.pdf? This cannot be undone.</p>
                    <div class="actions">
                        <button #cancel mButton size="sm" variant="ghost" (click)="confirm.open.set(false)">
                            Cancel
                        </button>
                        <button mButton size="sm" color="error" (click)="confirm.open.set(false)">Delete</button>
                    </div>
                </div>
            </m-popover>
        </div>

        <m-checkbox [(checked)]="restoreFocus">Return focus to the button on close (restoreFocus)</m-checkbox>
    `,
    styles: `
        .row {
            margin-bottom: 12px;
        }
        .confirm {
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-width: 260px;
            padding: 16px;
        }
        .actions {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverFocusExample {
    protected readonly restoreFocus = signal(true)
    protected readonly cancelButton = viewChild('cancel', {read: ElementRef<HTMLElement>})
}
