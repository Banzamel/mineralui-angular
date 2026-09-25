import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MCard, MCardBody} from '@banzamel/mineralui-angular/cards/card'
import {MReveal} from '@banzamel/mineralui-angular/display/reveal'
import {MSimpleGrid} from '@banzamel/mineralui-angular/layout/simple-grid'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-reveal-stagger',
    imports: [MCard, MCardBody, MReveal, MSimpleGrid, MText],
    template: `
        <m-simple-grid minItemWidth="160px">
            @for (step of steps; track step; let index = $index) {
                <!-- mReveal sits on the card itself — no wrapper element. -->
                <m-card mReveal [revealDelay]="index * 0.08">
                    <m-card-body>
                        <p mText weight="semibold">{{ index + 1 }}. {{ step }}</p>
                    </m-card-body>
                </m-card>
            }
        </m-simple-grid>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevealStaggerExample {
    protected readonly steps = ['Install', 'Configure', 'Theme', 'Ship']
}
