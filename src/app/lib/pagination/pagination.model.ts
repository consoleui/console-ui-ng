import { CuiPagination } from './defs/api';

export class PaginationModel implements CuiPagination {
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    sort: string;
    totalElements: number;
    totalPages: number;
    content: any[];

    private _totalPage: number;

    constructor(total: number, size: number, page: number, content?: any[]) {
        this.totalElements = total;
        this.size = size;
        this.number = page;
        this.content = content;

        this._totalPage = total && size ? Math.floor(total / size) + (total % size > 0 ? 1 : 0) : 0;
    }

    get totalPage(): number {
        return this._totalPage;
    }

    get hasPrefix(): boolean {
        return this.number > 1;
    }

    get hasNext(): boolean {
        return this.number < this._totalPage;
    }
}
