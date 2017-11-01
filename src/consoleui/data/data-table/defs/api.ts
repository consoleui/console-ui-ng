
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
}

export interface DataTebleConfig {
    selectType?: string;

    columns?: Column[];
}
