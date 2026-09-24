import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MSelect} from '@banzamel/mineralui-angular/dropdowns/select'
import type {MSelectOption} from '@banzamel/mineralui-angular/dropdowns/select'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'

@Component({
    selector: 'app-select-groups',
    imports: [MSelect, MStack],
    template: `
        <m-stack align="start">
            <m-select label="Time zone" [options]="zones" [(value)]="zone" searchable clearable />
            <m-select label="Channels" [options]="zones" [(value)]="channels" multiple searchable />
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGroupsExample {
    protected readonly zones: readonly MSelectOption[] = [
        {value: 'Europe/Warsaw', label: 'Warsaw', group: 'Europe'},
        {value: 'Europe/Berlin', label: 'Berlin', group: 'Europe'},
        {value: 'Europe/Lisbon', label: 'Lisbon', group: 'Europe'},
        {value: 'America/New_York', label: 'New York', group: 'Americas'},
        {value: 'America/Sao_Paulo', label: 'São Paulo', group: 'Americas'},
        {value: 'Asia/Tokyo', label: 'Tokyo', group: 'Asia'},
        {value: 'Asia/Kolkata', label: 'Kolkata', group: 'Asia', disabled: true},
    ]
    protected readonly zone = signal<string | string[] | null>('Europe/Warsaw')
    protected readonly channels = signal<string | string[] | null>([])
}
