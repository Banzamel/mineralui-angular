import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MToastService} from '@banzamel/mineralui-angular/feedback/toast'
import {MI18nService, MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {MThemeScope, MThemeService} from '@banzamel/mineralui-angular/theme'

@Component({
    selector: 'app-theme-toggle',
    imports: [MButton, MThemeScope, MTranslatePipe],
    template: `
        <button mButton (click)="toggle()">{{ 'app.toggleTheme' | mT }} ({{ theme.resolvedMode() }})</button>
        <!-- scope="wrapper" → the mTheme directive with its own MThemeService (not persisted). -->
        <div mTheme mode="light">
            <button mButton>Always light</button>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggle {
    // Context hooks → root services with signals.
    protected readonly theme = inject(MThemeService)
    private readonly i18n = inject(MI18nService)
    private readonly toast = inject(MToastService)

    protected toggle(): void {
        this.theme.toggleMode()
        this.toast.show({title: this.i18n.t('app.themeChanged'), color: 'success'})
    }
}
