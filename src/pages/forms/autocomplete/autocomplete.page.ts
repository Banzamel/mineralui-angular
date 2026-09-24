import {ChangeDetectionStrategy, Component, computed, effect, signal, untracked} from '@angular/core'
import {MAutocomplete} from '@banzamel/mineralui-angular/dropdowns/autocomplete'
import type {MAutocompleteVariant} from '@banzamel/mineralui-angular/dropdowns/autocomplete'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import autocompleteAsync from '@generated/examples/forms/autocomplete/autocomplete-async'
import autocompleteObjects from '@generated/examples/forms/autocomplete/autocomplete-objects'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MAutocompleteVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info']

@Component({
    selector: 'doc-autocomplete-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MAutocomplete, MCode, MList, MListItem],
    template: `
        <doc-article
            title="MAutocomplete"
            description="A text field with a filtered suggestion list: one value or several as tags, local or server-side search."
        >
            <doc-section
                title="Playground"
                description="Type to filter, ↓ / ↑ to move, Enter to pick. With multiple, Backspace in the empty field removes the last tag."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-autocomplete
                        label="Country"
                        placeholder="Start typing a country..."
                        [options]="countries"
                        [(value)]="value"
                        [variant]="variant()"
                        [size]="size()"
                        [color]="color()"
                        [multiple]="multiple()"
                        [clearable]="clearable()"
                        [loading]="loading()"
                        [required]="required()"
                        [error]="error()"
                        [errorText]="error() ? 'Pick a country' : undefined"
                        [fullWidth]="fullWidth()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Server-side search"
                description="[(query)] carries the typed text after debounceMs. Load the results into options, set loading meanwhile and pass an identity filterOptions — the server has filtered already."
            >
                <doc-preview [example]="examples.autocompleteAsync" />
            </doc-section>

            <doc-section
                title="Objects, custom options and tags"
                description="For object options set optionLabel (text) and optionValue (identity). mAutocompleteOption and mAutocompleteTags replace the default rendering."
            >
                <doc-preview [example]="examples.autocompleteObjects" />
            </doc-section>

            <doc-section title="Accessibility">
                <ul mList>
                    <li mListItem>
                        The field is a WAI-ARIA <code mCode>combobox</code> with
                        <code mCode>aria-autocomplete="list"</code>; the active suggestion is announced through
                        <code mCode>aria-activedescendant</code>.
                    </li>
                    <li mListItem>
                        Tab picks the active suggestion of a single autocomplete; Escape closes the list and keeps the
                        text.
                    </li>
                    <li mListItem>
                        Tags have remove buttons named after their value; the list is
                        <code mCode>aria-busy</code> while <code mCode>loading</code>.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MAutocomplete" />
                <doc-props-table api="MAutocompleteOptionDef" />
                <doc-props-table api="MAutocompleteTagsDef" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompletePage {
    protected readonly examples = {autocompleteAsync, autocompleteObjects}
    protected readonly countries = [
        'Austria',
        'Belgium',
        'Czechia',
        'Denmark',
        'Estonia',
        'Finland',
        'France',
        'Germany',
        'Italy',
        'Lithuania',
        'Netherlands',
        'Norway',
        'Poland',
        'Portugal',
        'Spain',
        'Sweden',
    ]

    protected readonly value = signal<string | string[] | null>(null)
    protected readonly variant = signal<MAutocompleteVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly multiple = signal(false)
    protected readonly clearable = signal(true)
    protected readonly loading = signal(false)
    protected readonly required = signal(false)
    protected readonly error = signal(false)
    protected readonly fullWidth = signal(false)
    protected readonly disabled = signal(false)

    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        booleanControl('multiple', this.multiple),
        booleanControl('clearable', this.clearable),
        booleanControl('loading', this.loading),
        booleanControl('required', this.required),
        booleanControl('error', this.error),
        booleanControl('fullWidth', this.fullWidth),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Country"',
            '[options]="countries"',
            '[(value)]="country"',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.multiple() && 'multiple',
            this.clearable() && 'clearable',
            this.loading() && 'loading',
            this.required() && 'required',
            this.error() && 'errorText="Pick a country"',
            this.fullWidth() && 'fullWidth',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-autocomplete\n    ${attrs.join('\n    ')}\n/>`
    })

    constructor() {
        // Single and multiple choice keep different value shapes.
        effect(() => {
            this.multiple()
            untracked(() => this.value.set(null))
        })
    }
}
