import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, signal} from '@angular/core'
import type {MIllustrationDef} from '@banzamel/mineralui-angular/illustrations'
import {MIllustration} from '@banzamel/mineralui-angular/illustrations'

export interface GalleryScene {
    readonly name: string
    readonly label: string
    readonly illustration: MIllustrationDef
}

const COPIED_FOR_MS = 1200

/** Searchable scene gallery; each card copies the export name. TEMP: MInputSearch (etap 4), MCard (etap 6). */
@Component({
    selector: 'doc-illustration-gallery',
    imports: [MIllustration],
    templateUrl: './illustration-gallery.html',
    styleUrl: './illustration-gallery.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IllustrationGallery {
    readonly scenes = input.required<readonly GalleryScene[]>()

    protected readonly query = signal('')
    protected readonly copied = signal('')
    private copyTimer: ReturnType<typeof setTimeout> | undefined

    protected readonly visible = computed(() => {
        const query = this.query().trim().toLowerCase()
        if (!query) return this.scenes()
        return this.scenes().filter(
            (scene) => scene.name.toLowerCase().includes(query) || scene.label.toLowerCase().includes(query)
        )
    })

    constructor() {
        inject(DestroyRef).onDestroy(() => clearTimeout(this.copyTimer))
    }

    protected onSearch(event: Event): void {
        if (event.target instanceof HTMLInputElement) this.query.set(event.target.value)
    }

    protected async copy(name: string): Promise<void> {
        try {
            await navigator.clipboard.writeText(name)
        } catch {
            return
        }
        this.copied.set(name)
        clearTimeout(this.copyTimer)
        this.copyTimer = setTimeout(() => this.copied.set(''), COPIED_FOR_MS)
    }
}
