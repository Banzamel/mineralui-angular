import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core'
import {RouterLink} from '@angular/router'
import {MAlert} from '@banzamel/mineralui-angular/feedback/alert'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MLink} from '@banzamel/mineralui-angular/typography/link'
import {getMineralComponentPlan} from '@banzamel/mineralui-angular/utils'

/**
 * Notice on a page that documents Pro components (docs-react `DocsProNotice`). Renders nothing unless at least one of
 * `components` is Pro in the library's licensing metadata — the page lists what it documents, the library decides.
 * Projected content goes after `reason` (e.g. which entry point holds the Pro part).
 */
@Component({
    selector: 'doc-pro-notice',
    imports: [MAlert, MCode, MLink, RouterLink],
    template: `
        @if (isPro()) {
            <m-alert color="warning" heading="MineralUI Pro">
                This page documents a Pro surface:
                @for (component of components(); track component; let last = $last) {
                    <code mCode>{{ component }}</code
                    >{{ last ? '.' : ', ' }}
                }
                {{ reason() }}
                <ng-content />
                It ships in <code mCode>&#64;banzamel/mineralui-angular-pro</code> —
                <a mLink tone="accent" underline="always" routerLink="/docs/installation" fragment="mineralui-pro"
                    >install and activate Pro</a
                >.
            </m-alert>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocProNotice {
    /** Public names of the components the page documents (as in `licensing.ts`). */
    readonly components = input.required<readonly string[]>()
    /** Why the surface is Pro — one sentence after the component list. */
    readonly reason = input.required<string>()

    protected readonly isPro = computed(() =>
        this.components().some((component) => getMineralComponentPlan(component) === 'pro')
    )
}
