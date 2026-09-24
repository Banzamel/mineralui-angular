import {ChangeDetectionStrategy, Component, computed} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MInputFile} from '@banzamel/mineralui-angular/inputs/input-file'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-file-form',
    imports: [MButton, MInputFile, MStack, MText, ReactiveFormsModule],
    template: `
        <form [formGroup]="application">
            <m-stack align="start">
                <m-input-file
                    label="CV"
                    accept=".pdf"
                    size="sm"
                    fullWidth
                    formControlName="cv"
                    [errorMessages]="{required: 'Attach your CV as a PDF'}"
                />
                <button mButton type="submit">Send application</button>
                <p mText size="sm" tone="muted">Files: {{ names() }} · status: {{ status() }}</p>
            </m-stack>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileFormExample {
    protected readonly application = new FormGroup({
        cv: new FormControl<readonly File[]>([], {nonNullable: true, validators: Validators.required}),
    })
    private readonly value = toSignal(this.application.controls.cv.valueChanges, {initialValue: []})
    protected readonly status = toSignal(this.application.statusChanges, {initialValue: this.application.status})
    protected readonly names = computed(
        () =>
            this.value()
                .map((file) => file.name)
                .join(', ') || 'none'
    )
}
