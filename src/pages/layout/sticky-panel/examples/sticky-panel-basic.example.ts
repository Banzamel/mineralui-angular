import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MGrid, MGridItem} from '@banzamel/mineralui-angular/layout/grid'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MStickyPanel} from '@banzamel/mineralui-angular/layout/sticky-panel'
import {MSurface} from '@banzamel/mineralui-angular/layout/surface'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-sticky-panel-basic',
    imports: [MGrid, MGridItem, MStack, MStickyPanel, MSurface, MText],
    template: `
        <m-grid>
            <m-grid-item [sm]="12" [md]="7">
                <m-stack>
                    @for (section of sections; track section) {
                        <!-- TEMP: replace with MCard (etap 6) -->
                        <div mSurface>
                            <p mText weight="semibold">Section {{ section }}</p>
                            <p mText tone="muted" size="sm">
                                Long-form copy that simulates a detail page. Scroll the page to see the rail on the
                                right stick below the header.
                            </p>
                        </div>
                    }
                </m-stack>
            </m-grid-item>
            <m-grid-item [sm]="12" [md]="5">
                <m-sticky-panel [top]="88" [bottomGap]="32" label="Lessons timeline">
                    <m-stack>
                        <p mText size="sm" weight="semibold">Lessons timeline</p>
                        @for (lesson of lessons; track lesson) {
                            <!-- TEMP: replace with MTimeline (etap 6) -->
                            <div mSurface tone="subtle">
                                <p mText size="sm" weight="semibold">Lesson {{ lesson }}</p>
                                <p mText tone="muted" size="xs">Day {{ lesson }} · 09:00</p>
                            </div>
                        }
                    </m-stack>
                </m-sticky-panel>
            </m-grid-item>
        </m-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyPanelBasicExample {
    protected readonly sections = Array.from({length: 16}, (_, index) => index + 1)
    protected readonly lessons = Array.from({length: 20}, (_, index) => index + 1)
}
