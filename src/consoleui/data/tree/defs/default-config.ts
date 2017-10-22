import { CuiTreeConfig } from './defs';

export const defaultTreeConfig: CuiTreeConfig = {
    data: {
        keep: {
            leaf: false,
            parent: false
        },
        key: {
            id: 'id',
            label: 'label',
            title: 'title',
            checked: 'checked',
            children: 'children'
        }
    }
};