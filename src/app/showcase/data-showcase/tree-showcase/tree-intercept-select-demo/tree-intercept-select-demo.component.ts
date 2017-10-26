import { TreeDataApiMockService } from './../tree-data-api-mock.service';
import { CuiTreeNode, TreeComponent } from 'consoleui';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'cui-tree-intercept-select-demo',
  templateUrl: './tree-intercept-select-demo.component.html',
  styleUrls: ['./tree-intercept-select-demo.component.scss']
})
export class TreeInterceptSelectDemoComponent implements OnInit {

  nodes: CuiTreeNode[];
  selection;

  @ViewChild('tree') tree: TreeComponent;

  constructor(private treeDataApi: TreeDataApiMockService) { }

  ngOnInit() {
    this.treeDataApi.getNodes().subscribe(nodes => this.nodes = nodes);
  }

  onNodeSelect(e) {
    console.log(e.node);
    this.propagateDisabled(e.node, true);
  }



  onNodeUnselect(e) {
    console.log('unselect', e.node);
    this.propagateDisabled(e.node, false);
  }

  propagateDisabled(node: CuiTreeNode, disabled: boolean) {
    if (node.children && node.children.length > 0) {
      for ( let child of node.children) {
        child.disabled = disabled;
        if (!this.isSelected(child)) {
          this.propagateDisabled(child, disabled);
        }
      }
    }
  }

  isSelected(node: CuiTreeNode) {
    return this.tree.isSelected(node);
  }

  onSelectionChange(selection) {
    this.selection = selection;
  }
}
