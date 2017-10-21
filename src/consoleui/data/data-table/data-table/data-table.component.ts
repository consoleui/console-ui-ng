import { ColTplDirective } from './../col-tpl.drective';
import { Column } from './../defs/column';
import {
    Component, OnInit, Input, Output, EventEmitter,
    TemplateRef, ContentChild, QueryList, ContentChildren, AfterContentInit
} from '@angular/core';

@Component({
    selector: 'cui-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})

export class CuiDataTableComponent implements OnInit, AfterContentInit {
    @Input() columns: Column[];
    @Input() data: any[];
    @Input() pagination;
    @Input() selectType: string;

    @Input() loading: boolean;
    @Input() isComplexSearch: boolean;

    @Input() rowActionTitle: string;
    @Input() dynamicColumns: boolean;

    @Input() selection: any[];


    @Output() reload = new EventEmitter();
    @Output() select = new EventEmitter();
    @Output() selectionChange = new EventEmitter();

    @ContentChild('rowActions') rowActions: TemplateRef<any>;
    @ContentChild('complexSearch') complexSearch: TemplateRef<any>;
    @ContentChild('simpleSearch') simpleSearch: TemplateRef<any>;
    @ContentChild('listTools') listTools: TemplateRef<any>;
    @ContentChild('actionGroup') actionGroup: TemplateRef<any>;

    @ContentChildren(ColTplDirective) _colTpls: QueryList<ColTplDirective>;

    isSelectAll: Boolean = false;

    columnsVisible: Column[];

    colTpls = {};

    constructor() { }

    get isMultipleSelect() {
        return this.selectType && this.selectType == 'checkbox';
    }

    ngOnInit() {
        this.columnsVisible = this.columns.filter(it => it.visible !== false);
    }

    ngAfterContentInit() {
        // console.log(this.rowActions);
        // console.log(this._colTpls);

        this._colTpls.forEach(it => {
            this.colTpls[it.cuiColTpl] = it.templateRef;
        });
    }

    fireReload() {
        this.reload.emit(this.pagination);
    }

    selectAll() {
        if (!this.isMultipleSelect) {
            return;
        }

        this.isSelectAll = !this.isSelectAll;
        if (!this.isSelectAll) {
            this.selection = [];
        } else {
            this.selection = [...this.data];
        }

        this.selectionChange.emit(this.selection);

        // 过时的
        this.select.emit(this.selection.map(it => it['id']));
    }

    selectItem(item, checked) {
        if (this.isMultipleSelect) {
            let selection = [];
            if (!this.selection) {
                this.selection = [];
            }
            this.selection.forEach((val) => {
                if (val != item) {
                    let d = this.data.filter(it => it == item);
                    if (d.length > 0) {
                        selection.push(val);
                    }
                }
            });
            if (checked) {
                selection.push(item);
            }
            this.selection = selection;
        } else {
            this.selection = [item];
        }

        this.selectionChange.emit(this.selection);

        // 过时的
        this.select.emit(this.selection.map(it => it['id']));
    }

    toggleComplexSearch() {
        this.isComplexSearch = !this.isComplexSearch;
    }

    rowChecked(row) {
        if (this.selection) {
            return this.selection.findIndex(it => it == row) >= 0;
        }
        return false;
    }
}
