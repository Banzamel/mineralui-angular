import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core'
import {MCodeBlock} from '@banzamel/mineralui-angular/display/code-block'
import {MToastService} from '@banzamel/mineralui-angular/feedback/toast'
import {MI18nService} from '@banzamel/mineralui-angular/i18n'
import type {DocLanguage, DocSnippet} from '../doc-example'

/** Docs code sample: `MCodeBlock` fed by a generated snippet or runtime code, with a toast after copying. */
@Component({
    selector: 'doc-code-block',
    imports: [MCodeBlock],
    template: `
        <m-code-block
            class="doc-code-block"
            [code]="source()"
            [language]="resolvedLanguage()"
            [heading]="resolvedTitle()"
            (copied)="announceCopy()"
        />
    `,
    styles: `
        :host {
            display: block;
            min-width: 0;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlock {
    /** Generated snippet (preferred): source, language and file name. */
    readonly snippet = input<DocSnippet>()
    /** Source for runtime-generated code (e.g. playground output); ignored when `snippet` is set. */
    readonly code = input('')
    readonly language = input<DocLanguage>('typescript')
    readonly title = input<string>()

    private readonly toast = inject(MToastService)
    private readonly i18n = inject(MI18nService)

    protected readonly source = computed(() => this.snippet()?.source ?? this.code())
    protected readonly resolvedLanguage = computed(() => this.snippet()?.language ?? this.language())
    protected readonly resolvedTitle = computed(() => this.snippet()?.title ?? this.title())

    protected announceCopy(): void {
        this.toast.show({title: this.i18n.t('ui.copiedToClipboard'), color: 'success', duration: 1600})
    }
}
