import {ChangeDetectionStrategy, Component, signal, viewChild} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MTextarea} from '@banzamel/mineralui-angular/inputs/textarea'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-textarea-caret',
    imports: [MButton, MInline, MStack, MTextarea],
    template: `
        <m-stack align="start">
            <m-textarea label="Message template" fullWidth [rows]="4" [(value)]="message" />
            <m-inline>
                @for (token of tokens; track token) {
                    <button mButton size="sm" variant="outlined" (click)="insert(token)">Insert {{ token }}</button>
                }
            </m-inline>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaCaretExample {
    protected readonly tokens = ['{name}', '{date}', '{venue}']
    protected readonly message = signal('Hi , see you on  at .')
    private readonly textarea = viewChild.required(MTextarea)

    // fieldElement() is the native <textarea>: insert at the caret (or over the selection), then report the edit
    // like typing does, so the model and a bound form control follow.
    protected insert(token: string): void {
        const field = this.textarea().fieldElement()
        field.setRangeText(token, field.selectionStart, field.selectionEnd, 'end')
        field.dispatchEvent(new Event('input', {bubbles: true}))
        field.focus()
    }
}
