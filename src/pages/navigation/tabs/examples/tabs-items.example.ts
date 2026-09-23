import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MTabs} from '@banzamel/mineralui-angular/layout/tabs'
import type {MTabsItem} from '@banzamel/mineralui-angular/layout/tabs'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'

const TASKS = [
    {title: 'Write release notes', done: true},
    {title: 'Review pull requests', done: false},
    {title: 'Update tokens', done: false},
    {title: 'Publish docs', done: true},
]

@Component({
    selector: 'app-tabs-items',
    imports: [MList, MListItem, MTabs],
    template: `
        <!-- [items] renders the triggers only — a filter row; you render the content from the value. -->
        <m-tabs size="sm" ariaLabel="Task filter" [items]="filters" [(value)]="filter" />
        <ul mList>
            @for (task of visible(); track task.title) {
                <li mListItem>{{ task.title }}</li>
            }
        </ul>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsItemsExample {
    protected readonly filters: readonly MTabsItem[] = [
        {value: 'all', label: 'All'},
        {value: 'open', label: 'Open'},
        {value: 'done', label: 'Done'},
    ]
    protected readonly filter = signal('all')
    protected readonly visible = computed(() => {
        const filter = this.filter()
        return TASKS.filter((task) => filter === 'all' || task.done === (filter === 'done'))
    })
}
