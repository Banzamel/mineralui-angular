import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MButtonGroup} from '@banzamel/mineralui-angular/controls/button-group'
import type {MModePreference} from '@banzamel/mineralui-angular/theme'
import {MThemeService} from '@banzamel/mineralui-angular/theme'

@Component({
    selector: 'app-theme-mode',
    imports: [MButton, MButtonGroup],
    template: `
        <m-button-group variant="outlined" color="neutral" size="sm" aria-label="Color mode">
            @for (mode of modes; track mode) {
                <button
                    mButton
                    [active]="theme.mode() === mode"
                    [attr.aria-pressed]="theme.mode() === mode"
                    (click)="theme.setMode(mode)"
                >
                    {{ mode }}
                </button>
            }
        </m-button-group>
        <p>Preference: {{ theme.mode() }} · applied: {{ theme.resolvedMode() }}</p>
    `,
    styles: `
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
