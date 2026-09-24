import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, signal} from '@angular/core'
import {MAlert} from '@banzamel/mineralui-angular/feedback/alert'
import {MToastService} from '@banzamel/mineralui-angular/feedback/toast'
import type {MIllustrationDef} from '@banzamel/mineralui-angular/illustrations'
import {MIllustration} from '@banzamel/mineralui-angular/illustrations'
import {MInputSearch} from '@banzamel/mineralui-angular/inputs/input-search'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

export interface GalleryScene {
    readonly name: string
    readonly label: string
    readonly illustration: MIllustrationDef
}

const COPIED_FOR_MS = 1200

/** Searchable scene gallery; each card copies the export name. TEMP: MCard (etap 6). */
@Component({
    selector: 'doc-illustration-gallery',
    imports: [MAlert, MStack, MText, MIllustration, MInputSearch],
    templateUrl: './illustration-gallery.html',
    styleUrl: './illustration-gallery.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IllustrationGallery {
    readonly scenes = input.required<readonly GalleryScene[]>()

    protected readonly query = signal('')
    protected readonly copied = signal('')
    private readonly toast = inject(MToastService)
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

    protected async copy(name: string): Promise<void> {
        try {
            await navigator.clipboard.writeText(name)
        } catch {
            return
        }
        this.copied.set(name)
        this.toast.show({title: 'Copied to clipboard', message: name, color: 'success', duration: 1600})
        clearTimeout(this.copyTimer)
        this.copyTimer = setTimeout(() => this.copied.set(''), COPIED_FOR_MS)
    }
}
