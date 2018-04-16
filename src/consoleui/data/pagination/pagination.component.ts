import { Component, OnInit, Input, Output, EventEmitter, ContentChild, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';

import { CuiPagination } from './defs/api';
import { PaginationModel } from './pagination.model';

@Component({
  selector: 'cui-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pagination: CuiPagination;
  @Output('paginationChange') paginationChange = new EventEmitter();
  @Output('goto') goto = new EventEmitter();
  totalPagesNumber = null;
  PER_PAGE_SIZES: any[] = [
    {value: 10, label: '10 / 每页'},
    {value: 20, label: '20 / 每页'},
    {value: 50, label: '50 / 每页'},
    {value: 100, label: '100 / 每页'},
    {value: 200, label: '200 / 每页'},
    {value: 500, label: '500 / 每页'},
    {value: 1000, label: '1000 / 每页'},
  ];

  @ContentChild('paginationTemplate') paginationTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
    // this.pagination = new PaginationModel(0, 0, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    let pageChange = changes['pagination'];
    if (pageChange) {
      let matched = this.PER_PAGE_SIZES.filter(it => {
        return it.value <= pageChange.currentValue.totalElements || it.value <= pageChange.currentValue.size;
      });
      this.PER_PAGE_SIZES =  this.PER_PAGE_SIZES.slice(0, matched.length + 1);
      this.totalPagesNumber = pageChange.currentValue.number + 1;
    }
  }

  prev() {
    if (!this.pagination.first
      && this.pagination.number >= 0) {
      this.pagination.number -= 1;
    }
    this.paginationChange.emit(this.pagination);
    this.gotoPage();
  }

  next() {
    if (!this.pagination.last
      && this.pagination.number + 1 < this.pagination.totalPages) {
      this.pagination.number += 1;
    }
    this.paginationChange.emit(this.pagination);
    this.gotoPage();
  }

  first() {
    if (!this.pagination.first) {
      this.pagination.number = 0;
    }
    this.paginationChange.emit(this.pagination);
    this.gotoPage();
  }

  last() {
    if (!this.pagination.last) {
      this.pagination.number = this.pagination.totalPages - 1;
    }
    this.paginationChange.emit(this.pagination);
    this.gotoPage();
  }

  gotoPage() {
    this.goto.emit(this.pagination.number);
  }
  gotoTotalPages($event, page: number) {
    if ($event.keyCode) {
      if ($event.keyCode == 13) {
        this.validation(page);
      }
    } else {
      this.validation(page);
    }

  }
  validation(page) {
    const reg = new RegExp("^[0-9]*$");
    if (!reg.test(page.toString())) {
      this.totalPagesNumber = this.pagination.number + 1;
    } else {
      if (page > 0 && page <= this.pagination.totalPages) {
        this.pagination.number = page - 1;
        this.paginationChange.emit(this.pagination);
        this.gotoPage();
      } else {
        this.totalPagesNumber = this.pagination.number + 1;
      }
    }
  }
}
