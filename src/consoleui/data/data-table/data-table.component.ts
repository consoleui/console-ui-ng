import { Component, OnInit, Input, Output, EventEmitter,
  OnChanges, SimpleChanges, SimpleChange,
  Directive,
  ContentChild, ContentChildren, TemplateRef, AfterContentInit,
  QueryList,
  Inject,
  Optional
} from '@angular/core';

import { CuiPagination } from '../pagination';

import { Column } from './defs/api';
import { ColTplDirective } from './col-tpl.directive';
import { CuiRootConfig, CUI_ROOT_CONFIG } from '../../consoleui-config';

@Component({
  selector: 'cui-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterContentInit, OnChanges {
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
  @Input() keepSelection: boolean = false; // 是否在加载数据后或刷新数据后 没有找到 selection 的项时，保持 selection 的项

  @Input() rowId: string = 'id';

  @ContentChild('rowActions') rowActions: TemplateRef<any>;
  @ContentChildren(ColTplDirective) _colTpls: QueryList<ColTplDirective>;

  @ContentChild('complexSearch') complexSearch: TemplateRef<any>;
  @ContentChild('simpleSearch') simpleSearch: TemplateRef<any>;
  @ContentChild('listTools') listTools: TemplateRef<any>;
  @ContentChild('actionGroup') actionGroup: TemplateRef<any>;

  columnsVisible: Column[];

  colTpls = {};

  _allChecked;
  _indeterminate;
  _anyCheckable;

  _showSerialNumber: boolean;
  _serialNumberLabel: string;

  constructor(
    @Inject(CUI_ROOT_CONFIG) @Optional() private cuiRootConfig: any | undefined
  ) { }

  @Input()
  set showSerialNumber(value) {
    this._showSerialNumber = value;
  }

  get showSerialNumber(): boolean {
    return this._showSerialNumber || (this.cuiRootConfig && this.cuiRootConfig.dataTable && this.cuiRootConfig.dataTable.showSerialNumber);
  }

  @Input()
  set serialNumberLabel(value) {
    this._serialNumberLabel = value;
  }

  get serialNumberLabel(): string {
    return this._serialNumberLabel ||
      (this.cuiRootConfig && this.cuiRootConfig.dataTable && this.cuiRootConfig.dataTable.serialNumberLabel) || '序号';
  }

  get isMultipleSelect() {
    return this.selectType && this.selectType == 'checkbox';
  }

  ngOnInit() {
    this.columnsVisible = this.columns ? this.columns.filter(it => it.visible !== false) : [];
  }

  ngAfterContentInit() {
    // console.log(this.rowActions);
    // console.log(this._colTpls);

    this._colTpls.forEach(it => {
      this.colTpls[it.cuiColTpl] = it.templateRef;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    // throw new Error("Method not implemented.");
    let chgSelection: SimpleChange = changes['selection'];
    if (chgSelection && chgSelection.isFirstChange()) {
      this._refreshSel();
    }

    let chgData: SimpleChange = changes['data'];
    // if (chgData && chgData.isFirstChange()) {
    if (chgData) {
      if (this.keepSelection) {
        this._refreshSel();
      } else {
        setTimeout(() => {
          this._refreshStatus();
        }, 300);
      }

      console.log(this.selection);
      // this._refreshSel();
    }

    let paginationChange: SimpleChange = changes['pagination'];
    if (paginationChange) {
      const sortStr: string = paginationChange.currentValue.sort;
      if (sortStr && sortStr != "") {
        const sorts = sortStr.split(/;|; /)
          .map(it => it.trim())
          .map(it => {
            const sortVals = it.split(/,|, /);
            if (!!sortVals && sortVals.length == 1) {
              return {sortKey: sortVals[0], sort: undefined};
            } else if (!!sortVals && sortVals.length == 2) {
              return {sortKey: sortVals[0], sort: sortVals[1]};
            }
            return undefined;
          })
          .filter(it => it !== undefined);
        this.columns.forEach(col => {
          if (col.sortKey) {
            const sort = sorts.find(it => it.sortKey == col.sortKey);
            if (!!sort) {
              col.sort = (!!sort.sort && sort.sort.toUpperCase() == 'DESC') ? 'DESC' : 'ASC';
            }
          }
        });
      }
    }
  }

  _refreshSel() {
    if (this.data && this.data.length > 0) {
      this.data.forEach(row => {
        row.checked = this.rowChecked(row);
      });
      this._refreshStatus(false);
    }
  }

  fireReload() {
    this.reload.emit(this.pagination);
  }

  // 过时的
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
    this.select.emit(this.selection && this.selection.map(it => it['id']));
  }

  // 过时的
  selectItem(item, checked) {
    if (this.isMultipleSelect) {
      let selection = [];
      if (!this.selection) {
        this.selection = [];
      }
      this.selection.forEach((val) => {
        if (val != item) {
          let d = this.data && this.data.filter(it => it == item);
          if (d && d.length > 0) {
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
    this.select.emit(this.selection && this.selection.map(it => it['id']));
  }

  toggleComplexSearch() {
    this.isComplexSearch = !this.isComplexSearch;
  }

  rowChecked(row) {
    if (this.selection) {
      return this.selection.findIndex(it => this.isRowEqual(it, row)) >= 0;
    }
    return false;
  }

  _refreshStatus(emit: boolean = true) {
    const allChecked = this.hasData && this.data.every(value => value.checked === true);
    const allUnChecked = !this.hasData || this.data.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    this._anyCheckable = this.hasData && this.data.some(it => it.checkable !== false);
    // this._disabledButton = !this._dataSet.some(value => value.checked);
    // this._checkedNumber = this._dataSet.filter(value => value.checked).length;

    if (this.keepSelection && this.selection && this.data) {
      this.data.map(it => {
        if (it.checked && !this.rowChecked(it)) {
          this.selection = [...this.selection, it];
        }
        if (!it.checked && this.rowChecked(it)) {
          this.selection = this.selection && this.selection.filter(row => !this.isRowEqual(it, row));
        }
      });
    } else {
      this.selection = this.data && this.data.filter(value => value.checked);
    }
    if (emit) {
      this.selectionChange.emit(this.selection);
      // 过时的
      this.select.emit(this.selection && this.selection.map(it => it['id']));
    }
  }

  checkAll(value) {
    if (value) {
      this.data.filter(it => it.checkable !== false).forEach(data => data.checked = true);
    } else {
      this.data.filter(it => it.checkable !== false).forEach(data => data.checked = false);
    }
    this._refreshStatus();
  }

  isRowEqual(item1, item2) {
    if (!!item1 && !!item2) {
      if (item1 == item2) {
        return true;
      }

      if (item1.equal instanceof Function) {
        return item1.equal(item2);
      }

      return !!item1[this.rowId] && item1[this.rowId] == item2[this.rowId];
    }

    return false;
  }

  get hasData(): boolean {
    return this.data && this.data.length > 0;
  }

  updateSort(col) {
    const {showSort, sortKey, sort} = col;

    if (!showSort) {
      return ;
    }

    let sortStr = sortKey;
    if (sort === 'ASC') {
      col.sort = 'DESC';
      sortStr = sortStr + ',' + 'DESC';
    } else if (sort === 'DESC') {
      col.sort = undefined;
      sortStr = "";
    } else {
      col.sort = 'ASC';
      sortStr = sortStr + ',' + 'ASC';
    }
    this.pagination.sort = sortStr;
    this.fireReload();
  }

}
