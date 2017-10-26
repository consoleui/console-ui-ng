import { CuiTreeConfig } from 'consoleui';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-tree-dynamic-node-demo',
  templateUrl: './tree-dynamic-node-demo.component.html',
  styleUrls: ['./tree-dynamic-node-demo.component.scss']
})
export class TreeDynamicNodeDemoComponent implements OnInit {

  nodes;

  treeConf: CuiTreeConfig = {
    data: {
      key: {
        id: 'id',
        children: 'children',
        label: "name"
      }
    }
  };

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.nodes = [
        {id: 1, name: "Node 1"},
        {id: 2, name: "Node 2"},
        {id: 3, name: "Node 3"},
      ];
    }, 3000);
    setTimeout(() => {
        this.nodes[0]['hasChildren'] = true;
        this.nodes[0]['name'] = 'This is Node 1 Name';
        this.nodes[0]['children'] = [
          {id: '1-1', name: "Node 1-1"},
          {id: '1-2', name: "Node 1-2"},
          {id: '1-3', name: "Node 1-3"},
        ];
      }, 5000);
  }


  lazyAddNodesOnTree() {
    this.nodes[0]['children'].push({id: '1-4', name: "Node 1-4"});
  }
}
