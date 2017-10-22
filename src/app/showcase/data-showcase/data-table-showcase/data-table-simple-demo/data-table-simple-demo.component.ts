import { DataTableApiMockService } from './../data-table-api-mock.service';
import { Column } from 'consoleui';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-data-table-simple-demo',
  templateUrl: './data-table-simple-demo.component.html',
  styleUrls: ['./data-table-simple-demo.component.scss']
})
export class DataTableSimpleDemoComponent implements OnInit {

  data: any;

  columns: Column[] = [
    { title: '姓名', data: 'name' },
    { title: '年龄', data: 'age' },
    { title: '地址', data: 'address' },
    { title: '操作', tpl: 'actions', styleClass: 'text-right' },
  ];

  constructor(private userApi: DataTableApiMockService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userApi.getPrev(3).subscribe(
      data => {
        this.data = data;
      }
    );
  }

}
