import {signal} from '@angular/core'
import {form, required} from '@angular/forms/signals'
import {MRules} from '@banzamel/mineralui-angular/form'

export function createPersonForm() {
    const model = signal({name: '', pesel: ''})
    return form(model, (path) => {
        // A message in the schema is shown as is (errorText / errorMessages of the field still win).
        required(path.name, {message: 'Tell us your name'})
        MRules.minLength(path.name, 2, {message: ({value}) => `At least 2 letters, “${value()}” is too short`})
        // Without one: mineralui.validation.mPesel from the dictionary, then the English text of the rule.
        MRules.pesel(path.pesel)
    })
}
