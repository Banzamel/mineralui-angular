import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MGhostText} from '@banzamel/mineralui-angular/utils'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-ghost-text-directive',
    imports: [MGhostText, MText],
    template: `
        <!-- The overlay is positioned against the field's parent. -->
        <div class="command">
            <input
                class="command-field"
                aria-label="Command"
                placeholder="Type a git command..."
                autocomplete="off"
                [mGhostText]="commands"
                [ghostMinChars]="1"
                (ghostAccept)="last.set($event)"
            />
        </div>
        <p mText size="sm" tone="muted">Last accepted: {{ last() || '—' }}</p>
    `,
    styles: `
        .command {
            position: relative;
            max-width: 360px;
        }
        .command-field {
            box-sizing: border-box;
            width: 100%;
            padding: 8px 12px;
            border: 1px solid var(--mineral-border);
            border-radius: var(--mineral-radius-md);
            background: var(--mineral-input-bg);
            color: var(--mineral-text);
            font:
                14px/1.4 ui-monospace,
                monospace;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhostTextDirectiveExample {
    protected readonly commands = ['git status', 'git stash', 'git switch', 'git commit', 'git checkout', 'git log']
    protected readonly last = signal('')
}
