import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MTextarea} from '@banzamel/mineralui-angular/inputs/textarea'

@Component({
    selector: 'app-textarea-auto-resize',
    imports: [MTextarea, ReactiveFormsModule],
    template: `
        <!-- Grows from 2 to 6 rows, then scrolls. -->
        <m-textarea
            label="Release notes"
            placeholder="Type a few lines..."
            [formControl]="notes"
            autoResize
            [minRows]="2"
            [maxRows]="6"
            [maxLength]="500"
            showCharCount
            fullWidth
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaAutoResizeExample {
    protected readonly notes = new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(500)],
    })
}
