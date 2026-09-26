import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCardPayment} from '@banzamel/mineralui-angular/cards/card-payment'
import type {MCardPaymentBrand} from '@banzamel/mineralui-angular/cards/card-payment'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const BRANDS = ['detect', 'visa', 'mastercard', 'amex', 'discover', 'maestro', 'unknown'] as const
const MODES = ['surface', 'interactive', 'link'] as const

@Component({
    selector: 'doc-card-payment-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPropsTable, MCardPayment],
    template: `
        <doc-article
            title="MCardPayment"
            description="Display-only payment card with a balance, the brand badge, a masked number, the holder and the expiry date."
        >
            <doc-section
                title="Playground"
                description="With brand on detect, the badge follows the number (4242… is Visa, 5555… Mastercard)."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    @if (mode() === 'link') {
                        <a
                            mCardPayment
                            class="doc-card-payment"
                            href="#wallet"
                            holder="Anna Kowalska"
                            number="4242 4242 4242 4242"
                            expiry="08/28"
                            [brand]="brandValue()"
                            [color]="color()"
                            [balance]="showBalance() ? '$4,210.50' : undefined"
                        ></a>
                    } @else {
                        <m-card-payment
                            class="doc-card-payment"
                            holder="Anna Kowalska"
                            number="4242 4242 4242 4242"
                            expiry="08/28"
                            [brand]="brandValue()"
                            [color]="color()"
                            [interactive]="mode() === 'interactive'"
                            [balance]="showBalance() ? '$4,210.50' : undefined"
                        />
                    }
                </doc-playground>
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The masked number is read as 'Card ending in 4242' (mineralui.cardPayment.ending) instead of a row of dots; holder and expiry are a description list with translatable terms (mineralui.cardPayment.holder / expiry). a[mCardPayment] is one link with a focus ring."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="component / href / to / onClick become a[mCardPayment] with your href or routerLink (ADR 0016); brandIcon is the [mCardPaymentBrand] slot. The field labels are translatable — React has them hard-coded, and the holder label reads 'MCard holder' there (a rename artefact)."
            />

            <doc-section title="MCardPayment API">
                <doc-props-table api="MCardPayment" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-card-payment {
            max-width: 380px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPaymentPage {
    protected readonly mode = signal<(typeof MODES)[number]>('surface')
    protected readonly brand = signal<(typeof BRANDS)[number]>('detect')
    protected readonly color = signal<MColor>('primary')
    protected readonly showBalance = signal(true)
    protected readonly controls = [
        selectControl('mode', this.mode, MODES),
        selectControl('brand', this.brand, BRANDS),
        selectControl('color', this.color, COLORS),
        booleanControl('balance', this.showBalance),
    ]

    protected readonly brandValue = computed((): MCardPaymentBrand | undefined => {
        const brand = this.brand()
        return brand === 'detect' ? undefined : brand
    })

    protected readonly code = computed(() => {
        const attrs = [
            this.mode() === 'link' && 'mCardPayment href="/wallet"',
            'holder="Anna Kowalska"',
            'number="4242 4242 4242 4242"',
            'expiry="08/28"',
            this.brand() !== 'detect' && `brand="${this.brand()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.mode() === 'interactive' && 'interactive',
            this.showBalance() && 'balance="$4,210.50"',
        ].filter((attr) => typeof attr === 'string')
        return this.mode() === 'link' ? `<a ${attrs.join(' ')}></a>` : `<m-card-payment ${attrs.join(' ')} />`
    })
}
