import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-text-tags',
    imports: [MStack, MText],
    template: `
        <m-stack>
            <p mText size="lg">A paragraph for body copy.</p>
            <div mText tone="muted">A div when the text wraps other blocks.</div>
            <p mText>
                Inline pieces keep their meaning:
                <strong mText weight="semibold" color="primary">strong emphasis</strong>
                and <em mText tone="accent">stress</em>, or a plain <span mText size="sm">span</span>.
            </p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextTagsExample {}
