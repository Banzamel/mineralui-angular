import {NgComponentOutlet} from '@angular/common'
import {ChangeDetectionStrategy, Component, ElementRef, inject, input, signal} from '@angular/core'
import type {Injector} from '@angular/core'
import {MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import {CodeBlock} from '../code-block/code-block'
import type {DocExample} from '../doc-example'

type PreviewTab = 'preview' | 'code'
const TABS: readonly PreviewTab[] = ['preview', 'code']

let nextId = 0

/**
 * Live example with a Preview / Code switch (WAI-ARIA tabs). Renders the example component and shows its own source.
 *
 * TEMP: tabs replace with MTabs (etap 6).
 */
@Component({
    selector: 'doc-preview',
    imports: [NgComponentOutlet, CodeBlock, MTranslatePipe],
    templateUrl: './doc-preview.html',
    styleUrl: './doc-preview.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPreview {
    private readonly host = inject<ElementRef<HTMLElement>>(ElementRef)

    readonly example = input.required<DocExample>()
    /** Optional injector for the example (e.g. its own `provideMineralI18n` environment). */
    readonly injector = input<Injector>()

    protected readonly tabs = TABS
    protected readonly id = `doc-preview-${nextId++}`
    protected readonly active = signal<PreviewTab>('preview')

    protected onTabKeydown(event: KeyboardEvent): void {
        const index = TABS.indexOf(this.active())
        const target =
            event.key === 'ArrowRight'
                ? TABS[(index + 1) % TABS.length]
                : event.key === 'ArrowLeft'
                  ? TABS[(index - 1 + TABS.length) % TABS.length]
                  : event.key === 'Home'
                    ? TABS[0]
                    : event.key === 'End'
                      ? TABS[TABS.length - 1]
                      : undefined
        if (target === undefined) return
        event.preventDefault()
        this.active.set(target)
        this.host.nativeElement.querySelector<HTMLElement>(`#${this.id}-tab-${target}`)?.focus()
    }
}
