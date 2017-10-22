import { DataTableApiMockService } from './../data-table-api-mock.service';
import { Column } from 'consoleui';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-data-table-selection-demo',
  templateUrl: './data-table-selection-demo.component.html',
  styleUrls: ['./data-table-selection-demo.component.scss']
})
export class DataTableSelectionDemoComponent implements OnInit {

  data: any;

  columns: Column[] = [
    { title: '姓名', data: 'name' },
    { title: '年龄', data: 'age' },
    { title: '地址', data: 'address' },
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
