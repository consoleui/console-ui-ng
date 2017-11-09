import { TreeDataApiMockService } from './../tree-data-api-mock.service';
import { CuiTreeNode, TreeComponent } from 'consoleui';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'cui-tree-single-select-demo',
  templateUrl: './tree-single-select-demo.component.html',
  styleUrls: ['./tree-single-select-demo.component.scss']
})
export class TreeSingleSelectDemoComponent implements OnInit {

  nodes: CuiTreeNode[];

  @ViewChild('tree') tree: TreeComponent;

  constructor(private treeDataApi: TreeDataApiMockService) { }

  ngOnInit() {
    this.treeDataApi.getNodes().subscribe(nodes => this.nodes = nodes);
  }

  getNode(id) {
    let node = this.tree.getNodeById(id);
    console.log(node);
  }
}
