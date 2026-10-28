import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MInputFile} from '@banzamel/mineralui-angular/inputs/input-file'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-file-crop-formats',
    imports: [MInputFile, MText],
    template: `
        <m-input-file
            label="Logo"
            accept="image/png,image/webp,image/jpeg,image/svg+xml,image/gif"
            helperText="PNG and WebP keep their transparency; SVG and GIF are kept as picked"
            clearable
            [crop]="{outputSize: 256}"
            [(value)]="files"
        />
        <p mText size="sm" tone="muted">{{ summary() }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileCropFormatsExample {
    protected readonly files = signal<readonly File[]>([])
    protected readonly summary = computed(() => {
        const [file] = this.files()
        return file ? `${file.name} — ${file.type}, ${file.size} bytes` : 'No logo yet'
    })
}
