import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {mChartIcon, mHomeIcon, mSettingsIcon, mUsersIcon} from '@banzamel/mineralui-angular/icons'
import {MCommandPalette} from '@banzamel/mineralui-angular/overlays/command-palette'
import type {MCommandPaletteItem} from '@banzamel/mineralui-angular/overlays/command-palette'
import {MText} from '@banzamel/mineralui-angular/typography/text'

// A centered dialog on wider screens, a bottom sheet on a phone. The shortcut is off here (the docs use Ctrl+K).
@Component({
    selector: 'app-command-palette-dialog',
    imports: [MCommandPalette, MText],
    template: `
        <m-command-palette
            variant="dialog"
            shortcut=""
            [items]="items"
            description="Jump to a page or an action."
            (selected)="last.set($event.title)"
        />
        <p mText tone="muted" size="sm">Last run: {{ last() || '—' }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandPaletteDialogExample {
    protected readonly last = signal('')
    protected readonly items: readonly MCommandPaletteItem[] = [
        {id: 'home', title: 'Dashboard', group: 'Navigate', icon: mHomeIcon},
        {id: 'reports', title: 'Reports', description: 'Revenue and usage', group: 'Navigate', icon: mChartIcon},
        {id: 'team', title: 'Team', description: 'People and roles', group: 'Navigate', icon: mUsersIcon},
        {id: 'settings', title: 'Settings', group: 'Actions', icon: mSettingsIcon},
    ]
}
