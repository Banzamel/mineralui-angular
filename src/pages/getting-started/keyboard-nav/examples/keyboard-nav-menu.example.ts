import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MPopover, MPopoverContent, MPopoverTrigger} from '@banzamel/mineralui-angular/primitives/popover'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {MKeyboardNav, MKeyboardNavItem} from '@banzamel/mineralui-angular/utils'

@Component({
    selector: 'app-keyboard-nav-menu',
    imports: [MButton, MKeyboardNav, MKeyboardNavItem, MPopover, MPopoverContent, MPopoverTrigger, MText],
    template: `
        <button mButton variant="outlined" [mPopoverTrigger]="menu">File</button>

        <!-- The popover moves focus to the first item; ↑ / ↓, Home / End and typing move it on. -->
        <m-popover #menu role="menu" aria-label="File" initialFocus="first">
            <ng-template mPopoverContent>
                <div class="menu" mKeyboardNav (itemActivated)="choose(menu, items[$event])">
                    @for (item of items; track item) {
                        <button
                            class="menu-item"
                            type="button"
                            role="menuitem"
                            mKeyboardNavItem
                            [attr.aria-disabled]="item === 'Export' ? 'true' : null"
                            (click)="choose(menu, item)"
                        >
                            {{ item }}
                        </button>
                    }
                </div>
            </ng-template>
        </m-popover>

        <p mText size="sm" tone="muted">Chosen: {{ chosen() }}</p>
    `,
    styles: `
        .menu {
            display: flex;
            flex-direction: column;
            min-width: 180px;
            padding: 4px;
        }
        .menu-item {
            padding: 8px 12px;
            border: 0;
            border-radius: var(--mineral-radius-sm);
            background: transparent;
            color: var(--mineral-text);
            font: inherit;
            text-align: left;
            cursor: pointer;
        }
        .menu-item:hover,
        .menu-item:focus-visible {
            background: var(--mineral-hover-bg, rgba(127, 127, 127, 0.12));
            outline: none;
        }
        .menu-item[aria-disabled='true'] {
            opacity: 0.5;
            cursor: not-allowed;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardNavMenuExample {
    protected readonly items = ['New file', 'Open…', 'Save', 'Export', 'Close']
    protected readonly chosen = signal('—')

    protected choose(menu: MPopover, item: string | undefined): void {
        if (!item || item === 'Export') return
        this.chosen.set(item)
        menu.open.set(false)
    }
}
