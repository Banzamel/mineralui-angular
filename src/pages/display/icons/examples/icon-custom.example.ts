import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MIcon} from '@banzamel/mineralui-angular/icons'

@Component({
    selector: 'app-icon-custom',
    imports: [MIcon],
    template: `
        <!-- Without [icon], m-icon draws your own 24×24 glyph with the same stroke, size and color rules. -->
        <m-icon size="xl" color="primary" label="Pulse">
            <svg:path d="M3 12h4l2-5 4 10 2-5h6" />
        </m-icon>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCustomExample {}
