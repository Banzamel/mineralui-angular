import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {toSignal} from '@angular/core/rxjs-interop'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MCheckbox} from '@banzamel/mineralui-angular/controls/checkbox'
import {MIcon, mLinkIcon} from '@banzamel/mineralui-angular/icons'
import {MInputGroup} from '@banzamel/mineralui-angular/inputs/input-group'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-input-group-addons',
    imports: [MButton, MCheckbox, MIcon, MInputGroup, MStack, MText, ReactiveFormsModule],
    template: `
        <m-stack>
            <m-input-group label="Website" placeholder="mineralui.io" fullWidth [formControl]="site">
                <m-icon mPrepend [icon]="linkIcon" />
                <span mPrepend>https://</span>
                <button mAppend mButton variant="ghost" (click)="checked.set(site.value)">Check</button>
            </m-input-group>
            <m-input-group label="Coupon" placeholder="SPRING-25" fullWidth [disabled]="!useCoupon()">
                <m-checkbox mPrepend size="sm" [(checked)]="useCoupon">Use</m-checkbox>
            </m-input-group>
            <p mText size="sm" tone="muted">
                Site control: "{{ value() }}" · checked: "{{ checked() }}" · coupon: {{ useCoupon() ? 'on' : 'off' }}
            </p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupAddonsExample {
    protected readonly linkIcon = mLinkIcon
    protected readonly site = new FormControl('', {nonNullable: true, validators: Validators.required})
    protected readonly value = toSignal(this.site.valueChanges, {initialValue: this.site.value})
    protected readonly checked = signal('')
    protected readonly useCoupon = signal(false)
}
