import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MPortal} from '@banzamel/mineralui-angular/primitives/portal'

@Component({
    selector: 'app-portal-basic',
    imports: [MButton, MPortal],
    template: `
        <button mButton variant="outlined" (click)="shown.set(!shown())">
            {{ shown() ? 'Hide' : 'Show' }} corner note
        </button>

        @if (shown()) {
            <!-- Rendered into document.body, still bound to this component. -->
            <ng-template mPortal>
                <aside class="corner-note" role="status">
                    Rendered in document.body — clicked {{ clicks() }} times.
                    <button mButton size="sm" variant="ghost" (click)="clicks.set(clicks() + 1)">Count</button>
                </aside>
            </ng-template>
        }
    `,
    styles: `
        .corner-note {
            position: fixed;
            right: 24px;
            bottom: 24px;
            z-index: 10;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 16px;
            border: 1px solid var(--mineral-popover-border);
            border-radius: var(--mineral-radius-md);
            background: var(--mineral-popover-bg);
            box-shadow: var(--mineral-popover-shadow);
            color: var(--mineral-text);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalBasicExample {
    protected readonly shown = signal(false)
    protected readonly clicks = signal(0)
}
