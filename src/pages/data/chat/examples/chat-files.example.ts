import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {
    MChat,
    MChatBody,
    MChatConversationItem,
    MChatConversationList,
    MChatHeader,
    MChatInput,
} from '@banzamel/mineralui-angular/data/chat'
import type {
    MChatAttachRejectEvent,
    MChatConversation,
    MChatMessageData,
    MChatSendEvent,
    MChatUser,
} from '@banzamel/mineralui-angular/data/chat'
import {mFileTextIcon, MIcon, mInfoIcon, mPhoneIcon} from '@banzamel/mineralui-angular/icons'
import {MAvatar} from '@banzamel/mineralui-angular/media/avatar'

const ME: MChatUser = {id: 'me', name: 'You'}
const ANNA: MChatUser = {id: 'anna', name: 'Anna Nowak', online: true}
const JAN: MChatUser = {id: 'jan', name: 'Jan Kowalski'}
const EWA: MChatUser = {id: 'ewa', name: 'Ewa Wiśniewska'}
const MINUTE = 60_000
const MAX_SIZE = 5 * 1024 * 1024
const REASONS = {type: 'is not a PDF, document or image', size: 'is over 5 MB', count: 'is over the limit of 3 files'}

// A group of three: without its own avatar the list shows the initials of the title.
const CONVERSATIONS: readonly MChatConversation[] = [
    {id: 'team', title: 'Lesson plan team', participants: [ANNA, JAN, EWA]},
    {id: 'anna', participants: [ANNA]},
]

const THREAD: readonly MChatMessageData[] = [
    {
        id: 'm1',
        sender: ANNA,
        timestamp: Date.now() - 30 * MINUTE,
        content: 'Hi all,\nthe plan for lesson 3 is attached.\n\nAnna',
        attachments: [
            {id: 'f1', name: 'lesson-3-plan.pdf', url: 'data:application/pdf,', size: 248_000},
            {id: 'f2', name: 'worksheet.docx', url: 'data:application/octet-stream,', size: 31_200},
        ],
    },
    {
        id: 'm2',
        sender: JAN,
        timestamp: Date.now() - 12 * MINUTE,
        content: '',
        images: ['https://picsum.photos/seed/mineral-board/480/320'],
    },
    {id: 'm3', sender: ME, isOwn: true, status: 'read', timestamp: Date.now() - 5 * MINUTE, content: 'Thanks!'},
]

@Component({
    selector: 'app-chat-files',
    imports: [
        MAvatar,
        MButton,
        MChat,
        MChatBody,
        MChatConversationItem,
        MChatConversationList,
        MChatHeader,
        MChatInput,
        MIcon,
    ],
    template: `
        <m-chat class="app-chat-files" label="Team chat">
            <m-chat-conversation-list>
                @for (conversation of conversations; track conversation.id) {
                    <m-chat-conversation-item [conversation]="conversation" [active]="conversation.id === 'team'" />
                }
            </m-chat-conversation-list>
            <m-chat-header bordered>
                <m-avatar size="sm" name="Lesson plan team" />
                Lesson plan team
                <button mButton mChatHeaderActions variant="ghost" size="sm" iconOnly aria-label="Call">
                    <m-icon [icon]="phoneIcon" />
                </button>
                <button mButton mChatHeaderActions variant="ghost" size="sm" iconOnly aria-label="Details">
                    <m-icon [icon]="infoIcon" />
                </button>
            </m-chat-header>
            <m-chat-body [messages]="thread()" />
            <m-chat-input
                #chatInput="mChatInput"
                attachAccept=".pdf,.docx,image/*"
                [maxFiles]="3"
                [maxSize]="maxSize"
                (send)="post($event)"
                (attachReject)="reject($event)"
            >
                <button
                    mButton
                    mChatInputActions
                    variant="ghost"
                    size="sm"
                    iconOnly
                    aria-label="Insert template"
                    (click)="chatInput.insertText('See you in room 12 at 10:00.')"
                >
                    <m-icon [icon]="templateIcon" />
                </button>
            </m-chat-input>
        </m-chat>
        <p class="app-chat-files-status" role="status">{{ notice() }}</p>
    `,
    styles: `
        .app-chat-files {
            height: 480px;
            min-height: 0;
        }

        .app-chat-files-status {
            min-height: 1.5em;
            margin: 8px 0 0;
            color: var(--mineral-text-secondary);
            font-size: var(--mineral-font-size-sm);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatFilesExample {
    protected readonly conversations = CONVERSATIONS
    protected readonly phoneIcon = mPhoneIcon
    protected readonly infoIcon = mInfoIcon
    protected readonly templateIcon = mFileTextIcon
    protected readonly maxSize = MAX_SIZE
    private readonly sent = signal<readonly MChatMessageData[]>([])
    protected readonly thread = computed(() => [...THREAD, ...this.sent()])
    protected readonly notice = signal('')
    private readonly urls: string[] = []

    constructor() {
        inject(DestroyRef).onDestroy(() => this.urls.forEach((url) => URL.revokeObjectURL(url)))
    }

    protected post(event: MChatSendEvent): void {
        const link = (file: File) => {
            const url = URL.createObjectURL(file)
            this.urls.push(url)
            return url
        }
        const others = event.files.filter((file) => !event.images.includes(file))
        const message: MChatMessageData = {
            id: `sent-${Date.now()}`,
            sender: ME,
            isOwn: true,
            status: 'sent',
            timestamp: Date.now(),
            content: event.content,
            images: event.images.map(link),
            attachments: others.map((file, index) => ({
                id: `${Date.now()}-${index}`,
                name: file.name,
                url: link(file),
                size: file.size,
                mime: file.type,
            })),
        }
        this.sent.update((list) => [...list, message])
        this.notice.set('')
    }

    protected reject({file, reason}: MChatAttachRejectEvent): void {
        this.notice.set(`${file.name} ${REASONS[reason]}.`)
    }
}
