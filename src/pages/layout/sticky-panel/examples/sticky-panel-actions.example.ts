import {ChangeDetectionStrategy, Component, signal, viewChild} from '@angular/core'
import type {ElementRef} from '@angular/core'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MStickyPanel} from '@banzamel/mineralui-angular/layout/sticky-panel'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-sticky-panel-actions',
    imports: [MInline, MStack, MStickyPanel, MSurface, MText],
    template: `
        <m-stack>
            <m-inline justify="between">
                <p mText size="sm">Opened: {{ opened() ?? 'nothing yet' }}</p>
                <!-- TEMP: replace with MButton (etap 3) -->
                <button type="button" (click)="backToTop()">Back to top</button>
            </m-inline>
            <m-sticky-panel #panel [top]="88" [bottomGap]="360" label="Notifications">
                <m-stack>
                    @for (item of notifications; track item) {
                        <div mSurface tone="subtle">
                            <m-inline justify="between">
                                <p mText size="sm">Notification {{ item }}</p>
                                <!-- TEMP: replace with MButton (etap 3) -->
                                <button type="button" (click)="opened.set(item)">Open</button>
                            </m-inline>
                        </div>
                    }
                </m-stack>
            </m-sticky-panel>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyPanelActionsExample {
    protected readonly notifications = Array.from({length: 16}, (_, index) => index + 1)
    protected readonly opened = signal<number | null>(null)
    private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel')

    protected backToTop(): void {
        this.panel().nativeElement.scrollTo({top: 0, behavior: 'smooth'})
    }
}
