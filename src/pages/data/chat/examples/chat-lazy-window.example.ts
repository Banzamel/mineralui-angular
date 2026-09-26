import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MChat, MChatBody, MChatHeader, MChatInput, MChatWindow} from '@banzamel/mineralui-angular/data/chat'
import type {MChatMessageData, MChatSendEvent, MChatUser} from '@banzamel/mineralui-angular/data/chat'
import {MText} from '@banzamel/mineralui-angular/typography/text'

const ME: MChatUser = {id: 'me', name: 'You'}
const ANNA: MChatUser = {id: 'anna', name: 'Anna Nowak', online: true}

@Component({
    selector: 'app-chat-lazy-window',
    imports: [MChat, MChatBody, MChatHeader, MChatInput, MChatWindow, MText],
    template: `
        <!-- transform keeps the corner button inside this box; the window itself opens in the top layer. -->
        <div class="app-chat-lazy-window">
            <p mText size="sm" tone="muted">
                Draft: {{ draft() ? '“' + draft() + '”' : 'empty' }} · window {{ open() ? 'open' : 'closed' }}
            </p>
            <m-chat variant="floating" label="Chat with Anna" [unreadCount]="1" [(open)]="open">
                <ng-template mChatWindow>
                    <m-chat-header bordered>Anna Nowak</m-chat-header>
                    <m-chat-body [messages]="messages()" />
                    <!-- The parts are destroyed on close: the draft lives in the page. -->
                    <m-chat-input [(value)]="draft" (send)="post($event)" />
                </ng-template>
            </m-chat>
        </div>
    `,
    styles: `
        .app-chat-lazy-window {
            position: relative;
            height: 120px;
            transform: translateZ(0);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatLazyWindowExample {
    protected readonly open = signal(false)
    protected readonly draft = signal('')
    protected readonly messages = signal<readonly MChatMessageData[]>([
        {
            id: 'a1',
            sender: ANNA,
            content: 'Hi! Type something, close the window and open it again.',
            timestamp: Date.now(),
        },
    ])

    protected post(event: MChatSendEvent): void {
        const message: MChatMessageData = {
            id: `me-${Date.now()}`,
            content: event.content,
            sender: ME,
            timestamp: Date.now(),
            isOwn: true,
            status: 'sent',
        }
        this.messages.update((messages) => [...messages, message])
    }
}
