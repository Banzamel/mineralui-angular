import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MImage} from '@banzamel/mineralui-angular/media/image'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'

@Component({
    selector: 'app-image-preview-group',
    imports: [MImage, MInline],
    template: `
        <m-inline wrap="wrap">
            @for (photo of photos; track photo.seed) {
                <m-image
                    class="app-image-tile"
                    ratio="4:3"
                    rounded
                    shadow
                    preview
                    previewGroup="trip"
                    hoverEffect="zoom-dim"
                >
                    <img
                        [src]="'https://picsum.photos/seed/' + photo.seed + '/520/360'"
                        [alt]="photo.alt"
                        [title]="photo.caption"
                        loading="lazy"
                    />
                </m-image>
            }
        </m-inline>
    `,
    styles: `
        .app-image-tile {
            width: 160px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePreviewGroupExample {
    protected readonly photos = [
        {seed: 'media-image-a', alt: 'Harbour at dawn', caption: 'Day 1 — the harbour'},
        {seed: 'media-image-b', alt: 'Old town street', caption: 'Day 2 — old town'},
        {seed: 'media-image-c', alt: 'Coastal cliffs', caption: 'Day 3 — the cliffs'},
    ]
}
