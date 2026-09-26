import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MAvatar} from '@banzamel/mineralui-angular/media/avatar'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-avatar-team',
    imports: [MAvatar, MInline, MText, RouterLink],
    template: `
        <m-inline align="center" wrap="wrap">
            <m-avatar
                name="Anna Kowalska"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face"
                size="lg"
                presence="online"
            />
            <m-avatar name="Jan Nowak" size="lg" color="success" presence="away" />
            <m-avatar name="Ewa Mazur" size="lg" shape="rounded" color="info" [badge]="3" badgeColor="error" />
            <a mAvatar routerLink="/docs/avatar-stack" name="Piotr Wojcik" size="lg" color="warning"></a>
            <button mAvatar name="Marcin Kowal" size="lg" color="news" (click)="opened.set('Marcin Kowal')"></button>
        </m-inline>
        <p mText tone="muted" size="sm">{{ opened() ? 'Opened ' + opened() : 'Click the last avatar.' }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarTeamExample {
    protected readonly opened = signal<string | null>(null)
}
