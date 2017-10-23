import { CuiTreeNode } from '../defs/defs';
import { Injectable } from '@angular/core';
import { CuiTreeModel, CuiTreeConfig, defaultTreeConfig } from '../defs';
import { TreeNode } from './tree-node';

import * as _ from 'lodash';

const { pick } = _;

@Injectable()
export class TreeModel implements CuiTreeModel {

    nodes: any[];

    // _roots: CuiTreeNode[];
    config: CuiTreeConfig = defaultTreeConfig;
    selection: CuiTreeNode[] = [];

    virtualRoot: CuiTreeNode;
    events: any;

    constructor() {
    }

    get roots() {
        return this.virtualRoot.children;
    }

    fireEvent(event) {
        let e = this.events[event.name];
        if (e) {
            e.emit(event.data);
        }
    }

    addSelection(node: CuiTreeNode) {
        if (!this.isSelected(node)) {
            this.selection = [...this.selection || [], node];
        }
        this.fireEvent({name: 'selectionChange', data: this.selection});
    }

    removeSelection(node: CuiTreeNode) {
        if (this.isSelected(node)) {
            this.selection = this.selection.filter((v, i) => v != node);
        }
        this.fireEvent({name: 'selectionChange', data: this.selection});
    }

    isSelected(node: CuiTreeNode): boolean {
        return this.findIndexInSelection(node) != -1;
    }

    setData({nodes, config = null, events}: {nodes: any[], config: CuiTreeConfig, events: any}) {
        if (config) {
            this.config = Object.assign({}, defaultTreeConfig, config);
        }
        if (nodes) {
            this.nodes = nodes;
        }
        if (events) {
            this.events = events;
        }


        this.update();
    }

    update() {
        let virtualRootConfig = {
            virtual: true,
            [this.config.data.key.children]: this.nodes,
            hasChildren: this.config.async && this.config.async.enable || this.nodes
        };

        this.virtualRoot = new TreeNode(virtualRootConfig, null, this, 0);

        if (this.config.async && this.config.async.enable && !this.nodes) {
            this.virtualRoot.loadChildren();
        }
        // this.roots = this.virtualRoot.children;
    }

    findIndexInSelection(node: CuiTreeNode): number {
        let index: number = -1;

        if (this.selection) {
            index = this.selection.findIndex((n, i) => n == node);
        }

        return index;
    }
}
