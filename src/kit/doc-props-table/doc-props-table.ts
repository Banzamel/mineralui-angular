import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core'
import {MDataTable, MDataTableCell} from '@banzamel/mineralui-angular/data/data-table'
import type {MDataTableColumn} from '@banzamel/mineralui-angular/data/data-table'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MI18nService, MTranslatePipe} from '@banzamel/mineralui-angular/i18n'
import type {ApiMember} from './api'
import {API} from './api'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {MCode} from '@banzamel/mineralui-angular/typography/code'

interface MemberGroup {
    readonly label: string
    readonly members: readonly ApiMember[]
    readonly columns: readonly MDataTableColumn[]
    readonly caption: string
}

/**
 * API reference of one library class or interface, generated from the sources (counterpart of docs-react
 * `DocsPropsTable`, which took hand-written rows). An unknown name fails the build of the page's spec. Each group is an `MDataTable compact` with the member name as the row header.
 */
@Component({
    selector: 'doc-props-table',
    imports: [MBadge, MCode, MDataTable, MDataTableCell, MText, MTranslatePipe],
    templateUrl: './doc-props-table.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPropsTable {
    /** Class or interface name (`MIcon`), or `<entry point>/<file>` for exported functions (`utils/validators`). */
    readonly api = input.required<string>()

    private readonly i18n = inject(MI18nService)

    protected readonly entry = computed(() => {
        const entry = API[this.api()]
        if (!entry) throw new Error(`[doc-props-table] "${this.api()}" is not in api.json`)
        return entry
    })

    protected readonly importLine = computed(() => {
        const {kind, name, entryPoint, members} = this.entry()
        // Members of an object of functions (`MRules.email`) are imported through the object.
        const names =
            kind === 'functions' ? [...new Set(members.map((member) => member.name.split('.')[0]))].join(', ') : name
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
        ]
            .filter((group) => group.members.length > 0)
            .map((group) => ({
                ...group,
                columns: this.memberColumns(group.label),
                caption: this.caption(group.label),
            }))
    })

    /** Columns of a member group; the first header names the group (Inputs, Outputs…). */
    private memberColumns(groupLabel: string): readonly MDataTableColumn[] {
        const t = (key: string) => this.i18n.t(key, key)
        return [
            {key: 'name', label: t(groupLabel), width: '20%', rowHeader: true},
            {key: 'type', label: t('ui.propsType'), width: '28%'},
            {key: 'default', label: t('ui.propsDefault'), width: '14%'},
            {key: 'description', label: t('ui.propsDescription')},
        ]
    }

    protected readonly slotsCaption = computed(() => this.caption('ui.propsSlots'))
    protected readonly slotColumns = computed<readonly MDataTableColumn[]>(() => [
        {key: 'select', label: this.i18n.t('ui.propsSlots', 'Content slots'), width: '34%', rowHeader: true},
        {key: 'description', label: this.i18n.t('ui.propsDescription', 'Description')},
    ])

    private caption(label: string): string {
        return `${this.entry().name} — ${this.i18n.t(label, label)}`
    }
}
