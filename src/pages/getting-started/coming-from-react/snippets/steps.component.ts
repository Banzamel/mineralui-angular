import {ChangeDetectionStrategy, Component} from '@angular/core'
import {RouterLink} from '@angular/router'
// One entry point per component (React: one per group, `@banzamel/mineralui/controls`).
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'

@Component({
    selector: 'app-steps',
    imports: [RouterLink, MButton, MHeading, MList, MListItem],
    template: `
        <!-- The tag is the API: no level, ordered, component or to inputs. -->
        <h2 mHeading>Getting started</h2>
        <ol mList>
            <li mListItem>Install the package</li>
            <li mListItem>Add the providers</li>
        </ol>
        <a mButton routerLink="/docs" variant="outlined">Read the docs</a>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Steps {}
