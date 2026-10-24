import {afterNextRender, ChangeDetectionStrategy, Component, computed, DOCUMENT, inject, signal} from '@angular/core'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'
import {MKeyboardNav, MKeyboardNavItem} from '@banzamel/mineralui-angular/utils'

const CITIES = ['Gdańsk', 'Kraków', 'Łódź', 'Poznań', 'Szczecin', 'Warszawa', 'Wrocław']

@Component({
    selector: 'app-input-combobox',
    imports: [MInput, MKeyboardNav, MKeyboardNavItem],
    template: `
        <!-- [combobox] puts role="combobox", aria-controls, aria-expanded and aria-autocomplete on the native input. -->
        <m-input
            label="City"
            inputId="city-field"
            placeholder="Start typing…"
            autoComplete="off"
            [value]="query()"
            [combobox]="{controls: 'city-listbox', expanded: open()}"
            (valueChange)="filter($event)"
            (keydown.arrowdown)="open.set(true)"
            (keydown.escape)="open.set(false)"
        />
        <!-- The listbox follows the native input: [keyTarget] keeps focus there and sets aria-activedescendant. -->
        <ul
            id="city-listbox"
            class="listbox"
            role="listbox"
            aria-label="Cities"
            mKeyboardNav
            mode="activedescendant"
            [keyTarget]="field()"
            [typeAhead]="false"
            [hidden]="!open()"
            [(activeIndex)]="active"
            (itemActivated)="pick(matches()[$event])"
        >
            @for (city of matches(); track city; let i = $index) {
                <li
                    class="option"
                    role="option"
                    mKeyboardNavItem
                    [attr.aria-selected]="city === query()"
                    (mouseenter)="active.set(i)"
                    (pointerdown)="$event.preventDefault()"
                    (pointerup)="pick(city)"
                >
                    {{ city }}
                </li>
            }
        </ul>
    `,
    styles: `
        .listbox {
            width: 260px;
            max-height: 180px;
            margin: 4px 0 0;
            padding: 4px;
            overflow-y: auto;
            list-style: none;
            border: 1px solid var(--mineral-border);
            border-radius: var(--mineral-radius-md);
        }
        .option {
            padding: 6px 10px;
            border-radius: var(--mineral-radius-sm);
            color: var(--mineral-text);
            cursor: pointer;
        }
        .option.m-active {
            background: var(--mineral-hover-bg, rgba(127, 127, 127, 0.12));
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComboboxExample {
    private readonly document = inject(DOCUMENT)
    protected readonly field = signal<HTMLElement | undefined>(undefined)
    protected readonly open = signal(false)
    protected readonly query = signal('')
    protected readonly active = signal(-1)
    protected readonly matches = computed(() => {
        const query = this.query().toLowerCase()
        return CITIES.filter((city) => city.toLowerCase().includes(query))
    })

    constructor() {
        // The native input of m-input is reached by its id once rendered.
        afterNextRender(() => this.field.set(this.document.getElementById('city-field') ?? undefined))
    }

    protected filter(value: string): void {
        this.query.set(value)
        this.active.set(-1)
        this.open.set(value.length > 0 && this.matches().length > 0)
    }

    protected pick(city: string | undefined): void {
        if (!city) return
        this.query.set(city)
        this.active.set(-1)
        this.open.set(false)
    }
}
