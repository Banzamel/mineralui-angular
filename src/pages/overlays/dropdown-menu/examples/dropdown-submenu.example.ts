import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MDropdownDivider, MDropdownItem, MDropdownMenu} from '@banzamel/mineralui-angular/overlays/dropdown-menu'
import {MPopconfirm} from '@banzamel/mineralui-angular/overlays/popconfirm'
import {MPopoverTrigger} from '@banzamel/mineralui-angular/primitives/popover'
import {MText} from '@banzamel/mineralui-angular/typography/text'

type Theme = 'light' | 'dark' | 'system'

// Account menu: submenus with the current value in [mEnd], and a sign-out that asks first without closing the menu.
@Component({
    selector: 'app-dropdown-submenu',
    imports: [MButton, MDropdownDivider, MDropdownItem, MDropdownMenu, MPopconfirm, MPopoverTrigger, MText],
    template: `
        <button mButton size="sm" variant="outlined" [mPopoverTrigger]="menu">Account</button>
        <m-dropdown-menu #menu>
            <button mDropdownItem (click)="last.set('Profile')">Profile</button>

            <button mDropdownItem [mPopoverTrigger]="themeMenu">
                Theme <span mEnd>{{ themeLabels[theme()] }}</span>
            </button>
            <m-dropdown-menu #themeMenu>
                @for (option of themes; track option) {
                    <button
                        mDropdownItem
                        itemRole="menuitemradio"
                        [checked]="theme() === option"
                        (click)="theme.set(option)"
                    >
                        {{ themeLabels[option] }}
                    </button>
                }
            </m-dropdown-menu>

            <button mDropdownItem [mPopoverTrigger]="languageMenu">
                Language <span mEnd>{{ language() }}</span>
            </button>
            <m-dropdown-menu #languageMenu>
                @for (option of languages; track option) {
                    <button
                        mDropdownItem
                        itemRole="menuitemradio"
                        [checked]="language() === option"
                        (click)="language.set(option)"
                    >
                        {{ option }}
                    </button>
                }
            </m-dropdown-menu>

            <m-dropdown-divider />
            <button mDropdownItem color="error" [mPopoverTrigger]="signOut">Sign out</button>
            <m-popconfirm
                #signOut
                heading="Sign out of all devices?"
                description="You will need to sign in again everywhere."
                color="error"
                placement="left-start"
                confirmText="Sign out"
                cancelText="Stay"
                (confirmed)="last.set('Signed out')"
            />
        </m-dropdown-menu>
        <p mText tone="muted" size="sm">
            {{ themeLabels[theme()] }} · {{ language() }} · last action: {{ last() || '—' }}
        </p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownSubmenuExample {
    protected readonly themes: readonly Theme[] = ['light', 'dark', 'system']
    protected readonly themeLabels: Readonly<Record<Theme, string>> = {
        light: 'Light',
        dark: 'Dark',
        system: 'System',
    }
    protected readonly languages = ['English', 'Polski', 'Deutsch'] as const
    protected readonly theme = signal<Theme>('dark')
    protected readonly language = signal<(typeof this.languages)[number]>('English')
    protected readonly last = signal('')
}
