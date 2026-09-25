import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MEmptyState} from '@banzamel/mineralui-angular/display/empty-state'
import {mBoxIcon, mFileIcon, MIcon, mSearchIcon} from '@banzamel/mineralui-angular/icons'
import type {MIconDef} from '@banzamel/mineralui-angular/icons'
import {MIllustration, mNotFoundIllustration, mSearchIllustration} from '@banzamel/mineralui-angular/illustrations'
import type {MIllustrationDef} from '@banzamel/mineralui-angular/illustrations'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import emptyStateSearch from '@generated/examples/display/empty-state/empty-state-search'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const VISUALS = ['icon', 'search', 'file', 'illustration: search', 'illustration: not found'] as const
type Visual = (typeof VISUALS)[number]

const ICONS: Readonly<Partial<Record<Visual, {def: MIconDef; name: string}>>> = {
    icon: {def: mBoxIcon, name: 'mBoxIcon'},
    search: {def: mSearchIcon, name: 'mSearchIcon'},
    file: {def: mFileIcon, name: 'mFileIcon'},
}
const ILLUSTRATIONS: Readonly<Partial<Record<Visual, {def: MIllustrationDef; name: string}>>> = {
    'illustration: search': {def: mSearchIllustration, name: 'mSearchIllustration'},
    'illustration: not found': {def: mNotFoundIllustration, name: 'mNotFoundIllustration'},
}

@Component({
    selector: 'doc-empty-state-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MEmptyState, MIcon, MIllustration],
    template: `
        <doc-article
            title="MEmptyState"
            description="Placeholder for empty data views — empty tables, search results, lists. Takes an icon or an illustration and a built-in action button."
        >
            <doc-section
                title="Playground"
                description="Switch between icons and illustrations, toggle the action button and adjust color."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-empty-state
                        heading="No results found"
                        description="Try adjusting your search or filter to find what you are looking for."
                        [color]="color()"
                        [size]="size()"
                        [buttonText]="showButton() ? 'Clear filters' : undefined"
                    >
                        @if (icon(); as icon) {
                            <m-icon mStart [icon]="icon.def" [size]="48" />
                        } @else if (illustration(); as illustration) {
                            <m-illustration mStart [illustration]="illustration.def" [size]="120" [color]="color()" />
                        }
                    </m-empty-state>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Inside a data view"
                description="Render it in place of an empty list; the action output clears the filter."
            >
                <doc-preview [example]="examples.search" />
            </doc-section>

            <doc-section
                title="Differences from MineralUI for React"
                description="title is heading (title is a global HTML attribute). The icon or illustration goes in the [mStart] slot instead of the icon / illustration props — an m-icon takes the muted state color by itself, an m-illustration gets its color input from you. onAction is the (action) output; the button shows whenever buttonText is set."
            />

            <doc-section title="MEmptyState API">
                <doc-props-table api="MEmptyState" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStatePage {
    protected readonly examples = {search: emptyStateSearch}

    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('neutral')
    protected readonly visual = signal<Visual>('icon')
    protected readonly showButton = signal(true)
    protected readonly controls = [
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
        selectControl('visual', this.visual, VISUALS),
        booleanControl('showButton', this.showButton),
    ]

    protected readonly icon = computed(() => ICONS[this.visual()])
    protected readonly illustration = computed(() => ILLUSTRATIONS[this.visual()])

    protected readonly code = computed(() => {
        const attrs = [
            'heading="No results found"',
            'description="Try adjusting your search or filter to find what you are looking for."',
            this.color() !== 'neutral' && `color="${this.color()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.showButton() && 'buttonText="Clear filters"',
            this.showButton() && '(action)="clearFilters()"',
        ].filter((attr) => typeof attr === 'string')
        const icon = this.icon()
        const illustration = this.illustration()
        const visual = icon
            ? `<m-icon mStart [icon]="${icon.name}" [size]="48" />`
            : `<m-illustration mStart [illustration]="${illustration?.name}" [size]="120" color="${this.color()}" />`
        return [`<m-empty-state`, ...attrs.map((attr) => `    ${attr}`), '>', `    ${visual}`, '</m-empty-state>'].join(
            '\n'
        )
    })
}
