import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-stack-basics',
    imports: [MStack, MSurface, MText],
    template: `
        <m-stack align="start" py="md">
            <p mText weight="semibold">Project overview</p>
            <p mText tone="muted" size="sm">Items flow top to bottom with the shared md gap.</p>
            <div mSurface tone="subtle">Sidebar</div>
            <div mSurface tone="subtle">Main content</div>
            <div mSurface tone="subtle">Actions</div>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackBasicsExample {}
