import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MTextarea} from '@banzamel/mineralui-angular/inputs/textarea'

@Component({
    selector: 'app-ghost-text-textarea',
    imports: [MTextarea],
    template: `
        <m-textarea
            label="Reply"
            placeholder="Start with a greeting..."
            helperText='Try "Tha" or "Hel", then press Tab'
            [(value)]="reply"
            [ghostOptions]="phrases"
            fullWidth
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhostTextTextareaExample {
    protected readonly phrases = [
        'Thank you for reaching out!',
        'Thanks, that works for me.',
        'Hello, and thanks for the quick reply.',
        'Hi team, a short update:',
    ]
    protected readonly reply = signal('')
}
