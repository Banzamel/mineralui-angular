import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MAvatar} from '@banzamel/mineralui-angular/media/avatar'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'

@Component({
    selector: 'app-avatar-text',
    imports: [MAvatar, MInline],
    template: `
        <m-inline align="center" wrap="wrap">
            <m-avatar name="Anna Kowalska" initials="anna" />
            <m-avatar text="+3" alt="3 more people" color="neutral" />
            <m-avatar text="+12" alt="12 more people" color="neutral" />
            <m-avatar text="99+" alt="More than 99 people" size="lg" color="info" />
            <m-avatar text="AI" alt="Assistant" shape="rounded" color="news" />
        </m-inline>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarTextExample {}
