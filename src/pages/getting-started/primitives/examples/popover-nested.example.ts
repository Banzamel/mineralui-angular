import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MButton} from '@banzamel/mineralui-angular/controls/button'
import {MPopover, MPopoverContent, MPopoverTrigger} from '@banzamel/mineralui-angular/primitives/popover'
import {MText} from '@banzamel/mineralui-angular/typography/text'

@Component({
    selector: 'app-popover-nested',
    imports: [MButton, MPopover, MPopoverContent, MPopoverTrigger, MText],
    template: `
        <!-- Inside an overflow: hidden box: the top layer is never clipped. -->
        <div class="clip">
            <button mButton [mPopoverTrigger]="outer">Account</button>
        </div>

        <m-popover #outer role="dialog" aria-label="Account" initialFocus="first">
            <ng-template mPopoverContent>
                <div class="panel">
                    <p mText size="sm">Signed in as ada&#64;example.com</p>
                    <button mButton variant="outlined" size="sm" [mPopoverTrigger]="inner">Switch workspace</button>

                    <!-- Nested: lives inside the outer popover, so pressing in it keeps the outer one open. -->
                    <m-popover
                        #inner
                        role="dialog"
                        aria-label="Workspaces"
                        placement="right-start"
                        initialFocus="first"
                    >
                        <ng-template mPopoverContent>
                            <div class="panel">
                                <button mButton variant="ghost" size="sm" (click)="outer.open.set(false)">
                                    Design team
                                </button>
                                <button mButton variant="ghost" size="sm" (click)="outer.open.set(false)">
                                    Platform team
                                </button>
                            </div>
                        </ng-template>
                    </m-popover>
                </div>
            </ng-template>
        </m-popover>
    `,
    styles: `
        .clip {
            overflow: hidden;
            padding: 12px;
            border: 1px dashed var(--mineral-border);
            border-radius: var(--mineral-radius-md);
            width: fit-content;
        }
        .panel {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 12px;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverNestedExample {}
