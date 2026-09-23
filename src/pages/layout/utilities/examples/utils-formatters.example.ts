import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {
    formatCurrency,
    formatIBAN,
    formatNIP,
    formatPhone,
    parseCurrencyToNumber,
    stripNonDigits,
} from '@banzamel/mineralui-angular/utils'

@Component({
    selector: 'app-utils-formatters',
    imports: [MCode],
    template: `
        <dl>
            @for (row of rows; track row.call) {
                <dt>
                    <code mCode>{{ row.call }}</code>
                </dt>
                <dd>{{ row.result }}</dd>
            }
        </dl>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilsFormattersExample {
    protected readonly rows = [
        {call: "stripNonDigits('600-100-200')", result: stripNonDigits('600-100-200')},
        {call: "formatPhone('600100200')", result: formatPhone('600100200')},
        {call: "formatCurrency('1299.9')", result: formatCurrency('1299.9')},
        {call: "parseCurrencyToNumber('1 299,90')", result: parseCurrencyToNumber('1 299,90')},
        {call: "formatIBAN('pl61109010140000071219812874')", result: formatIBAN('pl61109010140000071219812874')},
        {call: "formatNIP('5261040828')", result: formatNIP('5261040828')},
    ]
}
