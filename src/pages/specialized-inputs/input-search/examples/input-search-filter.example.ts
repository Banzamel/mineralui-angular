import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MInputSearch} from '@banzamel/mineralui-angular/inputs/input-search'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const FRAMEWORKS = ['Angular', 'Astro', 'Ember', 'Lit', 'Next.js', 'Nuxt', 'Qwik', 'React', 'Remix', 'Solid', 'Svelte']

@Component({
    selector: 'app-input-search-filter',
    imports: [MInputSearch, MList, MListItem, MText],
    template: `
        <!-- (searched) fires after a pause in typing, on Enter, and with '' after clearing. -->
        <m-input-search label="Framework" [debounceMs]="200" (searched)="query.set($event)" />
        <ul mList>
            @for (name of results(); track name) {
                <li mListItem>{{ name }}</li>
            } @empty {
                <li mListItem><span mText tone="muted">No matches</span></li>
            }
        </ul>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearchFilterExample {
    protected readonly query = signal('')
    protected readonly results = computed(() => {
        const query = this.query().trim().toLowerCase()
        return FRAMEWORKS.filter((name) => name.toLowerCase().includes(query))
    })
}
