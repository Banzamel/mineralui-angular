import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MSkeleton} from '@banzamel/mineralui-angular/feedback/skeleton'

@Component({
    selector: 'app-skeleton-card',
    imports: [MSkeleton],
    template: `
        <!-- The region says it is loading; the placeholders themselves are hidden from screen readers. -->
        <article class="card" aria-busy="true" aria-label="Loading profile">
            <div class="head">
                <m-skeleton variant="circle" [width]="48" [height]="48" />
                <m-skeleton [lines]="2" width="60%" />
            </div>
            <m-skeleton variant="rectangle" [height]="120" [radius]="12" />
            <m-skeleton [lines]="3" animate="pulse" />
        </article>
    `,
    styles: `
        .card {
            display: grid;
            gap: 16px;
            max-width: 360px;
            padding: 16px;
            border: 1px solid var(--mineral-border);
            border-radius: var(--mineral-radius-lg);
        }
        .head {
            display: flex;
            align-items: center;
            gap: 12px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonCardExample {}
