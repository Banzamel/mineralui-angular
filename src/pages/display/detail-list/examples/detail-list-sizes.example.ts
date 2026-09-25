import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MDetailList} from '@banzamel/mineralui-angular/display/detail-list'
import type {MDetailListItem} from '@banzamel/mineralui-angular/display/detail-list'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import type {MSize} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-detail-list-sizes',
    imports: [MDetailList, MStack, MSurface, MText],
    template: `
        <m-stack>
            @for (size of sizes; track size) {
                <m-stack spacing="xs">
                    <p mText size="sm" tone="muted" weight="semibold">size = "{{ size }}"</p>
                    <div mSurface>
                        <m-detail-list [items]="items" [size]="size" />
                    </div>
                </m-stack>
            }
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailListSizesExample {
    protected readonly sizes: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
    protected readonly items: readonly MDetailListItem[] = [
        {label: 'ID', value: 'TX-913824'},
        {label: 'Created', value: '2026-05-12 14:21'},
        {label: 'Status', value: 'settled'},
        {label: 'Amount', value: '129.00 PLN'},
        {label: 'Method', value: 'Card · 1234'},
    ]
}
