import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MCard, MCardBody, MCardHeader} from '@banzamel/mineralui-angular/cards/card'
import {MSimpleGrid} from '@banzamel/mineralui-angular/layout/simple-grid'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-card-links',
    imports: [RouterLink, MCard, MCardHeader, MCardBody, MSimpleGrid, MHeading, MText],
    template: `
        <!-- The whole card is one link: put mCard on the anchor, with routerLink or href. -->
        <m-simple-grid minItemWidth="220px">
            <a mCard routerLink="/docs/button">
                <m-card-header><h3 mHeading>Buttons</h3></m-card-header>
                <m-card-body><p mText tone="muted">Variants, sizes, groups and loading states.</p></m-card-body>
            </a>
            <a mCard routerLink="/docs/card-action-area" color="success">
                <m-card-header><h3 mHeading>Card action area</h3></m-card-header>
                <m-card-body><p mText tone="muted">A clickable region inside a card.</p></m-card-body>
            </a>
            <a mCard href="https://mineralui.io" target="_blank" rel="noopener" color="info">
                <m-card-header><h3 mHeading>MineralUI for React</h3></m-card-header>
                <m-card-body><p mText tone="muted">A plain href works the same way.</p></m-card-body>
            </a>
        </m-simple-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardLinksExample {}
