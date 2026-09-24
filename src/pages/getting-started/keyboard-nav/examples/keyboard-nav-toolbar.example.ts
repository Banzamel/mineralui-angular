import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {MKeyboardNav, MKeyboardNavItem} from '@banzamel/mineralui-angular/utils'

@Component({
    selector: 'app-keyboard-nav-toolbar',
    imports: [MButton, MKeyboardNav, MKeyboardNavItem, MText],
    template: `
        <!-- Roving tabindex: one Tab stop for the whole toolbar, ← / → move between the buttons. -->
        <div
            class="toolbar"
            role="toolbar"
            aria-label="Text formatting"
            mKeyboardNav
            orientation="horizontal"
            (itemActivated)="run(actions[$event])"
        >
            @for (action of actions; track action) {
                <button
                    mButton
                    variant="outlined"
                    size="sm"
                    mKeyboardNavItem
                    [disabled]="action === 'Strike'"
                    (click)="run(action)"
                >
                    {{ action }}
                </button>
            }
        </div>
        <p mText size="sm" tone="muted">Last action: {{ last() }}</p>
    `,
    styles: `
        .toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardNavToolbarExample {
    protected readonly actions = ['Bold', 'Italic', 'Strike', 'Underline', 'Code']
    protected readonly last = signal('—')

    protected run(action: string | undefined): void {
        if (action) this.last.set(action)
    }
}
