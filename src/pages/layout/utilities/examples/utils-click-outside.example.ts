import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {MClickOutside} from '@banzamel/mineralui-angular/utils'

@Component({
    selector: 'app-utils-click-outside',
    imports: [MButton, MClickOutside, MSurface, MText],
    template: `
        <!-- The press on the trigger is inside the host, so it does not immediately close the panel. -->
        <div class="picker" (mClickOutside)="close()" [mClickOutsideDisabled]="!open()">
            <button mButton variant="outlined" [attr.aria-expanded]="open()" (click)="open.set(!open())">
                Filters
            </button>
            @if (open()) {
                <div mSurface class="panel">
                    <p mText size="sm">Press anywhere outside this box to close it.</p>
                </div>
            }
        </div>
        <p mText size="sm" tone="muted">Closed by an outside press: {{ closes() }} times</p>
    `,
    styles: '.picker { display: inline-grid; gap: 8px; } .panel { max-width: 260px; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilsClickOutsideExample {
    protected readonly open = signal(false)
    protected readonly closes = signal(0)

    protected close(): void {
        this.open.set(false)
        this.closes.update((count) => count + 1)
    }
}
