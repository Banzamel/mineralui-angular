import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import type {MModePreference} from '@banzamel/mineralui-angular/theme'
import {MThemeService} from '@banzamel/mineralui-angular/theme'

@Component({
    selector: 'app-theme-mode',
    template: `
        <div role="group" aria-label="Color mode">
            @for (mode of modes; track mode) {
                <button type="button" [attr.aria-pressed]="theme.mode() === mode" (click)="theme.setMode(mode)">
                    {{ mode }}
                </button>
            }
        </div>
        <p>Preference: {{ theme.mode() }} · applied: {{ theme.resolvedMode() }}</p>
    `,
    styles: `
        div {
            display: flex;
            gap: 0.5rem;
        }
        button[aria-pressed='true'] {
            outline: 2px solid var(--mineral-primary);
        }
        p {
            margin: 0.75rem 0 0;
            color: var(--mineral-text-secondary);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeModeExample {
    protected readonly theme = inject(MThemeService)
    protected readonly modes: readonly MModePreference[] = ['dark', 'light', 'system']
}
