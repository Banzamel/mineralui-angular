import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {MLink} from '@banzamel/mineralui-angular/typography/link'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-link-button',
    imports: [MLink, MText],
    template: `
        <p mText>
            MineralUI ships 135 components across 13 groups.
            @if (expanded()) {
                Each group is its own entry point, and each component too — import only what you use.
            }
        </p>
        <button mLink type="button" tone="accent" [attr.aria-expanded]="expanded()" (click)="expanded.set(!expanded())">
            {{ expanded() ? 'Show less' : 'Show more' }}
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkButtonExample {
    protected readonly expanded = signal(false)
}
