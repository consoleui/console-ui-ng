import { Observable } from 'rxjs/Observable';

export interface CuiTreeModel {
    roots: CuiTreeNode[];
    config: CuiTreeConfig;
    selection: CuiTreeNode[];

    // addSelection(...nodes: CuiTreeNode[]);
    // removeSelection(...nodes: CuiTreeNode[]);
    addSelection(node: CuiTreeNode);
    removeSelection(node: CuiTreeNode);
    isSelected(node: CuiTreeNode): boolean;
}

export interface CuiTreeNode {
    id: string;
    label: string;
    parent?: CuiTreeNode;
    selectable?: boolean;
    children?: CuiTreeNode[];
    hasChildren?: boolean;
    leaf?: boolean;
    expanded?: boolean;
    icon?: string;
    expandedIcon?: string;
    collapsedIcon?: string;
    data?: any;
    partialSelected?: boolean;
    loadChildren?: () => any;
    loading?: boolean;
    disabled?: boolean;
}

export interface CuiTreeConfig {
    /* selectionMode?: string;
    metaKeySelection: boolean;
    propagateSelectionUp: boolean;
    propagateSelectionDown: boolean; */

    async?: {
        enable?: boolean;
        dataFilter?: (response, parentNode) => any;
        loadChildren?: (node: CuiTreeNode) => Observable<any>
    };
    data?: {
        keep?: {
            leaf?: boolean;
            parent?: boolean;
        },
        key?: {
            id?: string;
            label?: string;
            title?: string;
            checked?: string;
            children?: string;
        },
        flatData?: {
            enable?: boolean;
            idKey?: string;
            pIdKey?: string;
            rootPId?: any;
        }
    };
}
