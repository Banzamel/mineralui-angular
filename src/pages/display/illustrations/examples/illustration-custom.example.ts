import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MIllustration} from '@banzamel/mineralui-angular/illustrations'

@Component({
    selector: 'app-illustration-custom',
    imports: [MIllustration],
    template: `
        <!-- Without [illustration] you draw your own 200×200 scene; --illustration-accent follows the color input. -->
        <m-illustration color="primary">
            <svg:rect
                x="40"
                y="40"
                width="120"
                height="120"
                rx="16"
                fill="var(--mineral-surface)"
                stroke="var(--illustration-accent)"
                stroke-width="2"
            />
            <svg:circle cx="100" cy="100" r="30" fill="var(--illustration-accent)" opacity="0.2" />
        </m-illustration>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IllustrationCustomExample {}
