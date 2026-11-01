import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MGallery} from '@banzamel/mineralui-angular/media/gallery'
import type {MGalleryItem} from '@banzamel/mineralui-angular/media/gallery'

/** A wide logo on a transparent background, as an SVG data URL. */
function logo(text: string, color: string): string {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="96" viewBox="0 0 240 96"><circle cx="48" cy="48" r="32" fill="${color}"/><text x="92" y="60" font-family="sans-serif" font-size="34" font-weight="700" fill="${color}">${text}</text></svg>`
    return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const LOGOS: readonly MGalleryItem[] = [
    {src: logo('Orbit', '#0f766e'), alt: 'Orbit logo, 2024', caption: '2024'},
    {src: logo('Orbit', '#7c3aed'), alt: 'Orbit logo, 2022', caption: '2022'},
    {src: logo('Orb', '#c2410c'), alt: 'Orb logo, 2019', caption: '2019'},
    {src: logo('Orb', '#1d4ed8'), alt: 'Orb logo, 2016', caption: '2016'},
    {src: logo('O', '#be123c'), alt: 'O logo, 2012', caption: '2012'},
]

@Component({
    selector: 'app-gallery-logos',
    imports: [MGallery],
    template: `
        <!-- Whole logos on a transparency checkerboard; as many 8rem columns as fit. -->
        <m-gallery [items]="logos" fit="contain" tileBackground="checkerboard" minColumnWidth="8rem" preview />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryLogosExample {
    protected readonly logos = LOGOS
}
