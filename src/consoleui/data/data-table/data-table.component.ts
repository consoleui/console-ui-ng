import { Component, OnInit, Input, Output, EventEmitter,
  Directive,
  ContentChild, ContentChildren, TemplateRef, AfterContentInit,
  QueryList } from '@angular/core';

import { CuiPagination } from '../pagination';

import { Column } from './defs/api';
import { ColTplDirective } from './col-tpl.directive';

@Component({
  selector: 'cui-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterContentInit {
  @Input() columns: Column[];
  @Input() data: any[];
  @Input() pagination: CuiPagination;
  @Input() selectType?: string;
  @Input() rowActionTitle?: string;
  @Input() loading?: boolean;
  @Input() isComplexSearch?: boolean;
  @Input() dynamicColumns?: boolean;
  // input, Output searchForm
  @Output() reload = new EventEmitter();
  @Output() select = new EventEmitter();
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();
  isSelectAll: Boolean = false;
  // ids = [];
  @Input() selection: any[];

  @ContentChild('rowActions') rowActions: TemplateRef<any>;
  @ContentChildren(ColTplDirective) _colTpls: QueryList<ColTplDirective>;

  @ContentChild('complexSearch') complexSearch: TemplateRef<any>;
  @ContentChild('simpleSearch') simpleSearch: TemplateRef<any>;
  @ContentChild('listTools') listTools: TemplateRef<any>;
  @ContentChild('actionGroup') actionGroup: TemplateRef<any>;

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
