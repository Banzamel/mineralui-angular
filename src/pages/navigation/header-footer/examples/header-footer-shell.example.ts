import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MFooter} from '@banzamel/mineralui-angular/layout/footer'
import {MHeader} from '@banzamel/mineralui-angular/layout/header'
import {MSection} from '@banzamel/mineralui-angular/layout/section'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-header-footer-shell',
    imports: [MFooter, MHeader, MSection, MText],
    template: `
        <header mHeader container="content">
            <strong mText weight="bold">MineralUI</strong>
            <!-- TEMP: replace with MButton (etap 3) -->
            <button type="button">Contact sales</button>
        </header>

        <section mSection>
            <p mText tone="muted">Main content stays aligned to the same container system as the shell.</p>
        </section>

        <footer mFooter container="content" tone="subtle">
            <p mText size="sm" tone="muted">Built with MineralUI</p>
        </footer>
    `,
    styles: ':host { display: block; width: 100%; }',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderFooterShellExample {}
