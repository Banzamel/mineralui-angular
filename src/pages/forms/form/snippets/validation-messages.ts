import type {ApplicationConfig} from '@angular/core'
import {provideMineralI18n} from '@banzamel/mineralui-angular/i18n'

// Messages of every field's automatic error, by error key: Angular's own validators and MValidators alike.
// {name} placeholders are filled from the error object ({min}, {requiredLength}, {countryCode}, …).
const pl = {
    mineralui: {
        validation: {
            required: 'To pole jest wymagane',
            minlength: 'Minimum {requiredLength} znaki',
            mEmail: 'Nieprawidłowy adres e-mail',
            mMinWords: 'Podaj co najmniej {min} słowa',
            mPhone: 'Nieprawidłowy numer telefonu ({countryCode})',
        },
    },
}

export const appConfig: ApplicationConfig = {
    providers: [provideMineralI18n({locales: {pl}, defaultLocale: 'pl'})],
}
