import {ChangeDetectionStrategy, Component, inject, Injectable} from '@angular/core'
import {MCard, MCardBody} from '@banzamel/mineralui-angular/cards/card'
import {MCardGrid, MCardGridItem} from '@banzamel/mineralui-angular/cards/card-grid'
import {applyMDataQuery, injectMDataSource} from '@banzamel/mineralui-angular/data/data-source'
import type {MDataPage, MDataQuery} from '@banzamel/mineralui-angular/data/data-source'
import {MBadge} from '@banzamel/mineralui-angular/feedback/badge'
import {MHeading} from '@banzamel/mineralui-angular/typography/heading'
import {MText} from '@banzamel/mineralui-angular/typography/text'

interface Product {
    readonly id: number
    readonly name: string
    readonly category: string
    readonly price: number
}

const CATEGORIES = ['Audio', 'Office', 'Outdoor', 'Kitchen'] as const
const NAMES = ['Aero', 'Basalt', 'Cirrus', 'Delta', 'Ember', 'Fjord', 'Granite', 'Harbor', 'Iris', 'Juniper']
const PRODUCTS: readonly Product[] = Array.from({length: 30}, (_, index) => ({
    id: index + 1,
    name: `${NAMES[index % NAMES.length] ?? 'Item'} ${Math.floor(index / NAMES.length) + 1}`,
    category: CATEGORIES[index % CATEGORIES.length] ?? 'Audio',
    price: 19 + ((index * 53) % 380),
}))

/** Stands in for a `fetch` call: the Promise honours the abort signal, like `fetch(url, {signal})`. */
@Injectable({providedIn: 'root'})
class ProductsApi {
    list(query: MDataQuery, signal: AbortSignal): Promise<MDataPage<Product>> {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => resolve(applyMDataQuery(PRODUCTS, query, {searchKeys: ['name']})), 400)
            signal.addEventListener('abort', () => {
                clearTimeout(timer)
                reject(new DOMException('Aborted', 'AbortError'))
            })
        })
    }
}

@Component({
    selector: 'app-card-grid-server',
    imports: [MBadge, MCard, MCardBody, MCardGrid, MCardGridItem, MHeading, MText],
    template: `
        <m-card-grid
            label="Products"
            color="info"
            searchable
            pagination
            [source]="products"
            [columns]="{base: 1, sm: 2, lg: 3}"
            [filterKeys]="[{key: 'category', label: 'Category', options: categories}]"
            [sortKeys]="[
                {key: 'name', label: 'Name'},
                {key: 'price', label: 'Price'},
            ]"
        >
            <ng-template mCardGridItem [mCardGridItemOf]="products.items()" let-product>
                <m-card>
                    <m-card-body>
                        <h3 mHeading class="app-grid-title">{{ product.name }}</h3>
                        <p mText tone="muted" size="sm">EUR {{ product.price }}</p>
                        <m-badge class="app-grid-badge" size="sm" color="neutral">{{ product.category }}</m-badge>
                    </m-card-body>
                </m-card>
            </ng-template>
        </m-card-grid>
    `,
    styles: `
        h3.app-grid-title {
            font-size: var(--mineral-font-size-lg);
        }

        .app-grid-badge {
            align-self: flex-start;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardGridServerExample {
    private readonly api = inject(ProductsApi)

    protected readonly categories = CATEGORIES
    protected readonly products = injectMDataSource<Product>(
        (query, {abortSignal}) => this.api.list(query, abortSignal),
        {pageSize: 6, initialSort: {key: 'name', direction: 'asc'}}
    )
}
