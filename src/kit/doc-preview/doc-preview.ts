import {NgComponentOutlet} from '@angular/common'
import {booleanAttribute, ChangeDetectionStrategy, Component, input} from '@angular/core'
import type {Injector} from '@angular/core'
import {MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {MTab, MTabs} from '@banzamel/mineralui-angular/layout/tabs'
import {CodeBlock} from '../code-block/code-block'
import type {DocExample} from '../doc-example'

/** Live example with a Preview / Code switch. Renders the example component and shows its own source. */
@Component({
    selector: 'doc-preview',
    imports: [NgComponentOutlet, CodeBlock, MTab, MTabs, MTranslatePipe],
    templateUrl: './doc-preview.html',
    styleUrl: './doc-preview.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPreview {
    readonly example = input.required<DocExample>()
    /** Optional injector for the example (e.g. its own `provideMineralI18n` environment). */
    readonly injector = input<Injector>()
    /** Let `position: sticky` in the example follow the page: the stage stops being a scroll container. */
    readonly sticky = input(false, {transform: booleanAttribute})
}
