import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MIcon, mPaletteIcon} from '@banzamel/mineralui-angular/icons'
import type {MTheme} from '@banzamel/mineralui-angular/theme'
import {MThemeScope} from '@banzamel/mineralui-angular/theme'

@Component({
    selector: 'app-theme-scope',
    imports: [MIcon, MThemeScope],
    template: `
        <!-- [mTheme] gives a subtree its own mode and tokens; the rest of the page is untouched. -->
        <div class="panel" mTheme="light">
            <m-icon [icon]="palette" color="primary" size="lg" />
            Always light
        </div>
        <div class="panel" mTheme="dark">
            <m-icon [icon]="palette" color="primary" size="lg" />
            Always dark
        </div>
        <!-- "system" follows the OS preference (a bare mTheme is dark); overrides apply inside only. -->
        <div class="panel" mTheme="system" [theme]="violet">
            <m-icon [icon]="palette" color="primary" size="lg" />
            Violet primary, system mode
        </div>
    `,
    styles: `
        :host {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .panel {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 1.25rem;
            border: 1px solid var(--mineral-border);
            border-radius: var(--mineral-radius-md);
            background: var(--mineral-page-bg);
            color: var(--mineral-page-text);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeScopeExample {
    protected readonly palette = mPaletteIcon
    protected readonly violet: MTheme = {primaryRgb: '168, 85, 247', primary: 'rgba(168, 85, 247, 1)'}
}
