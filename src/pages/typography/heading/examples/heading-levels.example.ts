import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'

@Component({
    selector: 'app-heading-levels',
    imports: [MHeading, MStack],
    template: `
        <m-stack>
            <h1 mHeading>Heading 1</h1>
            <h2 mHeading>Heading 2</h2>
            <h3 mHeading>Heading 3</h3>
            <h4 mHeading tone="accent">Heading 4</h4>
            <h5 mHeading tone="muted">Heading 5</h5>
            <h6 mHeading color="info">Heading 6</h6>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingLevelsExample {}
