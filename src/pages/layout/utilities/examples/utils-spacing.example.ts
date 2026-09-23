import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import {MSpacing} from '@banzamel/mineralui-angular/theme'

@Component({
    selector: 'app-utils-spacing',
    imports: [MSpacing, MStack, MSurface],
    template: `
        <!-- Components with layout inputs compose MSpacing; any other element takes the mSpacing directive. -->
        <m-stack px="lg" py="sm" fullWidth>
            <div mSurface tone="subtle">m-stack px="lg" py="sm"</div>
            <div mSpacing mt="xl" px="md" fsize="13" mSurface>div mSpacing mt="xl" px="md" fsize="13"</div>
        </m-stack>
    `,
    styles: ':host { display: block; width: 100%; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilsSpacingExample {}
