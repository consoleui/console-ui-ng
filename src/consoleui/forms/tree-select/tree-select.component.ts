import { TreeComponent } from './../../data/tree/tree/tree.component';
import { DomHandler } from './../../core/dom/dom-handler';
import {
  Component, OnInit, Input, Output, EventEmitter, forwardRef, Renderer2,
  ChangeDetectorRef, ElementRef, ViewChild, AfterViewInit, AfterViewChecked, OnDestroy
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TreeNode } from '../../data/tree/model/tree-node';
import { CuiTreeConfig } from '../../data/tree';

export const SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TreeSelectComponent),
  multi: true
};

@Component({
  selector: 'cui-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.scss'],
  providers: [SELECT_VALUE_ACCESSOR]
})
export class TreeSelectComponent implements OnInit, AfterViewInit, AfterViewChecked, ControlValueAccessor, OnDestroy {

  @Input() scrollHeight: string = '200px';
  @Input() filter: boolean;
  @Input() style: any;
  @Input() panelStyle: any;
  @Input() styleClass: string;
  @Input() panelStyleClass: string;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() autoWidth: boolean = true;
  @Input() required: boolean;
  // @Input() editable: boolean;
  @Input() appendTo: any;
  @Input() tabindex: number;
  @Input() placeholder: string;
  @Input() filterPlaceholder: string;
  @Input() inputId: string;
  @Input() dataKey: string;
  @Input() filterBy: string = 'label';
  @Input() allowClear: boolean;

  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onFocus: EventEmitter<any> = new EventEmitter();
  @Output() onBlur: EventEmitter<any> = new EventEmitter();

  @ViewChild('container') containerViewChild: ElementRef;
  @ViewChild('panel') panelViewChild: ElementRef;
  @ViewChild('itemswrapper') itemsWrapperViewChild: ElementRef;
  @ViewChild('filter') filterViewChild: ElementRef;
  @ViewChild('in') focusViewChild: ElementRef;
  @ViewChild('tree') tree: TreeComponent;

  value: any;
  hover: boolean;
  focus: boolean;

  public panelVisible: boolean = false;
  public shown: boolean;
  public documentClickListener: any;
  // public optionsChanged: boolean;
  public panel: HTMLDivElement;
  public container: HTMLDivElement;
  public itemsWrapper: HTMLDivElement;
  public initialized: boolean;
  public selfClick: boolean;
  public itemClick: boolean;
  public hoveredItem: any;
  public selectedOptionUpdated: boolean;
  public filterValue: string;

  isClearClick: boolean = false;

  defaultOptions;
  open = false;

  @Input() name: string;
  @Input() selected: any;
  // @Input() data: any[];
  @Input() config: CuiTreeConfig;

  @Output() change = new EventEmitter();

  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  get label(): string {
    // return (this.selected ? this.selected.label : this.placeholder);
    return this.value ? this.value[this.config.data.key.label] : this.placeholder;
  }

  constructor(
    public el: ElementRef,
    public domHandler: DomHandler,
    public renderer: Renderer2,
    private cd: ChangeDetectorRef,
  ) {
    this.defaultOptions = {};
  }

  ngOnInit() {
    this.config = Object.assign({}, this.defaultOptions, this.config);

    // this.optionsToDisplay = this.options;
    // this.updateSelectedOption(null);
  }

  ngAfterViewInit() {
    this.container = <HTMLDivElement>this.containerViewChild.nativeElement;
    this.panel = <HTMLDivElement>this.panelViewChild.nativeElement;
    this.itemsWrapper = <HTMLDivElement>this.itemsWrapperViewChild.nativeElement;

    this.updateDimensions();
    this.initialized = true;

    if (this.appendTo) {
      if (this.appendTo === 'body') {
        document.body.appendChild(this.panel);
      } else {
        this.domHandler.appendChild(this.panel, this.appendTo);
      }
    }
  }

