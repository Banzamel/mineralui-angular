import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-heading-fragment',
    imports: [MHeading, MStack, MText],
    template: `
        <m-stack>
            <!-- The span keeps the heading font, size, weight and line height; only the colour changes. -->
            <h2 mHeading align="center">Ship <span mText color="primary">faster</span> with MineralUI</h2>
            <!-- An explicit size or weight on the fragment still wins. -->
            <h3 mHeading>Release notes <span mText size="sm" tone="muted">2.6</span></h3>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingFragmentExample {}
