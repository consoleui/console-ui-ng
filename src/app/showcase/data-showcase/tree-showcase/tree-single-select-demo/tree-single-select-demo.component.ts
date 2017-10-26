import { TreeDataApiMockService } from './../tree-data-api-mock.service';
import { CuiTreeNode } from 'consoleui';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-tree-single-select-demo',
  templateUrl: './tree-single-select-demo.component.html',
  styleUrls: ['./tree-single-select-demo.component.scss']
})
export class TreeSingleSelectDemoComponent implements OnInit {

  nodes: CuiTreeNode[];

  constructor(private treeDataApi: TreeDataApiMockService) { }

  ngOnInit() {
    this.treeDataApi.getNodes().subscribe(nodes => this.nodes = nodes);
  }

}
