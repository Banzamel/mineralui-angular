import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {
    MChat,
    MChatBody,
    MChatConversationItem,
    MChatConversationList,
    MChatHeader,
    MChatInput,
    MChatTypingIndicator,
} from '@banzamel/mineralui-angular/data/chat'
import type {
    MChatConversation,
    MChatMessageData,
    MChatSendEvent,
    MChatUser,
    MChatVariant,
} from '@banzamel/mineralui-angular/data/chat'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MAvatar} from '@banzamel/mineralui-angular/media/avatar'
import type {MColor} from '@banzamel/mineralui-angular/theme'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import chatLazyWindow from '@generated/examples/data/chat/chat-lazy-window'
import chatRouter from '@generated/examples/data/chat/chat-router'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl, sliderControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'news']
const VARIANTS: readonly MChatVariant[] = ['inline', 'floating']
const MINUTE = 60_000

const ME: MChatUser = {id: 'me', name: 'You'}
const ANNA: MChatUser = {id: 'anna', name: 'Anna Nowak', online: true}
const JAN: MChatUser = {id: 'jan', name: 'Jan Kowalski'}
const EWA: MChatUser = {id: 'ewa', name: 'Ewa Wiśniewska', online: true}

function message(
    id: string,
    sender: MChatUser,
    content: string,
    minutesAgo: number,
    extra: Partial<MChatMessageData> = {}
): MChatMessageData {
    return {id, sender, content, timestamp: Date.now() - minutesAgo * MINUTE, isOwn: sender === ME, ...extra}
}

const THREADS: Readonly<Record<string, readonly MChatMessageData[]>> = {
    anna: [
        message('a1', ANNA, 'Hi! Did you get a chance to look at the new dashboard?', 42),
        message('a2', ME, 'Yes — the widget grid feels great. Two small notes coming.', 38, {status: 'read'}),
        message('a3', ANNA, 'Perfect, send them over 🙌', 36),
        message('a4', ME, 'The legend could use units, and the empty state needs a hint.', 5, {status: 'delivered'}),
    ],
    jan: [
        message('j1', JAN, 'Are we still on for the release on Friday?', 180),
        message('j2', ME, 'Yes, the checklist is almost done.', 170, {status: 'read'}),
    ],
    ewa: [message('e1', EWA, 'Can you review my pull request?', 1500)],
}

const CONVERSATIONS: readonly MChatConversation[] = [
    {id: 'anna', participants: [ANNA], lastMessage: THREADS['anna']?.at(-1), unreadCount: 2},
    {id: 'jan', participants: [JAN], lastMessage: THREADS['jan']?.at(-1)},
    {id: 'ewa', participants: [EWA], lastMessage: THREADS['ewa']?.at(-1), unreadCount: 1},
]

