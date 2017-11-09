import {
  Component, OnInit, AfterContentInit, OnDestroy, Input, Output,
  EventEmitter, ContentChildren, QueryList, OnChanges
} from '@angular/core';
import { CuiTreeNode, CuiTreeConfig, defaultTreeConfig } from '../defs';
import { CuiTemplateDirective } from '../../../core/template/template.directive';
import { TreeModel } from '../model/tree-model';
// import { DoCheck, IterableDiffer, IterableDiffers } from '@angular/core';

@Component({
  selector: 'cui-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [TreeModel]
})
export class TreeComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {
  // @Input() value: TreeNode[];
  @Input() id: string;
  // @Input() value: any;
  @Input() selectionMode: string; // null | single | multiple | checkbox
  // @Input() selection: CuiTreeNode[];
  @Input() style: any;
  @Input() styleClass: string;
  // @Input() config: CuiTreeConfig;
  @Input() metaKeySelection: boolean = true;
  @Input() propagateSelectionUp: boolean = true;
  @Input() propagateSelectionDown: boolean = true;

  @Output() selectionChange: EventEmitter<any> = new EventEmitter();
  @Output() nodeSelect: EventEmitter<any> = new EventEmitter();
  @Output() nodeUnselect: EventEmitter<any> = new EventEmitter();
  @Output() nodeExpand: EventEmitter<any> = new EventEmitter();
  @Output() nodeCollapse: EventEmitter<any> = new EventEmitter();

  @ContentChildren(CuiTemplateDirective) templates: QueryList<any>;

  nodes: CuiTreeNode[];
  nodeTouched: boolean;
  // selection: CuiTreeNode[];
  // selectionDiffer: IterableDiffer<any>;

  constructor(public treeModel: TreeModel) {
    // this.selectionDiffer = differ.find([]).create(null);
  }

  @Input() set value(value: any) { }
  @Input() set config(config: CuiTreeConfig) { }

  get config(): CuiTreeConfig {
    return this.treeModel.config;
  }

  get selection(): CuiTreeNode[] {
    return this.treeModel.selection;
  }

  set selection(val: CuiTreeNode[]) {
    this.treeModel.selection = val;
  }

  get isSingleSelectionMode() {
    return this.selectionMode && this.selectionMode == 'single';
  }

  get isMultipleSelectionMode() {
    return this.selectionMode && this.selectionMode == 'multiple';
  }

  get isCheckboxSelectionMode() {
    return this.selectionMode && this.selectionMode == 'checkbox';
  }

  ngOnInit() {
    // console.log(this.value);
    // this.config = Object.assign({}, defaultTreeConfig, this.config);
  }

  ngAfterContentInit() {
    if (this.templates.length) {
      // cache template
    }
  }

  ngOnChanges(changes) {
    this.treeModel.setData({
      nodes: changes.value && changes.value.currentValue,
      config: changes.config && changes.config.currentValue,
      events: { 'selectionChange': this.selectionChange }
    });
    // console.log('changes', changes)
    // console.log('treeModel', this.treeModel);
  }

  /* ngDoCheck() {
    let selectionChanges = this.selectionDiffer.diff(this.selection);

    if (selectionChanges) {
      this.selectionChange.emit(this.selection);
    }
  } */

  ngOnDestroy() {

  }

