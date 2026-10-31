import {ChangeDetectionStrategy, Component, signal} from '@angular/core'
import {form, FormField, required} from '@angular/forms/signals'
import {MChipGroup} from '@banzamel/mineralui-angular/controls/chip-group'
import type {MChipGroupItem} from '@banzamel/mineralui-angular/controls/chip-group'
import {MStack} from '@banzamel/mineralui-angular/layout/stack'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Listing {
    tags: string[]
}

@Component({
    selector: 'app-chip-group-signal-forms',
    imports: [FormField, MChipGroup, MStack, MText],
    template: `
        <m-stack align="start">
            <!-- required() fails on an empty list; the label shows the required marker. -->
            <m-chip-group label="Tags" color="success" [items]="tags" [formField]="listing.tags" />
            <p mText size="sm" tone="muted">Model: {{ model().tags.join(', ') || 'none' }}</p>
        </m-stack>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipGroupSignalFormsExample {
    protected readonly tags: readonly MChipGroupItem[] = [
        {value: 'new', label: 'New'},
        {value: 'sale', label: 'Sale'},
        {value: 'limited', label: 'Limited'},
    ]
    protected readonly model = signal<Listing>({tags: ['new']})
    protected readonly listing = form(this.model, (path) => {
        required(path.tags, {message: 'Add at least one tag'})
    })
}
