import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MDetailList} from '@banzamel/mineralui-angular/display/detail-list'
import type {MDetailListItem} from '@banzamel/mineralui-angular/display/detail-list'

@Component({
    selector: 'app-detail-list-columns',
    imports: [MDetailList],
    template: `
        <!-- Three columns on wide screens, one column at md (768 px) and narrower. -->
        <m-detail-list [items]="items" [columns]="3" collapseBelow="md" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailListColumnsExample {
    protected readonly items: readonly MDetailListItem[] = [
        {label: 'Club', value: 'KS Orzeł Warszawa'},
        {label: 'Founded', value: '1998'},
        {label: 'Members', value: 214, helperText: '12 joined this month'},
        {label: 'Tax ID', value: '525-000-12-34'},
        {label: 'Contact', value: 'biuro@orzel.example', href: 'mailto:biuro@orzel.example'},
        {label: 'Season', value: '2026/27', status: 'Open'},
    ]
}
