import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'
import type {MInputVariant} from '@banzamel/mineralui-angular/inputs/input'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import ghostTextDirective from '@generated/examples/forms/ghost-text/ghost-text-directive'
import ghostTextTextarea from '@generated/examples/forms/ghost-text/ghost-text-textarea'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MInputVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

const CITIES = [
    'Amsterdam',
    'Ankara',
    'Athens',
    'Barcelona',
    'Berlin',
    'Brussels',
    'Budapest',
    'Copenhagen',
    'Dublin',
    'Helsinki',
    'Lisbon',
    'London',
    'Madrid',
    'Oslo',
    'Paris',
    'Prague',
    'Rome',
    'Stockholm',
    'Vienna',
    'Warsaw',
    'Zurich',
]

@Component({
    selector: 'doc-ghost-text-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MInput],
    template: `
        <doc-article
            title="Ghost Text"
            description="Inline autocomplete hints that appear as translucent text after what you type. Tab or Enter accepts, the arrow keys cycle through matches, Escape hides the hint. Available as ghostOptions on MInput and MTextarea, or as the [mGhostText] directive on any native field."
        >
            <doc-section title="Playground" description='Try typing "Pa", "Be" or "War", then press Tab.'>
                <doc-playground [controls]="controls" [code]="code()">
                    <m-input
                        label="City"
                        placeholder="Start typing a city name..."
                        helperText='Try typing "Pa", "Be" or "War" then press Tab'
                        [(value)]="city"
                        [ghostOptions]="cities"
                        [ghostMinChars]="ghostMinChars()"
                        [variant]="variant()"
                        [size]="size()"
                        [fullWidth]="fullWidth()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Directive on a native field"
                description="[mGhostText] works on any input or textarea. Accepting dispatches a native input event, so ngModel, reactive forms and (input) listeners see it like typing. The hint overlay is positioned against the field's parent."
            >
                <doc-preview [example]="examples.ghostTextDirective" />
            </doc-section>

            <doc-section
                title="Textarea"
                description="MTextarea takes the same ghostOptions; the hint wraps with the text."
            >
                <doc-preview [example]="examples.ghostTextTextarea" />
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MGhostText" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GhostTextPage {
    protected readonly examples = {ghostTextDirective, ghostTextTextarea}
    protected readonly cities = CITIES

    protected readonly city = signal('')
    protected readonly variant = signal<MInputVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly ghostMinChars = signal(1)
    protected readonly fullWidth = signal(false)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        sliderControl('ghostMinChars', this.ghostMinChars, {min: 1, max: 5}),
        booleanControl('fullWidth', this.fullWidth),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="City"',
            'placeholder="Start typing a city name..."',
            '[(value)]="city"',
            '[ghostOptions]="cities"',
            `[ghostMinChars]="${this.ghostMinChars()}"`,
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.fullWidth() && 'fullWidth',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-input\n    ${attrs.join('\n    ')}\n/>`
    })
}
