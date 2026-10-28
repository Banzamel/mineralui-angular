import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'
import {MInputIBAN} from '@banzamel/mineralui-angular/inputs/input-iban'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-copyable',
    imports: [MInput, MInputIBAN, MStack, MText],
    template: `
        <m-stack align="start">
            <m-input
                label="Invite link"
                readOnly
                copyable
                copyLabel="Copy the invite link"
                value="https://example.com/join/7KQ2-M9XA"
                (copied)="last.set($event)"
            />
            <m-input-iban label="Account" readOnly copyable value="PL61109010140000071219812874" />
            <p mText size="sm" tone="muted">Last copied: {{ last() || '—' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCopyableExample {
    protected readonly last = signal('')
}
