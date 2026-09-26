import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {
    injectMChatRouter,
    MChat,
    MChatBody,
    MChatHeader,
    MChatInput,
    MChatRouter,
} from '@banzamel/mineralui-angular/data/chat'
import type {MChatMessageData, MChatSendEvent, MChatUser} from '@banzamel/mineralui-angular/data/chat'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MAvatar} from '@banzamel/mineralui-angular/media/avatar'

const ME: MChatUser = {id: 'me', name: 'You'}
const PEOPLE: readonly MChatUser[] = [
    {id: 'anna', name: 'Anna Nowak', online: true},
    {id: 'jan', name: 'Jan Kowalski'},
]

@Component({
    selector: 'app-chat-router',
    imports: [MAvatar, MButton, MChat, MChatBody, MChatHeader, MChatInput, MInline, MStack],
    template: `
        <m-stack>
            <!-- Anywhere in the app: a people list, a profile menu, a notification. -->
            <m-inline>
                @for (person of people; track person.id) {
                    <button mButton size="sm" variant="outlined" (click)="message(person)">
                        Message {{ person.name }}
                    </button>
                }
            </m-inline>
            <!-- The chat host listens for its scope. -->
            <m-chat class="app-chat-router" label="Support chat">
                <m-chat-header bordered>
                    @if (person(); as current) {
                        <m-avatar size="sm" [name]="current.name" />
                        {{ current.name }}
                    } @else {
                        Pick a person above
                    }
                </m-chat-header>
                <m-chat-body [messages]="thread()" />
                <m-chat-input [disabled]="!person()" (send)="post($event)" />
            </m-chat>
        </m-stack>
    `,
    styles: `
        .app-chat-router {
            height: 320px;
            min-height: 0;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatRouterExample {
    protected readonly people = PEOPLE
    private readonly router = inject(MChatRouter)
    private readonly threads = signal<Readonly<Record<string, readonly MChatMessageData[]>>>({})
    private readonly openId = signal<string | null>(null)
    protected readonly person = computed(() => PEOPLE.find((person) => person.id === this.openId()) ?? null)
    protected readonly thread = computed(() => this.threads()[this.openId() ?? ''] ?? [])

    constructor() {
        injectMChatRouter('support', (request) => this.openId.set(request.conversationId))
    }

    protected message(person: MChatUser): void {
        this.router.open({conversationId: person.id, scope: 'support', user: person})
    }

    protected post(event: MChatSendEvent): void {
        const id = this.openId()
        if (!id) return
        const message: MChatMessageData = {
            id: `${id}-${Date.now()}`,
            content: event.content,
            sender: ME,
            timestamp: Date.now(),
            isOwn: true,
            status: 'sent',
        }
        this.threads.update((threads) => ({...threads, [id]: [...(threads[id] ?? []), message]}))
    }
}
