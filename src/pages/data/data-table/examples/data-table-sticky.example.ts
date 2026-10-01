import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MDataTable} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Reading {
    readonly id: number
    readonly station: string
    readonly temperature: number
    readonly humidity: number
    readonly wind: number
    readonly pressure: number
}

const STATIONS = ['Gdańsk', 'Kraków', 'Poznań', 'Wrocław', 'Łódź', 'Lublin']
const READINGS: readonly Reading[] = Array.from({length: 24}, (_, index) => ({
    id: index + 1,
    station: STATIONS[index % STATIONS.length] ?? 'Warszawa',
    temperature: 8 + ((index * 7) % 15),
    humidity: 40 + ((index * 13) % 50),
    wind: 2 + ((index * 5) % 18),
    pressure: 995 + ((index * 3) % 30),
}))

@Component({
    selector: 'app-data-table-sticky',
    imports: [MDataTable, MText],
    template: `
        <span mText size="sm" tone="muted" class="app-sticky-caption"
            >Page scroll — the header stays below the app bar</span
        >
        <m-data-table
            label="Readings, page scroll"
            stickyHeader
            striped
            compact
            scrollOffset="72"
            [columns]="columns"
            [data]="readings"
        />
        <span mText size="sm" tone="muted" class="app-sticky-caption"
            >maxHeight — the rows scroll inside the table</span
        >
        <m-data-table
            label="Readings, bounded"
            stickyHeader
            striped
            compact
            maxHeight="240"
            [columns]="columns"
            [data]="readings"
        />
    `,
    styles: `
        .app-sticky-caption {
            display: block;
            margin: var(--mineral-spacing-md) 0 var(--mineral-spacing-sm);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableStickyExample {
    protected readonly readings = READINGS
    protected readonly columns: readonly MDataTableColumn[] = [
        {key: 'id', label: '#', width: 56},
        {key: 'station', label: 'Station', rowHeader: true},
        {key: 'temperature', label: 'Temperature (°C)', align: 'right'},
        {key: 'humidity', label: 'Humidity (%)', align: 'right'},
        {key: 'wind', label: 'Wind (m/s)', align: 'right'},
        {key: 'pressure', label: 'Pressure (hPa)', align: 'right'},
    ]
}
