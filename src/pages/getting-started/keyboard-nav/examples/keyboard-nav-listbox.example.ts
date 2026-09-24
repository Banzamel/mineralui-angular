import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MPopover, MPopoverContent} from '@banzamel/mineralui-angular/primitives/popover'
import {MKeyboardNav, MKeyboardNavItem} from '@banzamel/mineralui-angular/utils'

const FRUITS = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange']

@Component({
    selector: 'app-keyboard-nav-listbox',
    imports: [MKeyboardNav, MKeyboardNavItem, MPopover, MPopoverContent],
    template: `
        <!-- Focus never leaves the field: the active option is announced through aria-activedescendant. -->
        <input
            #field
            class="field"
            role="combobox"
            aria-label="Fruit"
            aria-autocomplete="list"
            [attr.aria-expanded]="open()"
            aria-controls="fruit-listbox"
            placeholder="Type a fruit…"
            [value]="query()"
            (input)="filter(field.value)"
            (focus)="open.set(true)"
            (keydown.arrowdown)="open.set(true)"
        />

        <m-popover [anchor]="field" matchWidth [(open)]="open">
            <ng-template mPopoverContent>
                <ul
                    id="fruit-listbox"
                    class="listbox"
                    role="listbox"
                    aria-label="Fruits"
                    mKeyboardNav
                    mode="activedescendant"
                    [keyTarget]="field"
                    [typeAhead]="false"
                    [(activeIndex)]="active"
                    (itemActivated)="pick(matches()[$event])"
                >
                    @for (fruit of matches(); track fruit; let i = $index) {
                        <li
                            class="option"
                            role="option"
                            mKeyboardNavItem
                            [attr.aria-selected]="fruit === query()"
                            (mouseenter)="active.set(i)"
                            (pointerdown)="$event.preventDefault()"
                            (pointerup)="pick(fruit)"
                        >
                            {{ fruit }}
                        </li>
                    } @empty {
                        <li class="empty">No matches</li>
                    }
                </ul>
            </ng-template>
        </m-popover>
    `,
    styles: `
        .field {
            box-sizing: border-box;
            width: 260px;
            padding: 8px 12px;
            border: 1px solid var(--mineral-border);
            border-radius: var(--mineral-radius-md);
            background: var(--mineral-input-bg);
            color: var(--mineral-text);
            font: inherit;
        }
        .listbox {
            max-height: 200px;
            margin: 0;
            padding: 4px;
            overflow-y: auto;
            list-style: none;
        }
        .option,
        .empty {
            padding: 6px 10px;
            border-radius: var(--mineral-radius-sm);
            color: var(--mineral-text);
        }
        .option {
            cursor: pointer;
        }
        /* m-active marks the option aria-activedescendant points at. */
        .option.m-active {
            background: var(--mineral-hover-bg, rgba(127, 127, 127, 0.12));
        }
        .option[aria-selected='true'] {
            font-weight: 600;
        }
        .empty {
            color: var(--mineral-text-muted);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardNavListboxExample {
    protected readonly open = signal(false)
    protected readonly query = signal('')
    protected readonly active = signal(-1)
    protected readonly matches = computed(() => {
        const query = this.query().toLowerCase()
        return FRUITS.filter((fruit) => fruit.toLowerCase().includes(query))
    })

    protected filter(value: string): void {
        this.query.set(value)
        this.active.set(-1)
        this.open.set(true)
    }

    protected pick(fruit: string | undefined): void {
        if (!fruit) return
        this.query.set(fruit)
        this.active.set(-1)
        this.open.set(false)
    }
}