  ngAfterViewChecked() {
    if (this.shown) {
      this.onShow();
      this.shown = false;
    }

    /* if (this.optionsChanged && this.panelVisible) {
      this.optionsChanged = false;
      this.alignPanel();
    } */

    if (this.selectedOptionUpdated && this.itemsWrapper) {
      let selectedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
      if (selectedItem) {
        this.domHandler.scrollInView(this.itemsWrapper, this.domHandler.findSingle(this.panel, 'li.ui-state-highlight'));
      }
      this.selectedOptionUpdated = false;
    }
  }

  writeValue(value: any) {
    if (this.filter) {
      this.resetFilter();
    }

    this.value = value;
    // this.updateSelectedOption(value);
    // this.updateEditableLabel();
    this.cd.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  resetFilter() {
    if (this.filterViewChild && this.filterViewChild.nativeElement) {
      this.filterViewChild.nativeElement.value = '';
    }

    // this.optionsToDisplay = this.options;
  }

  updateSelected() {

  }

  onSelectionChange(nodes: TreeNode[]) {
    console.log('Tree-Select Component slected nodes: ', nodes);
    if (!nodes) {
      return;
    }

    this.value = nodes[0].data;
    this.onModelChange(this.value);

    this.hide();

    this.change.emit(this.value);
  }

  updateDimensions() {
    /* if (this.autoWidth) {
      let select = this.domHandler.findSingle(this.el.nativeElement, 'select');
      console.log(select, select.offsetWidth)
      if (!this.style || (!this.style['width'] && !this.style['min-width'])) {
        this.el.nativeElement.children[0].style.width = select.offsetWidth + 30 + 'px';
      }
    } */
  }

  onItemClick() {
    this.itemClick = true;
  }

  onMouseClick(event) {
    if (this.disabled || this.readonly) {
      return;
    }

    this.selfClick = true;

    if (this.isClearClick) {
      this.isClearClick = false;
      return;
    }

    if (!this.itemClick) {
      this.focusViewChild.nativeElement.focus();

      if (this.panelVisible) {
        this.hide();
      } else {
        this.show();

        if (this.filterViewChild != undefined) {
          setTimeout(() => {
            this.filterViewChild.nativeElement.focus();
          }, 200);
        }
      }
    }
  }

  onShow() {
    // TODO: if tree inited
    this.alignPanel();
    this.bindDocumentClickListener();

    // scroll to selected
  }

  show() {
    if (this.appendTo) {
      this.panel.style.minWidth = this.domHandler.getWidth(this.container) + 'px';
    }

    this.panel.style.zIndex = String(++DomHandler.zindex);
    this.panelVisible = true;
    this.shown = true;
  }

  hide() {
    this.panelVisible = false;
  }

  alignPanel() {
    if (this.appendTo) {
      this.domHandler.absolutePosition(this.panel, this.container);
    } else {
      this.domHandler.relativePosition(this.panel, this.container);
    }
  }

  onInputFocus(event) {
    this.focus = true;
    this.onFocus.emit(event);
  }

  onInputBlur(event) {
    this.focus = false;
    this.onModelTouched();
    this.onBlur.emit(event);
  }

  onKeydown(event) {
    if (this.readonly) {
      return;
    }
  }

  onFilter(event) {

  }

  applyFocus() {
    this.domHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen('document', 'click', () => {
        if (!this.selfClick && !this.itemClick) {
          this.panelVisible = false;
          this.unbindDocumentClickListener();
        }

        this.selfClick = false;
        this.itemClick = false;
        this.cd.markForCheck();
      });
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  ngOnDestroy() {
    this.initialized = false;

    this.unbindDocumentClickListener();

    if (this.appendTo) {
      this.el.nativeElement.appendChild(this.panel);
    }
  }

  clearValue() {
    this.isClearClick = true;
    if (this.tree) {
      this.tree.selection = [];
      this.value = undefined;

      this.onModelChange(this.value);

      this.hide();

      this.change.emit(this.value);
    }
  }
}
