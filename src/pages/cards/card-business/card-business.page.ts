import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCardBusiness} from '@banzamel/mineralui-angular/cards/card-business'
import type {MCardBusinessSocial, MCardBusinessVariant} from '@banzamel/mineralui-angular/cards/card-business'
import type {MQrCodeStatus} from '@banzamel/mineralui-angular/display/qr-code'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const VARIANTS: readonly MCardBusinessVariant[] = ['user', 'company']
const ONLINE = ['online', 'offline', 'unset'] as const
const QR = ['value', 'none'] as const
const QR_STATUS: readonly MQrCodeStatus[] = ['idle', 'loading', 'success', 'error']
const SOCIALS: readonly MCardBusinessSocial[] = [
    {platform: 'linkedin', url: 'https://www.linkedin.com'},
    {platform: 'github', url: 'https://github.com'},
    {platform: 'x', url: 'https://x.com'},
]

@Component({
    selector: 'doc-card-business-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPropsTable, MCardBusiness],
    template: `
        <doc-article
            title="MCardBusiness"
            description="Compact business card for a person or a company: avatar or logo with status, job title, QR code, contact links and social profiles."
        >
            <doc-section title="Playground">
                <doc-playground [controls]="controls" [code]="code()">
                    <m-card-business
                        class="doc-card-business"
                        [variant]="variant()"
                        [name]="variant() === 'user' ? 'Anna Kowalska' : 'Mineral Studio'"
                        [jobTitle]="variant() === 'user' ? 'Lead product designer' : 'Design and engineering'"
                        lastActive="Active 5 min ago"
                        [avatar]="variant() === 'user' ? photo : undefined"
                        [color]="color()"
                        [online]="onlineValue()"
                        [contact]="{
                            email: 'hello@mineralui.io',
                            phone: '+48 600 100 200',
                            website: 'https://mineralui.io',
                        }"
                        [address]="address()"
                        [socials]="socials"
                        [qrValue]="qr() === 'value' ? 'https://mineralui.io' : undefined"
                        [qrStatus]="qrStatus()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The name is the card heading and names the avatar, with the status added ('Anna Kowalska (online)', mineralui.cardBusiness.online / offline) — the dot color is not the only cue. Contact details are an <address>; each row starts with a hidden label (Email, Phone, Website, Address). Social links are named by the platform and open in a new tab."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="title is renamed jobTitle (ADR 0004: title is a global HTML attribute). A social icon is an MIconDef. The QR image gets the alt text mineralui.cardBusiness.qr instead of 'QR'."
            />

            <doc-section title="MCardBusiness API">
                <doc-props-table api="MCardBusiness" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-card-business {
            max-width: 420px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBusinessPage {
    protected readonly photo =
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face'
    protected readonly socials = SOCIALS

    protected readonly variant = signal<MCardBusinessVariant>('user')
    protected readonly color = signal<MColor>('primary')
    protected readonly online = signal<(typeof ONLINE)[number]>('online')
    protected readonly qr = signal<(typeof QR)[number]>('value')
    protected readonly qrStatus = signal<MQrCodeStatus>('idle')
    protected readonly showAddress = signal(true)
    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('color', this.color, COLORS),
        selectControl('online', this.online, ONLINE),
        selectControl('qr', this.qr, QR),
        selectControl('qrStatus', this.qrStatus, QR_STATUS),
        booleanControl('address', this.showAddress),
    ]

    protected readonly onlineValue = computed(() => {
        const online = this.online()
        return online === 'unset' ? undefined : online === 'online'
    })
    protected readonly address = computed(() =>
        this.showAddress() ? {street: 'Marszałkowska 1', zip: '00-001', city: 'Warsaw', country: 'Poland'} : undefined
    )

    protected readonly code = computed(() => {
        const attrs = [
            this.variant() === 'company' && 'variant="company"',
            `name="${this.variant() === 'user' ? 'Anna Kowalska' : 'Mineral Studio'}"`,
            'jobTitle="Lead product designer"',
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.online() !== 'unset' && `[online]="${this.online() === 'online'}"`,
            `[contact]="{email: 'hello@mineralui.io', phone: '+48 600 100 200'}"`,
            this.showAddress() && `[address]="{street: 'Marszałkowska 1', zip: '00-001', city: 'Warsaw'}"`,
            `[socials]="[{platform: 'linkedin', url: '…'}, {platform: 'github', url: '…'}]"`,
            this.qr() === 'value' && 'qrValue="https://mineralui.io"',
            this.qrStatus() !== 'idle' && `qrStatus="${this.qrStatus()}"`,
        ].filter((attr) => typeof attr === 'string')
        return `<m-card-business\n    ${attrs.join('\n    ')}\n/>`
    })
}
