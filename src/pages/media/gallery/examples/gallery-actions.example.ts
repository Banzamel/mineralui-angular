import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MIcon, mTrashIcon} from '@banzamel/mineralui-angular/icons'
import {MGallery, MGalleryItemActions} from '@banzamel/mineralui-angular/media/gallery'
import type {MGalleryItem} from '@banzamel/mineralui-angular/media/gallery'

const PHOTOS: readonly MGalleryItem[] = ['g', 'h', 'i', 'j'].map((seed, index) => ({
    src: `https://picsum.photos/seed/${seed}/900/900`,
    thumbnail: `https://picsum.photos/seed/${seed}/300/300`,
    alt: `Logo ${index + 1}`,
}))

@Component({
    selector: 'app-gallery-actions',
    imports: [MButton, MGallery, MGalleryItemActions, MIcon],
    template: `
        <m-gallery [items]="photos()" [columns]="4" preview>
            <!-- Beside the preview button, not inside it: reachable with Tab, shown on hover and focus. -->
            <ng-template mGalleryItemActions let-photo let-index="index">
                <button
                    mButton
                    size="sm"
                    color="neutral"
                    iconOnly
                    [attr.aria-label]="'Delete ' + photo.alt"
                    (click)="remove(index)"
                >
                    <m-icon [icon]="trashIcon" />
                </button>
            </ng-template>
        </m-gallery>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryActionsExample {
    protected readonly trashIcon = mTrashIcon
    protected readonly photos = signal(PHOTOS)

    protected remove(index: number): void {
        this.photos.update((photos) => photos.filter((_, position) => position !== index))
    }
}
