import { TreeDataApiMockService } from './../tree-data-api-mock.service';
import { CuiTreeNode } from 'consoleui';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-tree-checkbox-select-demo',
  templateUrl: './tree-checkbox-select-demo.component.html',
  styleUrls: ['./tree-checkbox-select-demo.component.scss']
})
export class TreeCheckboxSelectDemoComponent implements OnInit {

  nodes: CuiTreeNode[];

  constructor(private treeDataApi: TreeDataApiMockService) { }

  ngOnInit() {
    this.treeDataApi.getNodes().subscribe(nodes => this.nodes = nodes);
  }

  selectionChange(nodes) {
    console.log(nodes);
  }
}
