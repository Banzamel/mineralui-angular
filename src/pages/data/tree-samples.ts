import type {MTreeNode} from '@banzamel/mineralui-angular/data/tree-view'

/** Category tree of the MTreeView playground (same as docs-react). */
export const CATEGORY_TREE: readonly MTreeNode[] = [
    {
        id: 'electronics',
        label: 'Electronics',
        kind: 'folder',
        children: [
            {
                id: 'phones',
                label: 'Phones',
                kind: 'folder',
                children: [
                    {id: 'iphone', label: 'iPhone'},
                    {id: 'samsung', label: 'Samsung'},
                ],
            },
            {id: 'laptops', label: 'Laptops'},
            {id: 'tablets', label: 'Tablets', disabled: true},
        ],
    },
    {
        id: 'clothing',
        label: 'Clothing',
        kind: 'folder',
        children: [
            {id: 'shoes', label: 'Shoes'},
            {id: 'jackets', label: 'Jackets'},
        ],
    },
]
