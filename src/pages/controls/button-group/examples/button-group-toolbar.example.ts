import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MButtonGroup} from '@banzamel/mineralui-angular/controls/button-group'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const ALIGNMENTS = ['Left', 'Center', 'Right'] as const

@Component({
    selector: 'app-button-group-toolbar',
    imports: [MButton, MButtonGroup, MStack, MText],
    template: `
        <m-stack>
            <!-- A single-choice row: active shows the selection, aria-pressed announces it. -->
            <m-button-group variant="outlined" color="neutral" aria-label="Text alignment">
                @for (option of alignments; track option) {
                    <button
                        mButton
                        [active]="alignment() === option"
                        [attr.aria-pressed]="alignment() === option"
                        (click)="alignment.set(option)"
                    >
                        {{ option }}
                    </button>
                }
            </m-button-group>
            <p mText size="sm" tone="muted">Alignment: {{ alignment() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupToolbarExample {
    protected readonly alignments = ALIGNMENTS
    protected readonly alignment = signal<(typeof ALIGNMENTS)[number]>('Left')
}
