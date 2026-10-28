import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'

@Component({
    selector: 'app-heading-size',
    imports: [MHeading, MStack],
    template: `
        <m-stack>
            <!-- The page title: level 1 for the outline, the h3 size on phones, full h1 from md (768 px) up. -->
            <h1 mHeading [size]="{base: 3, md: 1}">Club settings</h1>
            <!-- A section heading at level 2 that looks like h4 everywhere. -->
            <h2 mHeading [size]="4" tone="muted">Members</h2>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingSizeExample {}
