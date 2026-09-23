import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core'
import {MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import type {ApiMember} from './api'
import {API} from './api'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {MCode} from '@banzamel/mineralui-angular/typography/code'

interface MemberGroup {
    readonly label: string
    readonly members: readonly ApiMember[]
}

/**
 * API reference of one library class or interface, generated from the sources (counterpart of docs-react
 * `DocsPropsTable`, which took hand-written rows). An unknown name fails the build of the page's spec.
 *
 * TEMP: tables replace with MDataTable compact (etap 7).
 */
@Component({
    selector: 'doc-props-table',
    imports: [MText, MTranslatePipe, MCode],
    templateUrl: './doc-props-table.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPropsTable {
    /** Class or interface name (`MIcon`), or `<entry point>/<file>` for exported functions (`utils/validators`). */
    readonly api = input.required<string>()

    protected readonly entry = computed(() => {
        const entry = API[this.api()]
        if (!entry) throw new Error(`[doc-props-table] "${this.api()}" is not in api.json`)
        return entry
    })

    protected readonly importLine = computed(() => {
        const {kind, name, entryPoint, members} = this.entry()
        const names = kind === 'functions' ? members.map((member) => member.name).join(', ') : name
        return `import {${names}} from '${entryPoint}'`
    })

    protected readonly groups = computed<readonly MemberGroup[]>(() => {
        const members = this.entry().members
        const own = members.filter((member) => member.from === null)
        return [
            {label: 'ui.propsInputs', members: own.filter((m) => m.kind === 'input' || m.kind === 'model')},
            {label: 'ui.propsOutputs', members: own.filter((m) => m.kind === 'output')},
            {label: 'ui.propsShared', members: members.filter((member) => member.from !== null)},
            {label: 'ui.propsProp', members: own.filter((m) => m.kind === 'property' || m.kind === 'method')},
            {label: 'ui.propsFunction', members: own.filter((m) => m.kind === 'function')},
        ].filter((group) => group.members.length > 0)
    })
}
