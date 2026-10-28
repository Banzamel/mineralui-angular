import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCard, MCardBody} from '@banzamel/mineralui-angular/cards/card'
import {MGrid, MGridItem} from '@banzamel/mineralui-angular/layout/grid'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MStickyPanel} from '@banzamel/mineralui-angular/layout/sticky-panel'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-sticky-panel-short',
    imports: [MCard, MCardBody, MGrid, MGridItem, MStack, MStickyPanel, MText],
    template: `
        <m-grid>
            <m-grid-item [sm]="12" [md]="8">
                <m-card>
                    <m-card-body>
                        <p mText weight="semibold">Order #2048</p>
                        <p mText tone="muted" size="sm">
                            A short page: the rail is only as tall as its three lines, so nothing below it is pushed
                            down to the viewport height.
                        </p>
                    </m-card-body>
                </m-card>
            </m-grid-item>
            <m-grid-item [sm]="12" [md]="4">
                <m-sticky-panel class="doc-sticky-short" [top]="88" label="Order summary">
                    <m-stack spacing="xs">
                        <p mText size="sm" weight="semibold">Summary</p>
                        <p mText size="sm">3 items · 129.00 EUR</p>
                        <p mText size="sm" tone="muted">Ships tomorrow</p>
                    </m-stack>
                </m-sticky-panel>
            </m-grid-item>
        </m-grid>
    `,
    styles: `
        .doc-sticky-short {
            padding: var(--mineral-spacing-md);
            border: 1px solid var(--mineral-border);
            border-radius: var(--mineral-radius-md);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyPanelShortExample {}
