import {ChangeDetectionStrategy, Component} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule} from '@angular/forms'
import {MInputUrl} from '@banzamel/mineralui-angular/inputs/input-url'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-url-protocols',
    imports: [MInputUrl, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack align="start">
            <!-- Only secure web links and git remotes; bare hosts get https:// on blur. -->
            <m-input-url
                label="Repository"
                placeholder="https://github.com/…"
                [formControl]="repo"
                [protocols]="['https', 'git', 'ssh']"
                formatOnBlur
            />
            <p mText size="sm" tone="muted">Value: {{ value() || '—' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputUrlProtocolsExample {
    protected readonly repo = new FormControl('', {nonNullable: true})
    protected readonly value = toSignal(this.repo.valueChanges, {initialValue: this.repo.value})
}
