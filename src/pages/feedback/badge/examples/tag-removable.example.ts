import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MTag} from '@banzamel/mineralui-angular/feedback/tag'

const ALL = ['Angular', 'TypeScript', 'Signals', 'SSR', 'Accessibility']

@Component({
    selector: 'app-tag-removable',
    imports: [MButton, MTag],
    template: `
        <ul class="row" aria-label="Selected topics">
            @for (topic of topics(); track topic) {
                <li>
                    <m-tag color="info" rounded closable (closed)="remove(topic)">{{ topic }}</m-tag>
                </li>
            } @empty {
                <li>No topics left.</li>
            }
        </ul>
        <button mButton variant="ghost" size="sm" (click)="topics.set(all)">Reset</button>
    `,
    styles: `
        .row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 0 0 12px;
            padding: 0;
            list-style: none;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagRemovableExample {
    protected readonly all = ALL
    protected readonly topics = signal(ALL)

    protected remove(topic: string): void {
        this.topics.update((list) => list.filter((item) => item !== topic))
    }
}
