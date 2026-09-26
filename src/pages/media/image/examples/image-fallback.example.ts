import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MImage} from '@banzamel/mineralui-angular/media/image'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'

@Component({
    selector: 'app-image-fallback',
    imports: [MImage, MInline],
    template: `
        <m-inline wrap="wrap">
            <m-image
                class="app-image-tile"
                ratio="1:1"
                rounded
                bordered
                fallback="https://picsum.photos/seed/media-fallback/320/320"
            >
                <img src="https://example.invalid/missing.jpg" alt="Product photo (fallback)" />
            </m-image>
            <m-image class="app-image-tile" ratio="1:1" rounded bordered skeleton>
                <img src="https://picsum.photos/seed/media-skeleton/320/320" alt="Product photo" loading="lazy" />
            </m-image>
        </m-inline>
    `,
    styles: `
        .app-image-tile {
            width: 180px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFallbackExample {}
