import type {ApplicationConfig} from '@angular/core'
import {provideMineralI18n} from '@banzamel/mineralui-angular/i18n'

// Messages of every field's automatic error. By error key (mEmail, mPhone — one text per validator) or by the reason
// of the failure, the keys MineralUI for React uses (ibanChecksum, minLength) — the error key wins.
// {name} placeholders are filled from the error object ({min}, {length}, {countryCode}, …).
const pl = {
    mineralui: {
        validation: {
            required: 'To pole jest wymagane',
            minLength: 'Minimum {min} znaki', // also Angular's minlength and Signal Forms minLength()
            ibanChecksum: 'Nieprawidłowa suma kontrolna IBAN',
            ibanLength: 'IBAN dla {country} ma {length} znaków',
            mEmail: 'Nieprawidłowy adres e-mail',
            mMinWords: 'Podaj co najmniej {min} słowa',
            mPhone: 'Nieprawidłowy numer telefonu ({countryCode})',
        },
    },
}

export const appConfig: ApplicationConfig = {
    providers: [provideMineralI18n({locales: {pl}, defaultLocale: 'pl'})],
}