  onNodeClick(event: MouseEvent, node: CuiTreeNode) {
    let eventTarget = <Element>event.target;

    if (eventTarget.className && eventTarget.className.indexOf('cui-treenode-toggler') >= 0) {
      return;
    }

    if (!this.selectionMode || node.selectable === false) {
      return;
    }

    let index = this.findIndexInSelection(node);
    let selected = index >= 0;

    if (this.isCheckboxSelectionMode) {
      if (selected) {
        // 事件/属性传播属性
        if (this.propagateSelectionDown) {
          this.propagateDown(node, false);
        } else {
          this.selection = this.selection.filter((n, i) => i != index);
        }

        if (this.propagateSelectionUp && node.parent) {
          this.propagateUp(node.parent, false);
        }

        this.selectionChange.emit(this.selection);
        this.nodeUnselect.emit({ originalEvent: event, node: node });
      } else {
        // 事件/属性传播属性
        if (this.propagateSelectionDown) {
          this.propagateDown(node, true);
        } else {
          this.selection = [...this.selection || [], node];
        }

        if (this.propagateSelectionUp && node.parent) {
          this.propagateUp(node.parent, true);
        }

        this.selectionChange.emit(this.selection);
        this.nodeSelect.emit({ originalEvent: event, node: node });
      }

      // this.selectionChange.emit(this.selection);
      // this.nodeSelect.emit({ originalEvent: event, node: node });

      return;
    }

    let metaSelection = this.nodeTouched ? false : this.metaKeySelection;
    if (metaSelection) {
      let metaKey = (event.metaKey || event.ctrlKey);

      if (selected && metaKey) {
        if (this.isSingleSelectionMode) {
          this.selectionChange.emit(null);
        } else {
          this.selection = this.selection.filter((val, i) => i != index);
          this.selectionChange.emit(this.selection);
        }

        this.nodeUnselect.emit({ originalEvent: event, node: node });
      } else {
        if (this.isSingleSelectionMode) {
          this.selection = [node];
          this.selectionChange.emit([node]);
        }
        if (this.isMultipleSelectionMode) {
          this.selection = (!metaKey) ? [] : this.selection || [];
          this.selection = [...this.selection, node];
          this.selectionChange.emit(this.selection);
        }
        this.nodeSelect.emit({ originalEvent: event, node: node });
      }
    } else {
      if (this.isSingleSelectionMode) {
        if (selected) {
          this.selection = null;
          this.nodeUnselect.emit({ originalEvent: event, node: node });
        } else {
          this.selection = [node];
          this.nodeSelect.emit({ originalEvent: event, node: node });
        }
      } else {
        if (selected) {
          this.selection = this.selection.filter((val, i) => i != index);
          this.nodeUnselect.emit({ originalEvent: event, node: node });
        } else {
          this.selection = [...this.selection || [], node];
          this.nodeSelect.emit({ originalEvent: event, node: node });
        }
      }

      this.selectionChange.emit(this.selection);
    }

    this.nodeTouched = false;
  }

  onNodeTouchEnd() {
    this.nodeTouched = true;
  }

  onNodeRightClick(event: MouseEvent, node: CuiTreeNode) {
    // TODO: 加载上下文菜单
  }

  findIndexInSelection(node: CuiTreeNode): number {
    let index: number = -1;

    if (this.selectionMode && this.selection) {
      index = this.selection.findIndex((n, i) => n == node);
    }

    return index;
  }

  propagateUp(node: CuiTreeNode, select: boolean) {
    if (node.children && node.children.length) {
      let selectedCount: number = 0;
      let childPartialSelected: boolean = false;
      for (let child of node.children) {
        if (this.isSelected(child)) {
          selectedCount++;
        } else if (child.partialSelected) {
          childPartialSelected = true;
        }
      }

      if (select && selectedCount == node.children.length) {
        this.selection = [...this.selection || [], node];
        node.partialSelected = false;
      } else {
        if (!select) {
          let index = this.findIndexInSelection(node);
          if (index >= 0) {
            this.selection = this.selection.filter((val, i) => i != index);
          }
        }

        if (childPartialSelected || selectedCount > 0 && selectedCount != node.children.length) {
          node.partialSelected = true;
        } else {
          node.partialSelected = false;
        }
      }
    }

    let parent = node.parent;
    if (parent) {
      this.propagateUp(parent, select);
    }
  }

  propagateDown(node: CuiTreeNode, select: boolean) {
    let index = this.findIndexInSelection(node);

    if (select && index == -1) {
      this.selection = [...this.selection || [], node];
    } else if (!select && index > -1) {
      this.selection = this.selection.filter((val, i) => i != index);
    }

    node.partialSelected = false;

    if (node.children && node.children.length) {
      for (let child of node.children) {
        this.propagateDown(child, select);
      }
    }
  }

  isSelected(node: CuiTreeNode) {
    return this.findIndexInSelection(node) != -1;
  }

  getTemplateForNode() {

  }

  getNodeByParam(key: string, value: any, parentNode?: CuiTreeNode): CuiTreeNode {
    let results = this.treeModel.filter(node => {
      return node[key] == value || node.data[key] == value;
    }, parentNode);

    if (results && results.length > 0) {
      return results[0];
    }

    return null;
  }

  getNodeById(id: any): CuiTreeNode {
    return this.getNodeByParam('id', id);
  }

  selectNode(node: CuiTreeNode) {
    this.treeModel.addSelection(node);
  }

  removeSelection(node: CuiTreeNode) {
    this.treeModel.removeSelection(node);
  }
}
