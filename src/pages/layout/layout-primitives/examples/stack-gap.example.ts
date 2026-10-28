import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'

@Component({
    selector: 'app-stack-gap',
    imports: [MInline, MStack, MSurface],
    template: `
        <m-inline align="start">
            <!-- spacing is the gap between the items; it adds no outer margin. -->
            <m-stack spacing="xs">
                <div mSurface tone="subtle">xs</div>
                <div mSurface tone="subtle">xs</div>
                <div mSurface tone="subtle">xs</div>
            </m-stack>
            <!-- Outer space comes from mt / mb / mx / my only. -->
            <m-stack spacing="xl" mx="lg">
                <div mSurface tone="subtle">xl</div>
                <div mSurface tone="subtle">xl</div>
                <div mSurface tone="subtle">xl</div>
            </m-stack>
        </m-inline>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackGapExample {}
