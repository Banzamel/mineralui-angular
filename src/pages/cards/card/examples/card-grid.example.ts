import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCard, MCardBody, MCardFooter, MCardHeader} from '@banzamel/mineralui-angular/cards/card'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MSimpleGrid} from '@banzamel/mineralui-angular/layout/simple-grid'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-card-grid',
    imports: [MCard, MCardHeader, MCardBody, MCardFooter, MButton, MSimpleGrid, MHeading, MText],
    template: `
        <m-simple-grid minItemWidth="220px">
            <m-card>
                <m-card-header><h3 mHeading>Starter</h3></m-card-header>
                <m-card-body><p mText tone="muted">One project, community support.</p></m-card-body>
                <m-card-footer><button mButton size="sm" variant="outlined">Choose</button></m-card-footer>
            </m-card>
            <m-card color="success">
                <m-card-header><h3 mHeading>Team</h3></m-card-header>
                <m-card-body>
                    <p mText tone="muted">Unlimited projects, shared themes and priority support for five seats.</p>
                </m-card-body>
                <m-card-footer><button mButton size="sm" color="success">Choose</button></m-card-footer>
            </m-card>
            <m-card tone="subtle" padded>
                <p mText weight="semibold">Need more?</p>
                <p mText tone="muted" size="sm">Without sections, padded adds the inner spacing.</p>
            </m-card>
        </m-simple-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardGridExample {}
