import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import type {MButtonShape, MButtonVariant} from '@banzamel/mineralui-angular/controls/button'
import {MIcon, mSearchIcon} from '@banzamel/mineralui-angular/icons'
import type {MBreakpoint, MColor, MSize} from '@banzamel/mineralui-angular/theme'
import buttonIcons from '@generated/examples/controls/button/button-icons'
import buttonLinks from '@generated/examples/controls/button/button-links'
import buttonStates from '@generated/examples/controls/button/button-states'
import buttonVariants from '@generated/examples/controls/button/button-variants'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MButtonVariant[] = ['filled', 'secondary', 'outlined', 'ghost', 'link', 'icon']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const SHAPES: readonly MButtonShape[] = ['default', 'circle']
const EFFECTS = ['ripple', 'none'] as const
const BADGES = ['none', 'dot', '3'] as const
const HIDDEN = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const

type Hidden = (typeof HIDDEN)[number]

@Component({
    selector: 'doc-button-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MButton, MIcon],
    template: `
        <doc-article
            title="MButton"
            description="Action button for primary actions, subtle actions, inline links, icon-only triggers, router links and built-in ripple feedback."
        >
            <doc-section title="Playground" description="Toggle inputs to preview every button combination.">
                <doc-playground [controls]="controls" [code]="code()">
                    <button
                        mButton
                        [variant]="variant()"
                        [size]="size()"
                        [color]="color()"
                        [shape]="shape()"
                        [clickEffect]="clickEffect()"
                        [loading]="loading()"
                        [active]="active()"
                        [pulsing]="pulsing()"
                        [badge]="badgeValue()"
                        [badgeColor]="badgeColor()"
                        [badgePulsing]="badgePulsing()"
                        [rounded]="rounded()"
                        [fullWidth]="fullWidth()"
                        [disabled]="disabled()"
                        [iconOnly]="iconOnly()"
                        [hiddenUpTo]="hiddenUpTo()"
                        [attr.aria-label]="showsIconOnly() ? 'Search' : null"
                    >
                        <!-- Slots match only top-level content (or the single root of a top-level block). -->
                        @if (showsIconOnly()) {
                            <m-icon [icon]="searchIcon" />
                        }
                        @if (!showsIconOnly() && startIcon()) {
                            <m-icon mStart [icon]="searchIcon" />
                        }
                        @if (!showsIconOnly()) {
                            Button
                        }
                        @if (!showsIconOnly() && endIcon()) {
                            <m-icon mEnd [icon]="searchIcon" />
                        }
                    </button>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Variants"
                description="Six visual styles. filled is the default; the link and icon variants drop the border and background."
            >
                <doc-preview [example]="examples.buttonVariants" />
            </doc-section>

            <doc-section
                title="Icons and shapes"
                description="Project icons into the mStart / mEnd slots. iconOnly squares the button — give it an aria-label, since there is no visible text."
            >
                <doc-preview [example]="examples.buttonIcons" />
            </doc-section>

            <doc-section
                title="States"
                description="loading shows a spinner, sets aria-busy and blocks activation; active marks the selected option of a toggle row; the badge is decorative, so repeat its meaning in the accessible name."
            >
                <doc-preview [example]="examples.buttonStates" />
            </doc-section>

            <doc-section
                title="Links"
                description="The selector works on button and a elements, so navigation stays a real link — routerLink, href, target and rel go straight on the anchor."
            >
                <doc-preview [example]="examples.buttonLinks" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MButton" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPage {
    protected readonly examples = {buttonIcons, buttonLinks, buttonStates, buttonVariants}
    protected readonly searchIcon = mSearchIcon

    protected readonly variant = signal<MButtonVariant>('filled')
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly shape = signal<MButtonShape>('default')
    protected readonly clickEffect = signal<(typeof EFFECTS)[number]>('ripple')
    protected readonly loading = signal(false)
    protected readonly active = signal(false)
    protected readonly pulsing = signal(false)
    protected readonly badge = signal<(typeof BADGES)[number]>('none')
    protected readonly badgeColor = signal<MColor>('primary')
    protected readonly badgePulsing = signal(false)
    protected readonly rounded = signal(false)
    protected readonly fullWidth = signal(false)
    protected readonly disabled = signal(false)
    protected readonly iconOnly = signal(false)
    protected readonly startIcon = signal(false)
    protected readonly endIcon = signal(false)
    protected readonly hidden = signal<Hidden>('none')

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        selectControl('shape', this.shape, SHAPES),
        selectControl('clickEffect', this.clickEffect, EFFECTS),
        selectControl('badge', this.badge, BADGES),
        selectControl('badgeColor', this.badgeColor, COLORS),
        selectControl('hiddenUpTo', this.hidden, HIDDEN),
        booleanControl('loading', this.loading),
        booleanControl('active', this.active),
        booleanControl('pulsing', this.pulsing),
        booleanControl('badgePulsing', this.badgePulsing),
        booleanControl('rounded', this.rounded),
        booleanControl('fullWidth', this.fullWidth),
        booleanControl('disabled', this.disabled),
        booleanControl('iconOnly', this.iconOnly),
        booleanControl('startIcon', this.startIcon),
        booleanControl('endIcon', this.endIcon),
    ]

    protected readonly showsIconOnly = computed(() => this.iconOnly() || this.variant() === 'icon')
    protected readonly badgeValue = computed(() => {
        const badge = this.badge()
        return badge === 'none' ? undefined : badge === 'dot' ? true : 3
    })
    protected readonly hiddenUpTo = computed<MBreakpoint | undefined>(() => {
        const hidden = this.hidden()
        return hidden === 'none' ? undefined : hidden
    })

    protected readonly code = computed(() => {
        const hasBadge = this.badge() !== 'none'
        const attrs = [
            this.variant() !== 'filled' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.shape() !== 'default' && `shape="${this.shape()}"`,
            this.clickEffect() !== 'ripple' && `clickEffect="${this.clickEffect()}"`,
            this.loading() && 'loading',
            this.active() && 'active',
            this.pulsing() && 'pulsing',
            this.badge() === 'dot' && 'badge',
            this.badge() === '3' && '[badge]="3"',
            hasBadge && this.badgeColor() !== 'primary' && `badgeColor="${this.badgeColor()}"`,
            hasBadge && this.badgePulsing() && 'badgePulsing',
            this.rounded() && 'rounded',
            this.fullWidth() && 'fullWidth',
            this.disabled() && 'disabled',
            this.hidden() !== 'none' && `hiddenUpTo="${this.hidden()}"`,
            this.iconOnly() && this.variant() !== 'icon' && 'iconOnly',
            this.showsIconOnly() && 'aria-label="Search"',
        ].filter((attr) => typeof attr === 'string')

        const content = this.showsIconOnly()
            ? '<m-icon [icon]="mSearchIcon" />'
            : [
                  this.startIcon() ? '<m-icon mStart [icon]="mSearchIcon" />' : '',
                  'Button',
                  this.endIcon() ? '<m-icon mEnd [icon]="mSearchIcon" />' : '',
              ].join('')
        return `<button mButton${attrs.map((attr) => ` ${attr}`).join('')}>${content}</button>`
    })
}
