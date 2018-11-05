
export interface CuiPagination {
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    sort: string | {
        ascending?: boolean;
        descending?: boolean;
        direction?: string;
        ignoreCase?: boolean;
        nullHandling?: string;
        property: string;
    }[];
    totalElements: number;
    totalPages: number;
    content: any[];
}
