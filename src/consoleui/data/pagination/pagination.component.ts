import { Component, OnInit, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';

import { CuiPagination } from './defs/api';
import { PaginationModel } from './pagination.model';

@Component({
  selector: 'cui-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pagination: CuiPagination;
  @Output('paginationChange') paginationChange = new EventEmitter();
  @Output('goto') goto = new EventEmitter();
  totalPagesNumber = null;

  @ContentChild('paginationTemplate') paginationTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
    // this.pagination = new PaginationModel(0, 0, 0);
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
      this.totalPagesNumber = null;
    } else {
      if (page > 0 && page <= this.pagination.totalPages) {
        this.pagination.number = page - 1;
        this.paginationChange.emit(this.pagination);
        this.gotoPage();
      } else {
        this.totalPagesNumber = null;
      }
    }
  }
}
