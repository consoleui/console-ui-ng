import { FormGroup, FormBuilder } from '@angular/forms';
import { CuiPagination, Column } from 'consoleui';
import { Component, OnInit } from '@angular/core';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

class Pagination<T> implements CuiPagination {
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: string;
  totalElements: number;
  totalPages: number;
  content: T[];
}

class AuditLog {
  id: number;
  planId: number;
  reason: string;
  result: 'INITIAL' | 'WAIT' | 'PASS' | 'REFUSED';
  createdBy: { id: number, username: string, displayName: string };
  createdDate: Date;
}

class Plan {
  id: number;
  name: string;
  budget: number;
  submitedGroup: { id: number, name: string, fullName: string };
  submitedBy: { id: number, username: string, displayName: string };
  createdDate: Date;
  isPublished: boolean;
  auditStatus: 'INITIAL' | 'WAIT' | 'PASS' | 'REFUSED';
  /* auditLog: AuditLog; */
}

@Injectable()
export class PlanApiService {

  plans: Plan[] = [];

  constructor() {
    for (let i = 1; i <= 100; i++) {
      this.plans.push(
        {
          id: i, name: `计划名称计划名称${i}`, budget: 3000,
          submitedGroup: { id: i, name: '某某单位', fullName: '四川省 / 成都研修院 / 计划管理部门' },
          submitedBy: { id: i, username: `zhangsan`, displayName: '张三' },
          createdDate: new Date(),
          isPublished: true,
          auditStatus: 'WAIT'
        }
      );
    }
  }

  getListOfPage(params?, page?): Observable<Pagination<Plan>> {
    /* let list = this.plans.filter */
    let list = this.plans;
    let pageNum = page ? page.page || 0 : 0;
    let pageSize = page ? page.size || 10 : 10;

    list = list.slice(pageSize * pageNum, (pageNum + 1) * pageSize);
    let data: Pagination<Plan> = {
      first: pageNum == 0, last: false, number: pageNum, numberOfElements: 100, size: pageSize,
      sort: null, totalElements: 100, totalPages: 10, content: list
    };

    return Observable.of(data);
  }

}

@Component({
  selector: 'cui-data-table-synthesize-demo',
  templateUrl: './data-table-synthesize-demo.component.html',
  styleUrls: ['./data-table-synthesize-demo.component.scss'],
  providers: [PlanApiService]
})
export class DataTableSynthesizeDemoComponent implements OnInit {

  data: Pagination<Plan>;
  selection: Plan[];
  loading: boolean = false;

  columns: Column[] = [
    { title: '计划名称', tpl: 'name', style: { 'max-width': '100px', width: '100px' }, styleClass: 'add' },
    { title: '预算', tpl: 'budget' },
    { title: '发起单位', data: 'submitedGroup.name' },
    { title: '发起人', data: 'submitedBy.displayName' },
    { title: '创建时间', tpl: 'createdDate' },
    { title: '发布状态', tpl: 'isPublished', styleClass: 'text-center' },
    { title: '审核状态', tpl: 'auditStatus', styleClass: 'text-center' },
    { title: '操作', tpl: 'actions', styleClass: 'text-right' },
  ];

  _searchForm: FormGroup;
  _isComplexSearch: boolean = false;

  constructor(private fb: FormBuilder, private planApi: PlanApiService) { }

  ngOnInit() {
    this.initSearchForm();
    this.loadData();
  }

  initSearchForm() {
    this._searchForm = this.fb.group({
      name: [],
      submitedBy: [],
      trainingAddress: [],
      excuteStatus: [],
      submitGroup: [],
      planType: [],
    });
  }

  loadData() {
    this.loading = true;
    this.planApi.getListOfPage().subscribe(
      data => {
        this.data = data;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }
  _submitForm($event, value) {
    $event.preventDefault();
    // tslint:disable-next-line:forin
    console.log(value);
    console.log(this.selection);
  }
  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this._searchForm.reset();
    // tslint:disable-next-line:forin
    for (const key in this._searchForm.controls) {
      this._searchForm.controls[key].markAsPristine();
    }
  }

}
