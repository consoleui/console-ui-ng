import { Component, OnInit } from '@angular/core';
import { TreeDataApiMockService } from '../../data-showcase/tree-showcase/tree-data-api-mock.service';
import { CuiTreeNode } from 'consoleui';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cui-tree-select-showcase',
  templateUrl: './tree-select-showcase.component.html',
  styleUrls: ['./tree-select-showcase.component.scss']
})
export class TreeSelectShowcaseComponent implements OnInit {
  nodes: CuiTreeNode[];
  config;

  constructor(private treeDataApi: TreeDataApiMockService) { }

  ngOnInit() {
    // this.treeDataApi.getNodes().subscribe(nodes => this.nodes = nodes);
    this.config = {
      async: {
        enable: true,
        loadChildren: (node: CuiTreeNode): Observable<any> => {
          if (!node.data.virtual) {
            return Observable.of(null);
          }
          return this.treeDataApi.getNodes();
        }
      },
      data: {
        key: {
          id: 'id',
          label: 'label',
          children: 'children'
        }
      }
    };
  }
}
