import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MBanner} from '@banzamel/mineralui-angular/feedback/banner'
import type {MBannerVariant} from '@banzamel/mineralui-angular/feedback/banner'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import bannerAction from '@generated/examples/feedback/banner/banner-action'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const VARIANTS: readonly MBannerVariant[] = ['filled', 'outlined', 'ghost']

@Component({
    selector: 'doc-banner-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MBanner],
    template: `
        <doc-article
            title="MBanner"
            description="Prominent full-width message for announcements, calls to action and maintenance notes."
        >
            <doc-section
                title="Playground"
                description="A dismissed banner collapses and hides itself; the playground brings it back when an input changes."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    @for (key of [revision()]; track key) {
                        <m-banner [color]="color()" [variant]="variant()" [dismissible]="dismissible()">
                            Scheduled maintenance on Sunday, 02:00–04:00 UTC.
                        </m-banner>
                    }
                </doc-playground>
            </doc-section>

            <doc-section
                title="Icon and action"
                description="Project an icon with mStart and a call to action with mEnd. (dismissed) fires once the banner has collapsed."
            >
                <doc-preview [example]="examples.bannerAction" />
            </doc-section>

            <doc-section
                title="Differences from MineralUI for React"
                description='React renders role="banner" — the landmark for the site header — on every banner. The Angular banner has no role; put role="status" on it when it appears in response to something the user did. The icon and the action are content slots instead of props.'
            />

            <doc-section title="API">
                <doc-props-table api="MBanner" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerPage {
    protected readonly examples = {bannerAction}

    protected readonly color = signal<MColor>('primary')
    protected readonly variant = signal<MBannerVariant>('filled')
    protected readonly dismissible = signal(true)
    protected readonly controls = [
        selectControl('color', this.color, COLORS),
        selectControl('variant', this.variant, VARIANTS),
        booleanControl('dismissible', this.dismissible),
    ]

    // Re-creates the banner whenever an input changes, so a dismissed one comes back.
    protected readonly revision = computed(() => `${this.color()}-${this.variant()}-${this.dismissible()}`)

    protected readonly code = computed(() => {
        const attrs = [
            this.color() !== 'primary' ? ` color="${this.color()}"` : '',
            this.variant() !== 'filled' ? ` variant="${this.variant()}"` : '',
            this.dismissible() ? ' dismissible' : '',
        ].join('')
        return `<m-banner${attrs}>\n    Scheduled maintenance on Sunday, 02:00–04:00 UTC.\n</m-banner>`
    })
}
