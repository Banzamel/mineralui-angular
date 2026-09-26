import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MAvatarStack} from '@banzamel/mineralui-angular/media/avatar-stack'
import type {MAvatarStackItem} from '@banzamel/mineralui-angular/media/avatar-stack'

@Component({
    selector: 'app-avatar-stack-static',
    imports: [MAvatarStack],
    template: `<m-avatar-stack [items]="attendees" [max]="4" [interactive]="false" />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarStackStaticExample {
    protected readonly attendees: readonly MAvatarStackItem[] = [
        {id: 'a1', name: 'Anna Kowalska', color: 'info'},
        {id: 'a2', name: 'Jan Nowak', color: 'success'},
        {id: 'a3', name: 'Ewa Mazur', color: 'warning'},
        {id: 'a4', name: 'Piotr Wojcik', color: 'news'},
        {id: 'a5', name: 'Marcin Kowal'},
        {id: 'a6', name: 'Tomasz Kaczmarek'},
    ]
}
