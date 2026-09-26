import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MAvatar} from '@banzamel/mineralui-angular/media/avatar'
import type {MAvatarPresence, MAvatarShape} from '@banzamel/mineralui-angular/media/avatar'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import avatarTeam from '@generated/examples/media/avatar/avatar-team'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'
import {SAMPLE_PEOPLE} from '../media-samples'

const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '48'] as const
const SHAPES: readonly MAvatarShape[] = ['circle', 'rounded', 'square']
const PRESENCES = ['none', 'online', 'offline', 'away', 'busy'] as const
const BADGES = ['none', 'dot', '5'] as const
const PHOTO = SAMPLE_PEOPLE[0].avatar

@Component({
    selector: 'doc-avatar-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MAvatar],
    template: `
        <doc-article
            title="MAvatar"
            description="Identity primitive for users, assignees and compact profile cues, with presence and notification badges."
        >
            <doc-section
                title="Playground"
                description="Switch between initials and a photo, presence dot and notification count in one preview."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    @if (interactive()) {
                        <button
                            mAvatar
                            name="Anna Kowalska"
                            [src]="src()"
                            [size]="avatarSize()"
                            [shape]="shape()"
                            [color]="color()"
                            [presence]="presenceValue()"
                            [badge]="badgeValue()"
                            [badgeColor]="badgeColorValue()"
                            [skeleton]="skeleton()"
                        ></button>
                    } @else {
                        <m-avatar
                            name="Anna Kowalska"
                            [src]="src()"
                            [size]="avatarSize()"
                            [shape]="shape()"
                            [color]="color()"
                            [presence]="presenceValue()"
                            [badge]="badgeValue()"
                            [badgeColor]="badgeColorValue()"
                            [skeleton]="skeleton()"
                        />
                    }
                </doc-playground>
            </doc-section>

            <doc-section
                title="Team row"
                description="Photos, initials, presence presets and counts side by side. An avatar that opens a profile is a link (a[mAvatar] with routerLink or href); one that runs an action is a button."
            >
                <doc-preview [example]="examples.team" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="A plain avatar is an image (role img) named by alt or name — the photo inside has an empty alt and the initials are hidden, so the name is read once. The presence status joins the name ('Anna Kowalska (online)', mineralui.avatar.withPresence / .presence.*) instead of relying on the dot color alone. On a link or a button the same text is the control's name. Skeleton mode sets aria-busy and the name mineralui.avatar.loading."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="role, tabIndex and onClick on a span are replaced by a[mAvatar] and button[mAvatar] — native controls with focus and keyboard. hidden becomes hiddenUpTo / hiddenAbove. The badge takes a count, text or true (no ReactNode). New: a failing photo falls back to the initials, the presence status is part of the accessible name, and color also tints the border and focus ring (in React it only changed the background)."
            />

            <doc-section title="MAvatar API">
                <doc-props-table api="MAvatar" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarPage {
    protected readonly examples = {team: avatarTeam}

    protected readonly content = signal<'fallback' | 'image'>('fallback')
    protected readonly size = signal<(typeof SIZES)[number]>('md')
    protected readonly shape = signal<MAvatarShape>('circle')
    protected readonly color = signal<MColor>('primary')
    protected readonly presence = signal<(typeof PRESENCES)[number]>('none')
    protected readonly badge = signal<(typeof BADGES)[number]>('none')
    protected readonly badgeColor = signal<MColor>('primary')
    protected readonly interactive = signal(false)
    protected readonly skeleton = signal(false)
    protected readonly controls = [
        selectControl('content', this.content, ['fallback', 'image']),
        selectControl('size', this.size, SIZES),
        selectControl('shape', this.shape, SHAPES),
        selectControl('color', this.color, COLORS),
        selectControl('presence', this.presence, PRESENCES),
        selectControl('badge', this.badge, BADGES),
        selectControl('badgeColor', this.badgeColor, COLORS),
        booleanControl('interactive', this.interactive),
        booleanControl('skeleton', this.skeleton),
    ]

    protected readonly src = computed(() => (this.content() === 'image' ? PHOTO : undefined))
    protected readonly avatarSize = computed((): MSize | number => {
        const size = this.size()
        return size === '48' ? 48 : size
    })
    protected readonly presenceValue = computed((): MAvatarPresence | undefined => {
        const presence = this.presence()
        return presence === 'none' ? undefined : presence
    })
    protected readonly badgeValue = computed(() => {
        const badge = this.badge()
        return badge === 'dot' ? true : badge === '5' ? 5 : undefined
    })
    protected readonly badgeColorValue = computed(() => (this.badge() === 'none' ? undefined : this.badgeColor()))

    protected readonly code = computed(() => {
        const size = this.size()
        const attrs = [
            this.interactive() && 'mAvatar',
            'name="Anna Kowalska"',
            this.content() === 'image' && 'src="/avatars/anna.jpg"',
            size !== 'md' && (size === '48' ? '[size]="48"' : `size="${size}"`),
            this.shape() !== 'circle' && `shape="${this.shape()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
            this.presence() !== 'none' && `presence="${this.presence()}"`,
            this.badge() === 'dot' && 'badge',
            this.badge() === '5' && '[badge]="5"',
            this.badge() !== 'none' && this.badgeColor() !== 'primary' && `badgeColor="${this.badgeColor()}"`,
            this.skeleton() && 'skeleton',
            this.interactive() && '(click)="openProfile()"',
        ].filter((attr) => typeof attr === 'string')
        return this.interactive() ? `<button ${attrs.join(' ')}></button>` : `<m-avatar ${attrs.join(' ')} />`
    })
}
