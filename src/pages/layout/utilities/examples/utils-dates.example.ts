import {ChangeDetectionStrategy, Component, inject, LOCALE_ID} from '@angular/core'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {
    addMonths,
    formatAbsoluteTime,
    formatDate,
    formatRelativeTime,
    getDayNames,
    isDateInRange,
    parseRelativeThreshold,
    parseTime,
} from '@banzamel/mineralui-angular/utils'

// A fixed "now" keeps the prerendered page and the browser in agreement.
const NOW = new Date(2026, 8, 23, 12, 0)

@Component({
    selector: 'app-utils-dates',
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
export class UtilsDatesExample {
    private readonly locale = inject(LOCALE_ID)
    protected readonly rows = [
        {call: 'formatDate(addMonths(now, 1))', result: formatDate(addMonths(NOW, 1))},
        {call: 'getDayNames(locale)', result: getDayNames(this.locale).join(' ')},
        {
            call: 'formatRelativeTime(threeHoursAgo, {now})',
            result: formatRelativeTime(NOW.getTime() - 3 * 60 * 60 * 1000, {locale: this.locale, now: NOW}),
        },
        {call: "formatAbsoluteTime(now, locale, 'datetime')", result: formatAbsoluteTime(NOW, this.locale, 'datetime')},
        {call: "parseRelativeThreshold('30d')", result: parseRelativeThreshold('30d')},
        {
            call: 'isDateInRange(now, 2026-01-01, 2026-12-31)',
            result: isDateInRange(NOW, new Date(2026, 0, 1), new Date(2026, 11, 31)),
        },
        {call: "parseTime('14:30')", result: JSON.stringify(parseTime('14:30'))},
    ]
}
