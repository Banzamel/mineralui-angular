import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MTimeline, MTimelineItem} from '@banzamel/mineralui-angular/display/timeline'
import type {MTimelineAlign} from '@banzamel/mineralui-angular/display/timeline'
import {mBellIcon, mCheckIcon, MIcon, mMailIcon, mStarIcon} from '@banzamel/mineralui-angular/icons'
import type {MColor, MSize} from '@banzamel/mineralui-angular/theme'
import timelineActivity from '@generated/examples/display/timeline/timeline-activity'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {selectControl} from '@kit/doc-playground/playground-controls'
import {DocPreview} from '@kit/doc-preview/doc-preview'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const ALIGNS: readonly MTimelineAlign[] = ['left', 'right', 'alternate']
const SIZES: readonly MSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const COLORS: readonly MColor[] = ['primary', 'neutral', 'success', 'error', 'warning', 'info', 'light', 'dark', 'news']

@Component({
    selector: 'doc-timeline-page',
    imports: [DocArticle, DocSection, DocPlayground, DocPreview, DocPropsTable, MIcon, MTimeline, MTimelineItem],
    template: `
        <doc-article
            title="MTimeline"
            description="Vertical timeline for order histories, changelogs and activity feeds, with the line on the left, the right or in the middle."
        >
            <doc-section title="Playground" description="Switch the alignment, size and default dot color.">
                <doc-playground [controls]="controls" [code]="code()">
                    <ol mTimeline class="doc-timeline-stage" [align]="align()" [size]="size()" [color]="color()">
                        <li
                            mTimelineItem
                            heading="Order placed"
                            description="Your order #2137 has been confirmed."
                            date="2025-04-08 09:00"
                            color="success"
                        >
                            <m-icon mStart [icon]="icons.check" />
                        </li>
                        <li
                            mTimelineItem
                            heading="Payment received"
                            description="We received your payment of 249.00 PLN."
                            date="2025-04-08 09:15"
                        >
                            <m-icon mStart [icon]="icons.star" />
                        </li>
                        <li
                            mTimelineItem
                            heading="Shipping notification"
                            description="Your package has been dispatched."
                            date="2025-04-08 14:30"
                            color="info"
                        >
                            <m-icon mStart [icon]="icons.mail" />
                        </li>
                        <li
                            mTimelineItem
                            heading="Delivered"
                            description="Package delivered to the pickup point."
                            date="2025-04-09 10:00"
                            color="success"
                        >
                            <m-icon mStart [icon]="icons.bell" />
                        </li>
                    </ol>
                </doc-playground>
            </doc-section>

            <doc-section
                title="Activity feed"
                description="Items can be rendered with @for; extra content (links, buttons) goes into the item after its date. When the date is not machine-readable, pass it in dateTime."
            >
                <doc-preview [example]="examples.activity" />
            </doc-section>

            <doc-section
                title="Accessibility"
                description="The timeline is an ordered list (ol[mTimeline] > li[mTimelineItem]), the dots are decorative and hidden from screen readers, and the date is a <time> element."
            />

            <doc-section
                title="Differences from MineralUI for React"
                description="MTimeline goes on your own <ol> (React renders divs and reads its MTimelineItem children's props). title is heading, the icon is the [mStart] slot, and id is gone — use track in @for."
            />

            <doc-section title="API">
                <doc-props-table api="MTimeline" />
                <doc-props-table api="MTimelineItem" />
            </doc-section>
        </doc-article>
    `,
    styles: `
        .doc-timeline-stage {
            max-width: 640px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelinePage {
    protected readonly examples = {activity: timelineActivity}
    protected readonly icons = {check: mCheckIcon, star: mStarIcon, mail: mMailIcon, bell: mBellIcon}

    protected readonly align = signal<MTimelineAlign>('left')
    protected readonly size = signal<MSize>('md')
    protected readonly color = signal<MColor>('primary')
    protected readonly controls = [
        selectControl('align', this.align, ALIGNS),
        selectControl('size', this.size, SIZES),
        selectControl('color', this.color, COLORS),
    ]

    protected readonly code = computed(() => {
        const attrs = [
            this.align() !== 'left' && `align="${this.align()}"`,
            this.size() !== 'md' && `size="${this.size()}"`,
            this.color() !== 'primary' && `color="${this.color()}"`,
        ].filter((attr) => typeof attr === 'string')
        return [
            `<ol mTimeline${attrs.map((attr) => ` ${attr}`).join('')}>`,
            '    <li mTimelineItem heading="Order placed" date="2025-04-08 09:00" color="success">',
            '        <m-icon mStart [icon]="mCheckIcon" />',
            '    </li>',
            '    <li mTimelineItem heading="Payment received" date="2025-04-08 09:15">',
            '        <m-icon mStart [icon]="mStarIcon" />',
            '    </li>',
            '</ol>',
        ].join('\n')
    })
}
