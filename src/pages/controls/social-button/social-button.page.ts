import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MSocialButton} from '@banzamel/mineralui-angular/controls/social-button'
import type {
    MSocialButtonIconShape,
    MSocialButtonPlatform,
    MSocialButtonVariant,
} from '@banzamel/mineralui-angular/controls/social-button'
import type {MBreakpoint, MSize} from '@banzamel/mineralui-angular/theme'
import socialButtonCustom from '@generated/examples/controls/social-button/social-button-custom'
import socialButtonGoogle from '@generated/examples/controls/social-button/social-button-google'
import socialButtonIcons from '@generated/examples/controls/social-button/social-button-icons'
import socialButtonProviders from '@generated/examples/controls/social-button/social-button-providers'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const PLATFORMS: readonly MSocialButtonPlatform[] = [
    'google',
    'facebook',
    'apple',
    'microsoft',
    'pinterest',
    'linkedin',
]
const VARIANTS: readonly MSocialButtonVariant[] = ['outline', 'dark', 'light']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const SHAPES: readonly MSocialButtonIconShape[] = ['circle', 'square']
const HIDDEN = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const

type Hidden = (typeof HIDDEN)[number]

@Component({
    selector: 'doc-social-button-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MSocialButton],
    template: `
        <doc-article
            title="MSocialButton"
            description="Purpose-built social sign-in buttons with dedicated brand marks, fixed provider presets and icon-only shapes."
        >
            <doc-section
                title="Playground"
                description="Switch providers to preview each branded preset. variant applies to Google only."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <button
                        mSocialButton
                        [platform]="platform()"
                        [variant]="variant()"
                        [size]="size()"
                        [iconOnly]="iconOnly()"
                        [iconShape]="iconShape()"
                        [fullWidth]="fullWidth() && !iconOnly()"
                        [loading]="loading()"
                        [disabled]="disabled()"
                        [hiddenUpTo]="hiddenUpTo()"
                    ></button>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Providers"
                description='Six providers, each locked to its own brand preset and mark. Without projected content the label is the translated mineralui.socialButton.signIn ("Sign in with {platform}").'
            >
                <doc-preview [example]="examples.socialButtonProviders" />
            </doc-section>

            <doc-section
                title="Google presets"
                description="Google keeps three official-style presets: outline, dark and light."
            >
                <doc-preview [example]="examples.socialButtonGoogle" />
            </doc-section>

            <doc-section
                title="Icon-only"
                description='iconOnly hides the label but keeps "Sign in with …" as the accessible name — override it with ariaLabel. iconShape picks a circle or a rounded square.'
            >
                <doc-preview [example]="examples.socialButtonIcons" />
            </doc-section>

            <doc-section
                title="Custom label, links and states"
                description="Projected text replaces the default label. The selector works on a elements too, for redirect-based sign-in; loading and disabled behave like in mButton."
            >
                <doc-preview [example]="examples.socialButtonCustom" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MSocialButton" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialButtonPage {
    protected readonly examples = {
        socialButtonCustom,
        socialButtonGoogle,
        socialButtonIcons,
        socialButtonProviders,
    }

    protected readonly platform = signal<MSocialButtonPlatform>('google')
    protected readonly variant = signal<MSocialButtonVariant>('outline')
    protected readonly size = signal<MSize>('md')
    protected readonly iconOnly = signal(false)
    protected readonly iconShape = signal<MSocialButtonIconShape>('circle')
    protected readonly fullWidth = signal(false)
    protected readonly loading = signal(false)
    protected readonly disabled = signal(false)
    protected readonly hidden = signal<Hidden>('none')

    protected readonly controls = [
        selectControl('platform', this.platform, PLATFORMS),
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        selectControl('iconShape', this.iconShape, SHAPES),
        selectControl('hiddenUpTo', this.hidden, HIDDEN),
        booleanControl('iconOnly', this.iconOnly),
        booleanControl('fullWidth', this.fullWidth),
        booleanControl('loading', this.loading),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly hiddenUpTo = computed<MBreakpoint | undefined>(() => {
        const hidden = this.hidden()
        return hidden === 'none' ? undefined : hidden
    })

    protected readonly code = computed(() => {
        const attrs = [
            this.platform() !== 'google' && `platform="${this.platform()}"`,
            this.platform() === 'google' && this.variant() !== 'outline' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.iconOnly() && 'iconOnly',
            this.iconOnly() && this.iconShape() !== 'circle' && `iconShape="${this.iconShape()}"`,
            !this.iconOnly() && this.fullWidth() && 'fullWidth',
            this.loading() && 'loading',
            this.disabled() && 'disabled',
            this.hidden() !== 'none' && `hiddenUpTo="${this.hidden()}"`,
        ].filter((attr) => typeof attr === 'string')

        return `<button mSocialButton${attrs.map((attr) => ` ${attr}`).join('')}></button>`
    })
}
