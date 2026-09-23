import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import type {MDividerOrientation, MDividerVariant} from '@banzamel/mineralui-angular/layout/divider'
import {MDivider} from '@banzamel/mineralui-angular/layout/divider'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import type {MBreakpoint, MUtilityScale} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const ORIENTATIONS: readonly MDividerOrientation[] = ['horizontal', 'vertical']
const VARIANTS: readonly MDividerVariant[] = ['solid', 'dashed']
const SCALE = ['(unset)', 'none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
const HIDDEN = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const

const METRICS = [
    {label: 'Revenue', value: 'PLN 48 200'},
    {label: 'Customers', value: '128 active'},
    {label: 'Growth', value: '+12.4%'},
] as const

type Scale = (typeof SCALE)[number]
const scale = (value: Scale): MUtilityScale | undefined => (value === '(unset)' ? undefined : value)

@Component({
    selector: 'doc-divider-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPropsTable, MDivider, MInline, MStack, MSurface, MText],
    templateUrl: './divider.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerPage {
    protected readonly metrics = METRICS

    protected readonly orientation = signal<MDividerOrientation>('horizontal')
    protected readonly variant = signal<MDividerVariant>('solid')
    protected readonly spacingOption = signal<Scale>('(unset)')
    protected readonly paddingOption = signal<Scale>('(unset)')
    protected readonly hiddenOption = signal<(typeof HIDDEN)[number]>('none')
    protected readonly controls = [
        selectControl('orientation', this.orientation, ORIENTATIONS),
        selectControl('variant', this.variant, VARIANTS),
        selectControl('spacing', this.spacingOption, SCALE),
        selectControl('padding', this.paddingOption, SCALE),
        selectControl('hiddenUpTo', this.hiddenOption, HIDDEN),
    ]

    protected readonly spacing = computed(() => scale(this.spacingOption()))
    protected readonly padding = computed(() => scale(this.paddingOption()))
    protected readonly hiddenUpTo = computed<MBreakpoint | undefined>(() => {
        const hidden = this.hiddenOption()
        return hidden === 'none' ? undefined : hidden
    })

    protected readonly code = computed(() => {
        const attrs = [
            this.orientation() === 'vertical' ? 'orientation="vertical"' : '',
            this.variant() !== 'solid' ? `variant="${this.variant()}"` : '',
            this.hiddenOption() !== 'none' ? `hiddenUpTo="${this.hiddenOption()}"` : '',
            this.spacingOption() !== '(unset)' ? `spacing="${this.spacingOption()}"` : '',
            this.paddingOption() !== '(unset)' ? `padding="${this.paddingOption()}"` : '',
        ]
            .filter(Boolean)
            .map((attr) => ` ${attr}`)
            .join('')
        const metric = (label: string, value: string) => [
            '        <div>',
            `            <p mText weight="semibold">${label}</p>`,
            `            <p mText tone="muted" size="sm">${value}</p>`,
            '        </div>',
        ]
        if (this.orientation() === 'vertical') {
            return [
                '<div mSurface>',
                '    <m-inline align="stretch" justify="between" style="min-height: 72px">',
                ...metric('Revenue', 'PLN 48 200'),
                `        <m-divider${attrs} />`,
                ...metric('Customers', '128 active'),
                '    </m-inline>',
                '</div>',
            ].join('\n')
        }
        return [
            '<m-stack>',
            '    <div>',
            '        <p mText weight="semibold">Workspace settings</p>',
            '        <p mText tone="muted" size="sm">Manage company details, locale and notification defaults.</p>',
            '    </div>',
            `    <m-divider${attrs} />`,
            '    <div>',
            '        <p mText weight="semibold">Team access</p>',
            '        <p mText tone="muted" size="sm">Review invitations, role changes and pending approvals.</p>',
            '    </div>',
            '</m-stack>',
        ].join('\n')
    })
}
