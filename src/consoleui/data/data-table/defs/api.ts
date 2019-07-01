
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
    style?: Object;
    styleClass?: string;
    showSort?: boolean;
    sortKey?: string;
    sort?: 'DESC' | 'ASC' | null;
    sortChange?: Function;
    sortSwitchNull?: boolean;
}

export interface DataTebleConfig {
    selectType?: string;

    columns?: Column[];
}
