import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MBlur} from '@banzamel/mineralui-angular/display/blur'
import {MIcon, mLinkedInIcon, mMailIcon, mPhoneIcon, mPinIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-blur-contacts',
    imports: [MBlur, MIcon, MInline, MStack],
    template: `
        <m-stack spacing="sm">
            <m-inline spacing="sm">
                <m-icon [icon]="mailIcon" [size]="14" color="primary" label="E-mail" />
                <m-blur>rafal.polak&#64;example.com</m-blur>
            </m-inline>
            <m-inline spacing="sm">
                <m-icon [icon]="phoneIcon" [size]="14" color="primary" label="Phone" />
                <m-blur>+48 500 000 000</m-blur>
            </m-inline>
            <m-inline spacing="sm">
                <m-icon [icon]="pinIcon" [size]="14" color="primary" label="City" />
                <m-blur>Cracow, Poland</m-blur>
            </m-inline>
            <m-inline spacing="sm">
                <m-icon [icon]="linkedInIcon" [size]="14" color="primary" label="LinkedIn" />
                <m-blur>linkedin.com/in/username</m-blur>
            </m-inline>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlurContactsExample {
    protected readonly mailIcon = mMailIcon
    protected readonly phoneIcon = mPhoneIcon
    protected readonly pinIcon = mPinIcon
    protected readonly linkedInIcon = mLinkedInIcon
}
