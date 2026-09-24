import {ChangeDetectionStrategy, Component, computed, effect, signal, untracked} from '@angular/core'
import {MSelect} from '@banzamel/mineralui-angular/dropdowns/select'
import type {MSelectOption, MSelectVariant} from '@banzamel/mineralui-angular/dropdowns/select'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import selectForm from '@generated/examples/forms/select/select-form'
import selectGroups from '@generated/examples/forms/select/select-groups'
import selectTemplates from '@generated/examples/forms/select/select-templates'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const VARIANTS: readonly MSelectVariant[] = ['outlined', 'filled', 'underlined']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info']

@Component({
    selector: 'doc-select-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MCode, MList, MListItem, MSelect],
    template: `
        <doc-article
            title="MSelect"
            description="A dropdown select with single or multiple choice, search, grouped options and keyboard navigation."
        >
            <doc-section
                title="Playground"
                description="Focus the field and use ↓ / ↑, Home / End or type a letter; Enter or Space picks, Escape closes."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-select
                        label="Framework"
                        placeholder="Choose a framework..."
                        [options]="frameworks"
                        [(value)]="value"
                        [variant]="variant()"
                        [size]="size()"
                        [color]="color()"
                        [multiple]="multiple()"
                        [searchable]="searchable()"
                        [maxHeight]="maxHeight()"
                        [clearable]="clearable()"
                        [loading]="loading()"
                        [required]="required()"
                        [error]="error()"
                        [errorText]="error() ? 'This field is required' : undefined"
                        [fullWidth]="fullWidth()"
                        [disabled]="disabled()"
                    />
                </doc-playground>
            </doc-section>

            <doc-section
                title="Groups and search"
                description="Options with the same group are listed under one header. searchable turns the field into a text box that filters by label."
            >
                <doc-preview [example]="examples.selectGroups" />
            </doc-section>

            <doc-section
                title="Custom options and value"
                description="ng-template mSelectOption replaces the label of each option, mSelectValue the content of the field. [mSelectOptionOf] types the context."
            >
                <doc-preview [example]="examples.selectTemplates" />
            </doc-section>

            <doc-section
                title="Forms and object values"
                description="MSelect is a form control. Values can be any type — T comes from [options]; compareWith matches recreated objects."
            >
                <doc-preview [example]="examples.selectForm" />
            </doc-section>

            <doc-section title="Accessibility">
                <ul mList>
                    <li mListItem>
                        The field is a WAI-ARIA <code mCode>combobox</code> controlling a <code mCode>listbox</code>;
                        the active option is announced through <code mCode>aria-activedescendant</code> while focus
                        stays in the field.
                    </li>
                    <li mListItem>
                        Without <code mCode>searchable</code> it is a select-only combobox: type-ahead, Space and Tab
                        commit like a native select. With it, an editable combobox with list autocomplete.
                    </li>
                    <li mListItem>
                        <code mCode>multiple</code> sets <code mCode>aria-multiselectable</code>; the list stays open
                        while you pick.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MSelect" />
                <doc-props-table api="MSelectOptionDef" />
                <doc-props-table api="MSelectValueDef" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPage {
    protected readonly examples = {selectForm, selectGroups, selectTemplates}
    protected readonly frameworks: readonly MSelectOption[] = [
        {value: 'react', label: 'React'},
        {value: 'vue', label: 'Vue'},
        {value: 'angular', label: 'Angular'},
        {value: 'svelte', label: 'Svelte'},
        {value: 'solid', label: 'SolidJS'},
    ]

    protected readonly value = signal<string | string[] | null>(null)
    protected readonly variant = signal<MSelectVariant>('outlined')
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly multiple = signal(false)
    protected readonly searchable = signal(false)
    protected readonly maxHeight = signal(240)
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
        booleanControl('searchable', this.searchable),
        sliderControl('maxHeight', this.maxHeight, {min: 160, max: 400, step: 20}),
        booleanControl('clearable', this.clearable),
        booleanControl('loading', this.loading),
        booleanControl('required', this.required),
        booleanControl('error', this.error),
        booleanControl('fullWidth', this.fullWidth),
        booleanControl('disabled', this.disabled),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            'label="Framework"',
            'placeholder="Choose a framework..."',
            '[options]="frameworks"',
            '[(value)]="framework"',
            this.variant() !== 'outlined' && `variant="${this.variant()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.multiple() && 'multiple',
            this.searchable() && 'searchable',
            this.maxHeight() !== 300 && `[maxHeight]="${this.maxHeight()}"`,
            this.clearable() && 'clearable',
            this.loading() && 'loading',
            this.required() && 'required',
            this.error() && 'errorText="This field is required"',
            this.fullWidth() && 'fullWidth',
            this.disabled() && 'disabled',
        ].filter((attr) => typeof attr === 'string')
        return `<m-select\n    ${attrs.join('\n    ')}\n/>`
    })

    constructor() {
        // Single and multiple choice keep different value shapes.
        effect(() => {
            this.multiple()
            untracked(() => this.value.set(null))
        })
    }
}
