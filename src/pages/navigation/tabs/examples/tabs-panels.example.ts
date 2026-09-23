import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {mBellIcon, mLockIcon, mUserIcon} from '@banzamel/mineralui-angular/icons'
import {MTab, MTabs} from '@banzamel/mineralui-angular/layout/tabs'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-tabs-panels',
    imports: [MTab, MTabs, MText],
    template: `
        <!-- Each m-tab is a trigger plus its tabpanel; inactive panels stay in the DOM, hidden. -->
        <m-tabs ariaLabel="Account settings" [(value)]="section">
            <m-tab value="profile" label="Profile" [icon]="userIcon">
                <p mText>Name, avatar and public details.</p>
            </m-tab>
            <m-tab value="security" label="Security" [icon]="lockIcon">
                <p mText>Password, two-factor authentication and sessions.</p>
            </m-tab>
            <m-tab value="notifications" label="Notifications" [icon]="bellIcon">
                <p mText>Email and push preferences.</p>
            </m-tab>
            <m-tab value="billing" label="Billing" disabled>
                <p mText>Invoices and payment methods.</p>
            </m-tab>
        </m-tabs>
        <p mText size="sm" tone="muted">Active: {{ section() }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPanelsExample {
    protected readonly userIcon = mUserIcon
    protected readonly lockIcon = mLockIcon
    protected readonly bellIcon = mBellIcon
    protected readonly section = signal('security')
}
