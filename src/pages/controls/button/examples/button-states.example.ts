import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MIcon, mBellIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'

@Component({
    selector: 'app-button-states',
    imports: [MButton, MIcon, MInline],
    template: `
        <m-inline>
            <button mButton [loading]="saving()" (click)="save()">{{ saving() ? 'Saving…' : 'Save' }}</button>
            <button mButton variant="outlined" disabled>Disabled</button>
            <button mButton variant="outlined" color="neutral" active>Active</button>
            <button mButton color="warning" pulsing>Needs attention</button>
            <button mButton variant="ghost" iconOnly [badge]="3" badgeColor="error" aria-label="Notifications, 3 new">
                <m-icon [icon]="bellIcon" />
            </button>
            <button mButton variant="secondary" badge badgeColor="success" badgePulsing>Live</button>
        </m-inline>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonStatesExample {
    protected readonly bellIcon = mBellIcon
    protected readonly saving = signal(false)

    protected save(): void {
        this.saving.set(true)
        setTimeout(() => this.saving.set(false), 1500)
    }
}
