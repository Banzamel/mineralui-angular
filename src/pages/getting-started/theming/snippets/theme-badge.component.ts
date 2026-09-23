import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {MThemeService} from '@banzamel/mineralui-angular/theme'

@Component({
    selector: 'app-theme-badge',
    template: `Mode: {{ theme.mode() }} ({{ theme.resolvedMode() }}) / Accent:
        {{ theme.theme().primary ?? 'default' }}`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeBadge {
    protected readonly theme = inject(MThemeService)

    brandAccent(): void {
        this.theme.setTheme({primaryRgb: '168, 85, 247', primary: 'rgba(168, 85, 247, 1)'})
    }
}
