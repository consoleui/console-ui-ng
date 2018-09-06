import { CuiTreeNode, CuiTreeModel, CuiTreeConfig } from '../defs';
import { TreeModel } from './tree-model';
import { async } from '@angular/core/testing';

export class TreeNode implements CuiTreeNode {

    index: number;
    _children: CuiTreeNode[];
    loading: boolean = false;

    constructor (public data: any, public parent: CuiTreeNode, public treeModel: CuiTreeModel, index: number) {
        this.index = index;

        if (this.getField('selected') || treeModel.isSelected(this)) {
            this.treeModel.addSelection(this);
        }

        if (this.getField('children')) {
            this.initChildren();
        } else {
            if (this.getField('hasChildren') && this.getField('expanded')
                && this.treeModel.config.async && this.treeModel.config.async.enable) {
                this.loadChildren();
            }
        }
    }

    get config(): CuiTreeConfig {
        return this.treeModel.config;
    }

    get id(): string {
        return this.getField('id');
    }

    get label(): string {
        return this.getField('label');
    }

    get selectable(): boolean {
        return this.getField('selectable');
    }

    get hasChildren(): boolean {
        return this.getField('hasChildren') || !!this.children;
    }

    set hasChildren(val: boolean) {
        this.setField('hasChildren', val);
    }

    get leaf(): boolean {
        return !this.hasChildren;
    }

    get expanded(): boolean {
        return this.getField('expanded');
    }

    set expanded(val: boolean) {
        this.setField('expanded', val);
    }

    get icon(): string {
        return this.getField('icon');
    }

    get expandedIcon(): string {
        return this.getField('expandedIcon');
    }

    get collapsedIcon(): string {
        return this.getField('collapsedIcon');
    }

    get partialSelected(): boolean {
        return this.getField('partialSelected');
    }

    set partialSelected(val: boolean) {
        this.setField('partialSelected', val);
    }

    get selected(): boolean {
        return this.getField('selected');
    }

    set selected(val: boolean) {
        if (val) {
            this.treeModel.addSelection(this);
        } else {
            this.treeModel.removeSelection(this);
        }
        this.setField('selected', val);
    }

    get children(): CuiTreeNode[] {
        this.mergeChildren();

        return this._children;
    }

    get disabled(): boolean {
        return this.getField('disabled');
    }

    set disabled(val) {
        this.setField('disabled', val);
    }

    getField(key) {
        return this.data[this.config.data.key[key] || key];
    }

    setField(key, value) {
        this.data[this.config.data.key[key] || key] = value;
    }

    loadChildren(force: boolean = false) {
        let dataChildren = this.getField('children');
        if (!dataChildren || force) {
            if (this.config.async && this.config.async.enable && this.hasChildren && !this.loading) {
                this.loading = true;
                this.config.async.loadChildren(this).subscribe(data => {
                    if (this.config.async.dataFilter) {
                        data = this.config.async.dataFilter(data, this);
                    }
                    this.setField('children', data);
                    this.mergeChildren();
                    this.loading = false;
                });
            }
        }
    }

    private initChildren() {
        this._children = this.getField('children') ?
            this.getField('children').map((child, idx) => new TreeNode(child, this, this.treeModel, idx)) : [];
    }

    private mergeChildren() {
        let dataChildren = this.getField('children');
        if (dataChildren) {
            // TODO: 优化比较children
            if (!this._children) {
                this.initChildren();
            } else {
                let childrenOld = this._children;
                let childrenNew = [];
                dataChildren.forEach((dataChild, i) => {
                    let co = childrenOld.find(it =>  it.data == dataChild);
                    if (!co) {
                        co = new TreeNode(dataChild, this, this.treeModel, i);
                    }
                    childrenNew.push(co);
                });
                this._children = childrenNew;
            }
        } else {
            if (this._children) {
                this._children = null;
            }
        }
    }
}
