import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MIcon, mLockIcon, mSearchIcon, mUserIcon} from '@banzamel/mineralui-angular/icons'
import {MInput} from '@banzamel/mineralui-angular/inputs/input'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-input-slots',
    imports: [MIcon, MInput, MStack],
    template: `
        <m-stack align="start">
            <m-input label="Search" placeholder="Search docs..." [(value)]="query" clearable rounded>
                <m-icon mStart [icon]="searchIcon" />
            </m-input>
            <m-input label="Price" type="number" inputMode="decimal" placeholder="0.00">
                <span mEnd>PLN</span>
            </m-input>
            <m-input label="Username" value="ada.lovelace" helperText="Checking availability..." loading>
                <m-icon mStart [icon]="userIcon" />
            </m-input>
            <m-input label="API key" value="mk_live_51H…" readOnly variant="filled">
                <m-icon mStart [icon]="lockIcon" />
            </m-input>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSlotsExample {
    protected readonly searchIcon = mSearchIcon
    protected readonly userIcon = mUserIcon
    protected readonly lockIcon = mLockIcon
    protected readonly query = signal('')
}
