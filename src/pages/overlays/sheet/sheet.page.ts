import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core'
import {MCard, MCardBody} from '@banzamel/mineralui-angular/cards/card'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MInline} from '@banzamel/mineralui-angular/layout/inline'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MSheet, MSheetFooter} from '@banzamel/mineralui-angular/overlays/sheet'
import type {MSheetSize} from '@banzamel/mineralui-angular/overlays/sheet'
import {MCode} from '@banzamel/mineralui-angular/typography/code'
import {MList, MListItem} from '@banzamel/mineralui-angular/typography/list'
import {MText} from '@banzamel/mineralui-angular/typography/text'
import {DocArticle, DocSection} from '@kit/doc-article/doc-article'
import {DocPlayground} from '@kit/doc-playground/doc-playground'
import {booleanControl, selectControl} from '@kit/doc-playground/playground-controls'
import {DocPropsTable} from '@kit/doc-props-table/doc-props-table'

const SIZES: readonly MSheetSize[] = ['sm', 'md', 'lg', 'full']

@Component({
    selector: 'doc-sheet-page',
    imports: [
        DocArticle,
        DocSection,
        DocPlayground,
        DocPropsTable,
        MBadge,
        MButton,
        MCard,
        MCardBody,
        MCode,
        MInline,
        MList,
        MListItem,
        MSheet,
        MSheetFooter,
        MStack,
        MText,
    ],
    template: `
        <doc-article
            title="MSheet"
            description="Bottom sheet overlay for mobile-first actions with simple height presets."
        >
            <doc-section
                title="Playground"
                description="Choose a size preset, open the sheet and drag the handle down to close it."
            >
                <doc-playground [controls]="controls" [code]="code()">
                    <button mButton size="sm" (click)="open.set(true)">Open sheet</button>
                    <m-sheet
                        [(open)]="open"
                        heading="Quick appointment actions"
                        description="Useful for compact mobile flows where actions and summary content should stay close to the bottom edge."
                        [size]="size()"
                        [closeOnBackdrop]="closeOnBackdrop()"
                        [closeOnEscape]="closeOnEscape()"
                    >
                        <m-stack>
                            <div><m-badge color="info" size="sm">Mobile summary</m-badge></div>
                            <p mText tone="muted">
                                Use a simple size preset and drag the handle down if you want to dismiss the sheet.
                            </p>
                            @for (item of summary; track item.title) {
                                <m-card>
                                    <m-card-body>
                                        <p mText weight="semibold">{{ item.title }}</p>
                                        <p mText tone="muted" size="sm">{{ item.text }}</p>
                                    </m-card-body>
                                </m-card>
                            }
                        </m-stack>
                        <m-inline mSheetFooter justify="between">
                            <button mButton variant="outlined" (click)="open.set(false)">Cancel</button>
                            <button mButton (click)="open.set(false)">Confirm</button>
                        </m-inline>
                    </m-sheet>
                </doc-playground>
            </doc-section>

            <doc-section title="Choosing a size">
                <ul mList>
                    <li mListItem>
                        <strong>Quick confirm</strong> — <code mCode>size="sm"</code> when the sheet only needs a few
                        actions and a short summary.
                    </li>
                    <li mListItem>
                        <strong>Form or details</strong> — <code mCode>size="lg"</code> or
                        <code mCode>size="full"</code>
                        for longer forms, checkout steps and richer mobile flows.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="Behaviour">
                <ul mList>
                    <li mListItem>
                        A native modal <code mCode>&lt;dialog&gt;</code> in the top layer: the page is inert and does
                        not scroll; focus moves in (<code mCode>autofocus</code> or the panel) and returns on close.
                    </li>
                    <li mListItem>
                        Dragging the handle more than 72 px down closes the sheet; a shorter drag springs back. From the
                        keyboard the handle is a button that closes the sheet.
                    </li>
                    <li mListItem>
                        <code mCode>(closed)</code> reports why the sheet closed itself: <code mCode>escape</code>,
                        <code mCode>backdrop</code>, <code mCode>button</code> or <code mCode>drag</code>. Lazy body:
                        <code mCode>&lt;ng-template mSheetContent&gt;</code>.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="Differences from MineralUI for React">
                <ul mList>
                    <li mListItem>
                        <code mCode>open</code> + <code mCode>onClose</code> → <code mCode>[(open)]</code> and
                        <code mCode>(closed)</code>; <code mCode>title</code> → <code mCode>heading</code>;
                        <code mCode>footer</code> → an element with <code mCode>mSheetFooter</code>.
                    </li>
                    <li mListItem>
                        In React the handle does nothing from the keyboard and focus stays behind the sheet; here the
                        handle closes the sheet and focus is kept inside and restored afterwards.
                    </li>
                </ul>
            </doc-section>

            <doc-section title="API">
                <doc-props-table api="MSheet" />
            </doc-section>
        </doc-article>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SheetPage {
    protected readonly open = signal(false)
    protected readonly size = signal<MSheetSize>('md')
    protected readonly closeOnBackdrop = signal(true)
    protected readonly closeOnEscape = signal(true)
    protected readonly controls = [
        selectControl('size', this.size, SIZES),
        booleanControl('closeOnBackdrop', this.closeOnBackdrop),
        booleanControl('closeOnEscape', this.closeOnEscape),
    ]

    protected readonly summary = [
        {title: 'Upcoming visit', text: 'Friday, 14:30, Dental consultation, Dr. Milena Nowak'},
        {title: 'Patient note', text: 'Needs quick insurance confirmation before the final booking step.'},
    ]

    protected readonly code = computed(() => {
        const attrs = [
            '[(open)]="open"',
            'heading="Quick appointment actions"',
            'description="Useful for compact mobile flows."',
            this.size() !== 'md' && `size="${this.size()}"`,
            !this.closeOnBackdrop() && '[closeOnBackdrop]="false"',
            !this.closeOnEscape() && '[closeOnEscape]="false"',
        ].filter((attr) => attr !== false)
        return `<m-sheet
    ${attrs.join('\n    ')}
>
    <p mText>Sheet content here.</p>
    <m-inline mSheetFooter justify="between">
        <button mButton variant="outlined" (click)="open.set(false)">Cancel</button>
        <button mButton (click)="open.set(false)">Confirm</button>
    </m-inline>
</m-sheet>`
    })
}
