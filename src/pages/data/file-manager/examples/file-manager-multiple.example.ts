import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MFileManager, MFileManagerDetails} from '@banzamel/mineralui-angular/data/file-manager'
import type {MFileManagerActionEvent, MFileManagerNode} from '@banzamel/mineralui-angular/data/file-manager'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {mAttachIcon} from '@banzamel/mineralui-angular/icons'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const FILES: readonly MFileManagerNode[] = [
    {
        id: 'contracts',
        label: 'Contracts',
        kind: 'folder',
        children: [
            {id: 'nda', label: 'nda-2026.pdf', size: 128_000, description: 'Signed by both parties'},
            {id: 'offer', label: 'offer.pdf', size: 342_000},
            {id: 'scan', label: 'scan.tiff', size: 8_400_000, description: 'Raw scan — not an attachment'},
        ],
    },
    {id: 'agenda', label: 'agenda.pdf', size: 64_000, modifiedAt: '2026-10-20T09:00:00Z'},
    {id: 'photo', label: 'team-photo.png', size: 1_920_000, description: 'Kick-off, October'},
    {id: 'export', label: 'export.zip', size: 52_000_000},
]

@Component({
    selector: 'app-file-manager-multiple',
    imports: [MBadge, MFileManager, MFileManagerDetails, MText],
    template: `
        <m-file-manager
            selectionMode="multiple"
            accept=".pdf,.png"
            [items]="files"
            [toolbarActions]="toolbar"
            [(checked)]="checked"
            [(selected)]="selected"
            (toolbarAction)="onToolbar($event)"
        >
            <ng-template mFileManagerDetails let-node let-path="path">
                <span mText weight="semibold">{{ node.label }}</span>
                <span mText size="sm" tone="muted">{{ node.description ?? 'No description' }}</span>
                <m-badge size="sm" [color]="checked().includes(node.id) ? 'success' : 'neutral'">{{
                    checked().includes(node.id) ? 'Attached' : 'Not attached'
                }}</m-badge>
                <span mText size="sm" tone="muted">{{ path.length - 1 }} folder(s) deep</span>
            </ng-template>
        </m-file-manager>
        <p mText size="sm" tone="muted">{{ log() }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileManagerMultipleExample {
    protected readonly files = FILES
    protected readonly checked = signal<readonly string[]>(['agenda'])
    protected readonly selected = signal<string | null>('agenda')
    protected readonly log = signal('PDF and PNG files can be attached.')
    protected readonly toolbar = [{id: 'attach', label: 'Attach', icon: mAttachIcon, variant: 'filled' as const}]

    protected onToolbar(event: MFileManagerActionEvent): void {
        this.log.set(`Attach ${event.checked.length} file(s): ${event.checked.join(', ') || '—'}`)
    }
}
