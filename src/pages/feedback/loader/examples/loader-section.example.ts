import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MLoader} from '@banzamel/mineralui-angular/feedback/loader'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-loader-section',
    imports: [MButton, MLoader, MText],
    template: `
        <button mButton variant="outlined" size="sm" [disabled]="loading()" (click)="reload()">Reload orders</button>
        <section class="panel" aria-label="Orders" [attr.aria-busy]="loading()">
            @if (loading()) {
                <m-loader label="Loading orders" size="md" [minHeight]="160" />
            } @else {
                <p mText>24 orders, 3 awaiting shipment.</p>
            }
        </section>
    `,
    styles: `
        .panel {
            display: grid;
            place-items: center;
            min-height: 160px;
            margin-top: 12px;
            border: 1px dashed var(--mineral-border);
            border-radius: var(--mineral-radius-md);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderSectionExample {
    protected readonly loading = signal(false)
    private timer: ReturnType<typeof setTimeout> | undefined

    constructor() {
        inject(DestroyRef).onDestroy(() => clearTimeout(this.timer))
    }

    protected reload(): void {
        this.loading.set(true)
        this.timer = setTimeout(() => this.loading.set(false), 1800)
    }
}
