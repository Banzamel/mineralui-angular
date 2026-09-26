import {ChangeDetectionStrategy, Component, signal, viewChild} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MTimelineBoard} from '@banzamel/mineralui-angular/data/timeline-board'
import type {
    MTimelineBoardEvent,
    MTimelineBoardEventActionEvent,
    MTimelineBoardMenuFn,
    MTimelineBoardPersonClickEvent,
    MTimelineBoardRow,
    MTimelineBoardUnavailableSlot,
} from '@banzamel/mineralui-angular/data/timeline-board'
import {mBookIcon, mBuildingIcon, mCameraIcon, mEditIcon, mEyeIcon, mTrashIcon} from '@banzamel/mineralui-angular/icons'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const today = new Date()
const at = (hour: number, minute = 0) => new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute)

@Component({
    selector: 'app-timeline-board-rooms',
    imports: [MButton, MInline, MStack, MText, MTimelineBoard],
    template: `
        <m-stack>
            <m-inline>
                <button mButton size="sm" variant="outlined" (click)="board().scrollToTime(at(8), {align: 'start'})">
                    Start at 08:00
                </button>
                <button mButton size="sm" variant="outlined" (click)="board().scrollToTime(at(19, 30))">
                    Jump to 19:30
                </button>
                <button mButton size="sm" variant="ghost" (click)="board().scrollToNow()">Back to now</button>
            </m-inline>
            <m-timeline-board
                label="Room bookings"
                workdayStart="08:00"
                workdayEnd="20:00"
                peopleClickable
                [height]="440"
                [fullHeight]="false"
                [pixelsPerHour]="140"
                [rows]="rooms"
                [events]="bookings"
                [unavailableSlots]="blocked"
                [eventMenuItems]="menu"
                (eventAction)="onAction($event)"
                (personClick)="onPerson($event)"
            />
            <p mText size="sm" tone="muted" role="status">{{ status() }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineBoardRoomsExample {
    protected readonly board = viewChild.required(MTimelineBoard)
    protected readonly at = at
    protected readonly status = signal('Open a booking for its people and actions.')

    protected readonly rooms: readonly MTimelineBoardRow[] = [
        {id: 'atlas', label: 'Atlas', sublabel: '12 seats', icon: mBuildingIcon, color: '#0ea5e9'},
        {id: 'borealis', label: 'Borealis', sublabel: '6 seats', icon: mBuildingIcon, color: '#22c55e'},
        {
            id: 'library',
            label: 'Library',
            sublabel: 'Opens 10:00',
            icon: mBookIcon,
            color: '#a855f7',
            workdaySpec: {start: '10:00', end: '18:00'},
        },
        {id: 'studio', label: 'Studio', sublabel: 'Online', icon: mCameraIcon, color: '#f59e0b'},
    ]

    protected readonly bookings: readonly MTimelineBoardEvent[] = [
        {
            id: 'b1',
            rowId: 'atlas',
            title: 'Algebra',
            startAt: at(8, 30),
            endAt: at(10),
            color: '#0ea5e9',
            location: 'Atlas, 2nd floor',
            leader: {name: 'Anna Kowalska', role: 'Teacher'},
            participants: [{name: 'Jan Nowak'}, {name: 'Ola Wiśniewska'}, {name: 'Piotr Zieliński'}],
            capacity: 12,
        },
        {id: 'b2', rowId: 'atlas', title: 'Physics', startAt: at(9, 30), endAt: at(11), color: '#0ea5e9'},
        {id: 'b3', rowId: 'borealis', title: 'Chemistry', startAt: at(11), endAt: at(12, 30), color: '#22c55e'},
        {id: 'b4', rowId: 'library', title: 'Reading club', startAt: at(14), endAt: at(15, 30), color: '#a855f7'},
        {id: 'b5', rowId: 'studio', title: 'Evening stream', startAt: at(19, 30), endAt: at(21), color: '#f59e0b'},
    ]

    protected readonly blocked: readonly MTimelineBoardUnavailableSlot[] = [
        {rowId: 'borealis', startAt: at(13), endAt: at(15), kind: 'maintenance', label: 'Projector repair'},
        {rowId: 'studio', startAt: at(8), endAt: at(12), kind: 'closed', label: 'Studio closed'},
    ]

    protected readonly menu: MTimelineBoardMenuFn = () => [
        {id: 'view', label: 'View booking', icon: mEyeIcon},
        {id: 'edit', label: 'Edit booking', icon: mEditIcon},
        {id: 'cancel', label: 'Cancel booking', icon: mTrashIcon, color: 'error'},
    ]

    protected onAction({actionId, event}: MTimelineBoardEventActionEvent): void {
        this.status.set(`${actionId}: ${event.title}`)
    }

    protected onPerson({person, role}: MTimelineBoardPersonClickEvent): void {
        this.status.set(`${role}: ${person.name}`)
    }
}
