import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal} from '@angular/core'
import {MLoadMore} from '@banzamel/mineralui-angular/controls/load-more'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const PEOPLE = [
    {name: 'Anna Kowalska', role: 'Lead Engineer'},
    {name: 'Jan Nowak', role: 'Product Designer'},
    {name: 'Ewa Mazur', role: 'Data Analyst'},
    {name: 'Piotr Wójcik', role: 'DevOps Engineer'},
    {name: 'Katarzyna Lewandowska', role: 'QA Engineer'},
    {name: 'Tomasz Kaczmarek', role: 'Backend Developer'},
    {name: 'Magdalena Zielińska', role: 'UX Researcher'},
    {name: 'Marcin Kowal', role: 'Frontend Developer'},
    {name: 'Julia Wiśniewska', role: 'Support Lead'},
    {name: 'Adam Król', role: 'Security Engineer'},
] as const
const PAGE_SIZE = 3

@Component({
    selector: 'app-load-more-list',
    imports: [MLoadMore, MList, MListItem, MText],
    template: `
        <div class="team">
            <ul mList>
                @for (person of visible(); track person.name) {
                    <li mListItem>
                        <span mText weight="semibold">{{ person.name }}</span>
                        <span mText tone="muted" size="sm">— {{ person.role }}</span>
                    </li>
                }
            </ul>
            <!-- loaded + total show the counter (announced politely) and the progress bar. -->
            <m-load-more
                [loading]="loading()"
                [hasMore]="count() < people.length"
                [loaded]="count()"
                [total]="people.length"
                (loadMore)="loadNextPage()"
            />
        </div>
    `,
    styles: '.team { max-width: 420px; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMoreListExample {
    protected readonly people = PEOPLE
    protected readonly count = signal(PAGE_SIZE)
    protected readonly loading = signal(false)
    protected readonly visible = computed(() => this.people.slice(0, this.count()))

    private timer: ReturnType<typeof setTimeout> | undefined

    constructor() {
        inject(DestroyRef).onDestroy(() => clearTimeout(this.timer))
    }

    // Stands in for a request to your API.
    protected loadNextPage(): void {
        this.loading.set(true)
        this.timer = setTimeout(() => {
            this.count.update((count) => Math.min(count + PAGE_SIZE, this.people.length))
            this.loading.set(false)
        }, 800)
    }
}
