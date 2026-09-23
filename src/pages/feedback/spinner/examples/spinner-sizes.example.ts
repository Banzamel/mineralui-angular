import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MSpinner} from '@banzamel/mineralui-angular/feedback/spinner'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'

@Component({
    selector: 'app-spinner-sizes',
    imports: [MInline, MSpinner],
    template: `
        <m-inline>
            <m-spinner size="xs" />
            <m-spinner size="sm" />
            <m-spinner />
            <m-spinner size="lg" />
            <m-spinner size="xl" />
            <m-spinner [size]="48" color="success" />
        </m-inline>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerSizesExample {}
