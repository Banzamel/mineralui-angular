import {ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal} from '@angular/core'
import {MAutocomplete} from '@banzamel/mineralui-angular/dropdowns/autocomplete'

const LIBRARIES = ['Angular', 'Astro', 'Ember', 'Lit', 'Preact', 'Qwik', 'React', 'Solid', 'Svelte', 'Vue']

@Component({
    selector: 'app-autocomplete-async',
    imports: [MAutocomplete],
    template: `
        <m-autocomplete
            label="Library"
            helperText="Results come from a simulated server after 250 ms"
            [options]="results()"
            [filterOptions]="serverFiltered"
            [loading]="loading()"
            [debounceMs]="250"
            [(query)]="query"
            [(value)]="library"
            clearable
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteAsyncExample {
    protected readonly query = signal('')
    protected readonly library = signal<string | string[] | null>(null)
    protected readonly results = signal<readonly string[]>(LIBRARIES)
    protected readonly loading = signal(false)
    // The server has filtered already: show the results as they are.
    protected readonly serverFiltered = (options: readonly string[]) => options

    constructor() {
        let timer: ReturnType<typeof setTimeout> | undefined
        // In an app this is a service call (HttpClient / httpResource) keyed by the query.
        effect(() => {
            const needle = this.query().toLowerCase()
            this.loading.set(true)
            clearTimeout(timer)
            timer = setTimeout(() => {
                this.results.set(LIBRARIES.filter((name) => name.toLowerCase().includes(needle)))
                this.loading.set(false)
            }, 400)
        })
        inject(DestroyRef).onDestroy(() => clearTimeout(timer))
    }
}
