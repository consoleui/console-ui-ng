import { Component, OnInit, Input, Inject, forwardRef, DoCheck, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { CuiTreeNode } from '../defs';
import { TreeComponent } from '../tree/tree.component';

@Component({
  selector: 'cui-tree-node, cui-treenode',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent implements OnInit {

  static ICON_CLASS: string = 'fa fa-fw';

  @Input() node: CuiTreeNode;
  // @Input() data;
  @Input() parentNode: CuiTreeNode;
  @Input() index: number;
  @Input() isRoot: boolean;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;

  // path, level
  // dataDiffer: KeyValueDiffer<any, any>;
  // node: TreeNode;

  constructor( @Inject(forwardRef(() => TreeComponent)) public tree: TreeComponent/*, differ: KeyValueDiffers*/) {
    // this.dataDiffer = differ.find({}).create();
  }

  ngOnInit() {
    // this.updateNode();
    this.node.parent = this.parentNode;
    /* if (this.parentNode) {
      this.parentNode.children = this.parentNode.children || []
      this.parentNode.children.push(this.node);
    } */
  }

  /* ngDoCheck() {
    let dataChanges = this.dataDiffer.diff(this.data);

    if (dataChanges) {
      this.updateNode();
    }
  } */

  /* updateNode() {
    // console.log(this.data);
    let data = this.data;
    let node = this.node || new TreeNode();
    let keyMap = this.tree.config.data.key || {};
    node.id = data[keyMap.id || 'id'];
    node.label = data[keyMap.label || 'label' || 'name'];
    node.hasChildren = data['hasChildren'];
    node.data = data;
    // node.children = data['children'];
    this.node = node;
  } */

  getIcon() {
    let icon: string;

    if (this.node.icon) {
      icon = this.node.icon;
    } else {
      icon = this.node.expanded && this.node.children && this.node.children.length
        ? (this.node.expandedIcon || 'fa-folder-open text-info') : (this.node.collapsedIcon || 'fa-folder text-info');
    }

    return TreeNodeComponent.ICON_CLASS + ' ' + icon;
  }

  hasIcon() {
    return true;
  }

  isLeaf() {
    return this.node.leaf == false ? false : !(this.node.children && this.node.children.length);
  }

  toggle(event: Event) {
    if (this.node.expanded) {
      this.tree.nodeCollapse.emit({ originalEvent: event, node: this.node });
    } else {
      if (!this.node.children && this.node.hasChildren && this.tree.config.async && this.tree.config.async.enable) {
        this.node.loadChildNodes();
      }
      this.tree.nodeExpand.emit({ originalEvent: event, node: this.node });
    }

    this.node.expanded = !this.node.expanded
  }

  onNodeClick(event: MouseEvent) {
    this.tree.onNodeClick(event, this.node);
  }

  onNodeRightClick(event: MouseEvent) {
    this.tree.onNodeRightClick(event, this.node);
  }

  onNodeTouchEnd() {
    this.tree.onNodeTouchEnd();
  }

  get isSelected() {
    return this.tree.isSelected(this.node);
  }

}
