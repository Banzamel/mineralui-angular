import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MCheckbox} from '@banzamel/mineralui-angular/controls/checkbox'
import type {MPopoverCloseReason} from '@banzamel/mineralui-angular/primitives/popover'
import {MPopover, MPopoverContent, MPopoverTrigger} from '@banzamel/mineralui-angular/primitives/popover'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-popover-trigger',
    imports: [MButton, MCheckbox, MPopover, MPopoverContent, MPopoverTrigger, MText],
    template: `
        <!-- The trigger toggles the popover and gets aria-expanded, aria-controls and aria-haspopup="dialog". -->
        <button mButton variant="outlined" [mPopoverTrigger]="filters">Filters</button>

        <m-popover #filters role="dialog" aria-label="Filters" initialFocus="first" (closed)="reason.set($event)">
            <!-- Lazy: rendered on open, destroyed on close. -->
            <ng-template mPopoverContent>
                <div class="filters">
                    <m-checkbox [(checked)]="openOnly">Only open issues</m-checkbox>
                    <m-checkbox [(checked)]="mine">Assigned to me</m-checkbox>
                    <button mButton size="sm" (click)="filters.open.set(false)">Apply</button>
                </div>
            </ng-template>
        </m-popover>

        <p mText size="sm" tone="muted">Closed itself by: {{ reason() ?? '—' }}</p>
    `,
    styles: `
        .filters {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding: 16px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverTriggerExample {
    protected readonly openOnly = signal(true)
    protected readonly mine = signal(false)
    protected readonly reason = signal<MPopoverCloseReason | null>(null)
}
