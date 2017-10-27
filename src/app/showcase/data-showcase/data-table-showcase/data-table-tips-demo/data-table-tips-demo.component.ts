import { Component, OnInit } from '@angular/core';
import { Column } from 'consoleui';
import { DataTableApiMockService } from './../data-table-api-mock.service';

@Component({
  selector: 'cui-data-table-tips-demo',
  templateUrl: './data-table-tips-demo.component.html',
  styleUrls: ['./data-table-tips-demo.component.scss']
})
export class DataTableTipsDemoComponent implements OnInit {

    data: any;

    columns: Column[] = [
      { title: '年度计划名称', tpl: 'name' },
      { title: '培训机动/研发预算（元）', tpl: 'budget' },
      { title: '地址', tpl: 'address' },
    ];

    constructor(private userApi: DataTableApiMockService) { }

    ngOnInit() {
      this.loadData();
    }

    loadData() {
      // this.userApi.getPrev(3).subscribe(
      //   data => {
      //     this.data = data;
      //   }
      // );
      this.data = [
        {
          name: '2017总公司年度几乎培训计划',
          budget: '3000元',
          address: '北京通铭教育科技股份有限公司'
        },
        {
          name: '2017总公司年度几乎培训计划',
          budget: '3000元',
          address: '北京通铭教育科技股份有限公司'
        },
        {
          name: '2017总公司年度几乎培训计划',
          budget: '3000元',
          address: '北京通铭教育科技股份有限公司'
        },
      ];
    }

}
