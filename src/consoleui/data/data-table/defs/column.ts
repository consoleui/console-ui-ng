export interface Column {
    title?: string;
    name?: string;
    data?: number | string | Object | Function;
    render?: number | string | Object | Function;
    tpl?: string;
    orderable?: boolean;
    type?: string;
    visible?: boolean;
    width?: number | string;
    style?: string;
    styleClass?: string;
    showSort?: boolean;
    sortKey?: string;
    sort?: 'descend' | 'ascend' | null;
    sortChange?: Function;
}
