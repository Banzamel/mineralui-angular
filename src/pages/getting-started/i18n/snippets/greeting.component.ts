import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core'
import {MI18nService, MTranslatePipe} from '@banzamel/mineralui-angular/i18n'

@Component({
    selector: 'app-greeting',
    imports: [MTranslatePipe],
    template: `
        <p>Current locale: {{ i18n.locale() }}</p>
        <!-- The mT pipe re-renders when the locale changes (OnPush and zoneless included). -->
        <h1>{{ 'greeting' | mT }}</h1>
        <button type="button">{{ 'actions.save' | mT }}</button>
        <p>{{ saveHint() }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Greeting {
    protected readonly i18n = inject(MI18nService)

    // t() reads signals, so computed() follows the active locale.
    protected readonly saveHint = computed(() => `${this.i18n.t('actions.save')} (Ctrl+S)`)

    readonly examples = [
        this.i18n.t('actions.save'), // 'Save'
        this.i18n.t('missing.key', 'Default'), // 'Default'
        this.i18n.t('missing.key'), // 'missing.key'
    ]
}
