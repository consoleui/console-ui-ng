import { TreeDataApiMockService } from './../tree-data-api-mock.service';
import { CuiTreeNode } from 'consoleui';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-tree-multiple-select-demo',
  templateUrl: './tree-multiple-select-demo.component.html',
  styleUrls: ['./tree-multiple-select-demo.component.scss']
})
export class TreeMultipleSelectDemoComponent implements OnInit {

  nodes: CuiTreeNode[];

  constructor(private treeDataApi: TreeDataApiMockService) { }

  ngOnInit() {
    this.treeDataApi.getNodes().subscribe(nodes => this.nodes = nodes);
  }

}
