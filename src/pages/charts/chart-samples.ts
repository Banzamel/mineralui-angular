import type {MChartDataset} from '@banzamel/mineralui-angular/data/chart'

/** Shared data of the chart playgrounds (same numbers as docs-react). */
export const MONTHS: readonly string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export const MULTI_SERIES: readonly MChartDataset[] = [
    {label: 'Revenue', data: [12, 19, 14, 25, 22, 30], color: 'success'},
    {label: 'Expenses', data: [8, 12, 10, 15, 14, 18], color: 'error'},
    {label: 'Profit', data: [4, 7, 4, 10, 8, 12], color: 'info'},
]

export const SINGLE_SERIES: readonly MChartDataset[] = [{label: 'Revenue', data: [12, 19, 14, 25, 22, 30]}]

/** `true` flags of a playground as bare attributes, `false` ones with a binding. */
export function flagAttributes(flags: Readonly<Record<string, {value: boolean; default: boolean}>>): string[] {
    return Object.entries(flags)
        .filter(([, flag]) => flag.value !== flag.default)
        .map(([name, flag]) => (flag.value ? `    ${name}` : `    [${name}]="false"`))
}
