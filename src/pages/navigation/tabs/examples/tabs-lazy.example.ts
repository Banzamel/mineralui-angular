import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MTab, MTabContent, MTabLabel, MTabs} from '@banzamel/mineralui-angular/layout/tabs'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-tabs-lazy',
    imports: [MTab, MTabContent, MTabLabel, MTabs, MText],
    template: `
        <m-tabs variant="pills" ariaLabel="Report">
            <m-tab value="summary" label="Summary">
                <p mText>Rendered right away.</p>
            </m-tab>
            <m-tab value="details">
                <!-- A rich label: any markup instead of the label text. -->
                <ng-template mTabLabel>Details <em>(lazy)</em></ng-template>
                <!-- Rendered the first time the tab opens, then kept (its state survives switching). -->
                <ng-template mTabContent>
                    <p mText>Rendered on first open at {{ openedAt }}.</p>
                </ng-template>
            </m-tab>
        </m-tabs>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsLazyExample {
    protected readonly openedAt = new Date().toLocaleTimeString()
}
