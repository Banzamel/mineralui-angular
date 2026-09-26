import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MTaskList} from '@banzamel/mineralui-angular/data/task-list'
import type {MTaskItem, MTaskItemChange} from '@banzamel/mineralui-angular/data/task-list'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-task-list-sizes',
    imports: [MStack, MTaskList, MText],
    template: `
        <m-stack>
            @for (size of sizes; track size) {
                <m-stack spacing="xs">
                    <p mText size="sm" tone="muted" weight="semibold">size = "{{ size }}"</p>
                    <m-task-list
                        color="success"
                        [label]="'Setup, size ' + size"
                        [size]="size"
                        [items]="tasks()"
                        (itemChange)="toggle($event)"
                    />
                </m-stack>
            }
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListSizesExample {
    protected readonly sizes: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
    protected readonly tasks = signal<readonly MTaskItem[]>([
        {id: '1', label: 'Set up project structure', checked: true},
        {id: '2', label: 'Implement theme tokens', checked: true},
        {id: '3', label: 'Build data components'},
    ])

    protected toggle(change: MTaskItemChange): void {
        this.tasks.update((tasks) =>
            tasks.map((task) => (task.id === change.id ? {...task, checked: change.checked} : task))
        )
    }
}
