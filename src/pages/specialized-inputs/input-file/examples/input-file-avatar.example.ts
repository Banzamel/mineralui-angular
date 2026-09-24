import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MInputFile} from '@banzamel/mineralui-angular/inputs/input-file'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-file-avatar',
    imports: [MInputFile, MText],
    template: `
        <m-input-file
            label="Avatar"
            accept="image/*"
            placeholder="Drop a photo or click to choose one"
            clearable
            [crop]="{shape: 'circle', outputSize: 320}"
            [(value)]="files"
        />
        <p mText size="sm" tone="muted">{{ summary() }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileAvatarExample {
    protected readonly files = signal<readonly File[]>([])
    protected readonly summary = computed(() => {
        const [file] = this.files()
        return file ? `${file.name} — ${file.type}, ${file.size} bytes` : 'No avatar yet'
    })
}
