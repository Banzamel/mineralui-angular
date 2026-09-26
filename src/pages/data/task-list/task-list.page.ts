import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MTaskList} from '@banzamel/mineralui-angular/data/task-list'
import type {MTaskItem, MTaskItemChange} from '@banzamel/mineralui-angular/data/task-list'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import taskListSizes from '@generated/examples/data/task-list/task-list-sizes'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

@Component({
    selector: 'doc-task-list-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MStack, MTaskList],
    template: `
        <doc-article
            title="MTaskList"
            description="Interactive checklist for onboarding flows, setup progress and lightweight operations tracking."
        >
            <doc-section
                title="Playground"
                description="Try the accent color, the size, the completed-task styling and a disabled task. The list reports (itemChange); the page updates items."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-task-list
                        label="Project setup"
                        [items]="shownTasks()"
                        [color]="color()"
                        [size]="size()"
                        [strikethrough]="strikethrough()"
                        (itemChange)="toggle($event)"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Size scale"
                description="size follows the MSize axis (xs … xl): font size, padding, row gap and the checkbox scale together. xs / sm suit dense lists in panels, lg / xl hero checklists."
            >
                <doc-preview [example]="examples.sizes" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="A list (ul / li, named by label) of native checkboxes — Space toggles, the whole row is the checkbox label, so a click anywhere on it toggles the task. Disabled tasks use the native disabled state."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="onChange(id, checked) becomes (itemChange) with {id, checked}; the list is a ul with li items and a new label input (React: div role='list'). A task label is text, not a node. Rows toggle through the checkbox label instead of a row click handler."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MTaskList" />
                    <doc-props-table api="MTaskItem" />
                    <doc-props-table api="MTaskItemChange" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListPage {
    protected readonly examples = {sizes: taskListSizes}
    protected readonly tasks = signal<readonly MTaskItem[]>([
        {id: '1', label: 'Set up project structure', checked: true},
        {id: '2', label: 'Implement theme tokens', checked: true},
        {id: '3', label: 'Build data components'},
        {id: '4', label: 'Refresh documentation pages'},
        {id: '5', label: 'Accessibility audit'},
    ])

    protected readonly color = signal<MColor>('success')
    protected readonly size = signal<MSize>('md')
    protected readonly strikethrough = signal(true)
    protected readonly disabledItem = signal(true)
    protected readonly controls = [
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        booleanControl('strikethrough', this.strikethrough),
        booleanControl('disabledItem', this.disabledItem),
    ]
    protected readonly shownTasks = computed(() =>
        this.tasks().map((task) => (task.id === '5' ? {...task, disabled: this.disabledItem()} : task))
    )

    protected readonly code = computed(() => {
        const attrs = [
            'label="Project setup"',
            '[items]="tasks()"',
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            !this.strikethrough() && '[strikethrough]="false"',
            '(itemChange)="toggle($event)"',
        ].filter((attr) => typeof attr === 'string')
        return `<m-task-list\n    ${attrs.join('\n    ')}\n/>`
    })

    protected toggle(change: MTaskItemChange): void {
        this.tasks.update((tasks) =>
            tasks.map((task) => (task.id === change.id ? {...task, checked: change.checked} : task))
        )
    }
}