@Component({
    selector: 'doc-chat-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPreview,
        DocPropsTable,
        MAvatar,
        MChat,
        MChatBody,
        MChatConversationItem,
        MChatConversationList,
        MChatHeader,
        MChatInput,
        MChatTypingIndicator,
        MStack,
        MText,
    ],
    template: `
        <doc-article
            title="MChat"
            description="Chat shell composed of parts: a conversation list, a header, the message log, a typing indicator and the message field — inline in the page or as a floating window."
        >
            <doc-section
                title="Playground"
                description="Pick a conversation and send a message (Enter sends, Shift+Enter adds a line). The floating variant puts a round button in the corner of the page; it opens the chat as a non-modal dialog and Escape closes it."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <m-stack class="doc-chat">
                        <m-chat
                            class="doc-chat-shell"
                            [class.doc-chat-narrow]="!showConversations()"
                            [variant]="variant()"
                            [color]="color()"
                            [unreadCount]="unreadCount()"
                            [(open)]="open"
                        >
                            @if (showConversations()) {
                                <m-chat-conversation-list>
                                    @for (conversation of conversations(); track conversation.id) {
                                        <m-chat-conversation-item
                                            [conversation]="conversation"
                                            [active]="conversation.id === activeId()"
                                            (itemClick)="select($event)"
                                        />
                                    }
                                </m-chat-conversation-list>
                            }
                            <m-chat-header bordered>
                                <m-avatar
                                    size="sm"
                                    badgeColor="success"
                                    [name]="activeUser().name"
                                    [badge]="activeUser().online ?? false"
                                />
                                <div>
                                    <p mText size="sm" weight="semibold">{{ activeUser().name }}</p>
                                    <p mText size="sm" tone="muted">{{ activeUser().online ? 'Online' : 'Offline' }}</p>
                                </div>
                            </m-chat-header>
                            <m-chat-body [messages]="thread()" [loading]="loading()" />
                            <m-chat-typing-indicator [users]="showTyping() ? [activeUser()] : []" />
                            <m-chat-input [showEmoji]="showEmoji()" [showAttach]="showAttach()" (send)="post($event)" />
                        </m-chat>
                        @if (variant() === 'floating') {
                            <p mText size="sm" tone="muted">
                                The chat button is in the bottom-right corner of the page.
                            </p>
                        }
                    </m-stack>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Opening a chat from anywhere"
                description="MChatRouter carries open requests from any part of the app to the chat host — no imports between them. open({conversationId, scope, user}) sends one; injectMChatRouter(scope, onOpen) listens for the lifetime of the component. Requests without a scope reach every host, so several chat surfaces can live side by side."
            >
                <doc-preview [example]="examples.router" />
            </doc-section>

            <doc-section
                title="Creating the window on open"
                description="Projected parts live for as long as the chat — Angular creates projected content even while the floating window is closed. Put the parts in <ng-template mChatWindow> and they are created when the window opens and destroyed when it closes (as in React). Keep the draft across openings with [(value)] on the input; the scroll position starts over."
            >
                <doc-preview [example]="examples.lazyWindow" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The inline chat is a named region; the floating one a non-modal dialog opened by a button with aria-expanded (its name includes the unread count), focus moves to the message field and returns to the button on Escape. The body is a polite log (focusable, so it scrolls from the keyboard, aria-busy while loading older messages); own messages carry a hidden 'You' and the read receipt in text. Conversations are buttons in a named list, the open one with aria-current. The typing indicator is a status region. The emoji picker is a dialog with the arrow keys moving over the grid."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="open + onToggle become [(open)]; the floating window lives in the top layer (React: a fixed div in a portal). openMChat / useMChatRouter become the MChatRouter service and injectMChatRouter (React: window events). onSend(content, images) becomes (send) with {content, images}, onTyping (typing), onScrollTop (reachedTop), the conversation onClick (itemClick); MChatInput has a [(value)] draft and inserts emoji at the caret. The floating window mounts its content on open only with ng-template mChatWindow. Every text comes from the mineralui.chat.* dictionary (React: hard-coded English)."
            />

            <doc-section title="API">
                <m-stack>
                    <doc-props-table api="MChat" />
                    <doc-props-table api="MChatBody" />
                    <doc-props-table api="MChatMessage" />
                    <doc-props-table api="MChatInput" />
                    <doc-props-table api="MChatTypingIndicator" />
                    <doc-props-table api="MChatConversationList" />
                    <doc-props-table api="MChatConversationItem" />
                    <doc-props-table api="MChatHeader" />
                    <doc-props-table api="MChatWindow" />
                    <doc-props-table api="MChatMessageData" />
                    <doc-props-table api="MChatConversation" />
                    <doc-props-table api="MChatUser" />
                    <doc-props-table api="MChatSendEvent" />
                    <doc-props-table api="MChatOpenRequest" />
                </m-stack>
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-chat {
            width: 100%;
        }

        .doc-chat-shell.m-inline {
            height: 460px;
            max-width: 720px;
        }

        .doc-chat-shell.doc-chat-narrow.m-inline {
            max-width: 420px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage {
    protected readonly examples = {router: chatRouter, lazyWindow: chatLazyWindow}

    protected readonly variant = signal<MChatVariant>('inline')
    protected readonly color = signal<MColor>('primary')
    protected readonly showEmoji = signal(true)
    protected readonly showAttach = signal(true)
    protected readonly showConversations = signal(true)
    protected readonly showTyping = signal(false)
    protected readonly loading = signal(false)
    protected readonly unreadCount = signal(3)
    protected readonly open = signal(false)
    protected readonly controls = [
        selectControl('variant', this.variant, VARIANTS),
        selectControl('color', this.color, COLORS),
        booleanControl('showEmoji', this.showEmoji),
        booleanControl('showAttach', this.showAttach),
        booleanControl('showConversations', this.showConversations),
        booleanControl('showTyping', this.showTyping),
        booleanControl('loading', this.loading),
        sliderControl('unreadCount', this.unreadCount, {min: 0, max: 20}),
    ]

    protected readonly activeId = signal('anna')
    private readonly threads = signal(THREADS)
    private readonly readIds = signal<readonly string[]>(['anna'])
    protected readonly conversations = computed(() =>
        CONVERSATIONS.map((conversation) => ({
            ...conversation,
            lastMessage: this.threads()[conversation.id]?.at(-1),
            unreadCount: this.readIds().includes(conversation.id) ? 0 : conversation.unreadCount,
        }))
    )
    protected readonly activeUser = computed(
        () => CONVERSATIONS.find((conversation) => conversation.id === this.activeId())?.participants[0] ?? ANNA
    )
    protected readonly thread = computed(() => this.threads()[this.activeId()] ?? [])

    protected readonly code = computed(() => {
        const floating = this.variant() === 'floating'
        const attrs = [
            floating && 'variant="floating"',
            floating && '[(open)]="chatOpen"',
            floating && '[unreadCount]="unread()"',
            this.color() !== 'primary' && `color="${this.color()}"`,
        ].filter((attr) => typeof attr === 'string')
        const list = this.showConversations()
            ? `    <m-chat-conversation-list>\n        @for (c of conversations(); track c.id) {\n            <m-chat-conversation-item [conversation]="c" [active]="c.id === activeId()" (itemClick)="select($event)" />\n        }\n    </m-chat-conversation-list>\n`
            : ''
        const typing = this.showTyping() ? '    <m-chat-typing-indicator [users]="typing()" />\n' : ''
        const inputAttrs = [
            !this.showEmoji() && '[showEmoji]="false"',
            !this.showAttach() && '[showAttach]="false"',
            '(send)="post($event)"',
        ].filter((attr) => typeof attr === 'string')
        return (
            `<m-chat${attrs.length ? ' ' + attrs.join(' ') : ''}>\n${list}` +
            `    <m-chat-header bordered>{{ person().name }}</m-chat-header>\n` +
            `    <m-chat-body [messages]="thread()"${this.loading() ? ' loading' : ''} />\n${typing}` +
            `    <m-chat-input ${inputAttrs.join(' ')} />\n</m-chat>`
        )
    })

    protected select(conversation: MChatConversation): void {
        this.activeId.set(conversation.id)
        this.readIds.update((ids) => (ids.includes(conversation.id) ? ids : [...ids, conversation.id]))
    }

    protected post(event: MChatSendEvent): void {
        const id = this.activeId()
        const sent: MChatMessageData = {
            id: `${id}-${Date.now()}`,
            content: event.content,
            sender: ME,
            timestamp: Date.now(),
            isOwn: true,
            status: 'sent',
            images: event.images.length > 0 ? event.images.map((file) => URL.createObjectURL(file)) : undefined,
        }
        this.threads.update((threads) => ({...threads, [id]: [...(threads[id] ?? []), sent]}))
    }
}
