import {
  Component, AfterViewInit, AfterContentInit, AfterViewChecked, forwardRef,
  Input, Output, EventEmitter, ElementRef, QueryList, ContentChildren,
  Renderer2, ChangeDetectorRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { CuiTemplateDirective } from '../../core/template/template.directive';
import { DomHandler } from '../../core/dom/dom-handler';
import { ObjectUtils } from '../../core/utils/object-utils';


export const AUTOCOMPLETE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutocompleteComponent),
  multi: true
};

@Component({
  selector: 'cui-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  host: {
        '[class.ui-inputwrapper-filled]': 'filled',
        '[class.ui-inputwrapper-focus]': 'focus'
  },
  providers: [AUTOCOMPLETE_VALUE_ACCESSOR]
})
export class AutocompleteComponent implements AfterViewInit, AfterContentInit, AfterViewChecked, ControlValueAccessor, OnDestroy {

  @Input() minLength: number = 1;
  @Input() depay: number = 300;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() inputStyle: any;
  @Input() inputId: string;
  @Input() inputStyleClass: string;
  @Input() placeholder: string;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() maxlength: number;
  @Input() size: number;
  @Input() appendTo: any;
  @Input() autoHighlight: boolean;
  @Input() type: string = 'text';
  @Input() field: string;
  @Input() scrollHeight: string = '200px';
  @Input() dropdown: boolean;
  @Input() multiple: boolean;
  @Input() tabindex: number;
  @Input() dataKey: string;
  @Input() emptyMessage: string;

  @Output() completeMethod: EventEmitter<any> = new EventEmitter();
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onUnselect: EventEmitter<any> = new EventEmitter();
  @Output() onFocus: EventEmitter<any> = new EventEmitter();
  @Output() onBlur: EventEmitter<any> = new EventEmitter();
  @Output() onDropdownClick: EventEmitter<any> = new EventEmitter();
  @Output() onClear: EventEmitter<any> = new EventEmitter();

  @ViewChild('in') inputEL: ElementRef;
  @ViewChild('multiIn') multiInputEL: ElementRef;
  @ViewChild('panel') panelEL: ElementRef;
  @ViewChild('multiContainer') multiContainerEL: ElementRef;
  @ContentChildren(CuiTemplateDirective) templates: QueryList<any>;

  public itemTemplate: TemplateRef<any>;
  public selectedItemTemplate: TemplateRef<any>;

  _suggestions: any[];
  value: any;
  timeout: any;
  differ: any;
  panelVisible: boolean = false;
  documentClickListener: any;
  suggestionsUpdated: boolean;
  highlightOption: any;
  highlightOptionChanged: boolean;
  focus: boolean = false;
  filled: boolean;
  inputClick: boolean;
  inputKeyDown: boolean;
  noResults: boolean;

  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  constructor(
    public el: ElementRef,
    public renderer: Renderer2,
    public cd: ChangeDetectorRef,
    public domHandler: DomHandler
  ) { }

  @Input() get suggestions(): any[] {
    return this._suggestions;
  }

  set suggestions(val: any[]) {
    this._suggestions = val;

    if (this.panelEL && this.panelEL.nativeElement) {
      this.noResults = !(this._suggestions && this._suggestions.length > 0);
      if (!this.noResults) {
        this.show();
        this.suggestionsUpdated = true;

        if (this.autoHighlight) {
          this.highlightOption = this._suggestions[0]
        }
      } else {
        if (this.emptyMessage) {
          this.show();
          this.suggestionsUpdated = true;
        } else {
          this.hide();
        }
      }
    }
  }

  ngAfterContentInit() {
    this.templates.forEach(it => {
      switch (it.getType()) {
        case 'item':
          this.itemTemplate = it.template;
          break;
        case 'selectedItem':
          this.selectedItemTemplate = it.template;
          break;
        default:
          this.itemTemplate = it.template;
      }
    });
  }

  ngAfterViewInit() {
    if (this.appendTo) {
      if (this.appendTo === 'body') {
        document.body.appendChild(this.panelEL.nativeElement);
      } else {
        this.domHandler.appendChild(this.panelEL.nativeElement, this.appendTo);
      }
    }
  }

  ngAfterViewChecked() {
    if (this.suggestionsUpdated) {
      this.align();
      this.suggestionsUpdated = false;
    }

    if (this.highlightOptionChanged) {
      let listItem = this.domHandler.findSingle(this.panelEL.nativeElement, 'li.ui-state-highlight');
      if (listItem) {
        this.domHandler.scrollInView(this.panelEL.nativeElement, listItem);
      }
      this.highlightOptionChanged = false;
    }
  }

  writeValue(value: any) {
    if (!value) {
      value = '';
    }
    this.value = value;
    this.filled = this.value && this.value !== '';
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onModelTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  onInput(event: KeyboardEvent) {
    if (!this.inputKeyDown) {
      return;
    }

    let value = (<HTMLInputElement>event.target).value;

    if (!this.multiple) {
      this.onModelChange(value);
    }

    if (value.length === 0) {
      this.hide();
      this.onClear.emit(event);
    }

    if (value.length >= this.minLength) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.search(event, value);
      }, this.depay);
    } else {
      this.suggestions = null;
    }

    this.updateFilledState();
    this.inputKeyDown = false;
  }

  onInputClick(event: MouseEvent) {
    if (this.documentClickListener) {
      this.inputClick = true;
    }
  }

  search(event: any, query: string) {
    // allow empty string but not undefined or null
    if (query === undefined || query === null) {
      return;
    }

    this.completeMethod.emit({
      originalEvent: event,
      query: query
    });
  }

  selectItem(option: any) {
    if (this.multiple) {
      this.multiInputEL.nativeElement.value = '';
      this.value = this.value || [];
      if (!this.isSelected(option)) {
        this.value = [...this.value, option];
        this.onModelChange(this.value);
      }
    } else {
      this.inputEL.nativeElement.value = this.field ? ObjectUtils.resolveFieldData(option, this.field) || '' : option;
      this.value = option;
      this.onModelChange(this.value);
    }

    this.onSelect.emit(option);

    this.focusInput();
  }

  show() {
    if (this.multiInputEL || this.inputEL) {
      let hasFocus = this.multiple ?
        document.activeElement === this.multiInputEL.nativeElement : document.activeElement === this.inputEL.nativeElement;
      if (!this.panelVisible && hasFocus) {
        this.panelVisible = true;
        this.panelEL.nativeElement.style.zIndex = ++DomHandler.zindex;
        this.domHandler.fadeIn(this.panelEL.nativeElement, 200);
        this.bindDocumentClickListener();
      }
    }
  }

  align() {
    if (this.appendTo) {
      this.domHandler.absolutePosition(this.panelEL.nativeElement,
        (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
    } else {
      this.domHandler.relativePosition(this.panelEL.nativeElement,
        (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
    }
  }

  hide() {
    this.panelVisible = false;
    this.unbindDocumentClickListener();
  }

  handleDropdownClick(event) {
    this.focusInput();
    let queryValue = this.multiple ? this.multiInputEL.nativeElement.value : this.inputEL.nativeElement.value;
    console.log(2);
    this.onDropdownClick.emit({
      originalEvent: event,
      query: queryValue
    });
  }

  focusInput() {
    if (this.multiple) {
      this.multiInputEL.nativeElement.focus();
    } else {
      this.inputEL.nativeElement.focus();
    }
  }

  removeItem(item: any) {
    let itemIndex = this.domHandler.index(item);
    let removedValue = this.value[itemIndex];
    this.value = this.value.filter((val, i) => i != itemIndex);
    this.onUnselect.emit(removedValue);
    this.onModelChange(this.value);
  }

  onKeydown(event) {
    if (this.panelVisible) {
      let highlightItemIndex = this.findOptionIndex(this.highlightOption);

      switch (event.which) {
        // down
        case 40:
          if (highlightItemIndex != -1) {
            let nextItemIndex = highlightItemIndex + 1;
            if (nextItemIndex != (this.suggestions.length)) {
              this.highlightOption = this.suggestions[nextItemIndex];
              this.highlightOptionChanged = true;
            }
          } else {
            this.highlightOption = this.suggestions[0];
          }

          event.preventDefault();
          break;

        // up
        case 38:
          if (highlightItemIndex > 0) {
            let prevItemIndex = highlightItemIndex - 1;
            this.highlightOption = this.suggestions[prevItemIndex];
            this.highlightOptionChanged = true;
          }

          event.preventDefault();
          break;

        // enter
        case 13:
          if (this.highlightOption) {
            this.selectItem(this.highlightOption);
            this.hide();
          }
          event.preventDefault();
          break;

        // escape
        case 27:
          this.hide();
          event.preventDefault();
          break;


        // tab
        case 9:
          if (this.highlightOption) {
            this.selectItem(this.highlightOption);
          }
          this.hide();
          break;
      }
    } else {
      if (event.which === 40 && this.suggestions) {
        this.search(event, event.target.value);
      }
    }

    if (this.multiple) {
      switch (event.which) {
        // backspace
        case 8:
          if (this.value && this.value.length && !this.multiInputEL.nativeElement.value) {
            this.value = [...this.value];
            let removedValue = this.value.pop();
            this.onUnselect.emit(removedValue);
            this.onModelChange(this.value);
          }
          break;
      }
    }

    this.inputKeyDown = true;
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

  onInputChange(event) {
    this.value = (<HTMLInputElement>event.target).value;
  }

  isSelected(val: any): boolean {
    let selected: boolean = false;
    if (this.value && this.value.length) {
      for (let i = 0; i < this.value.length; i++) {
        if (ObjectUtils.equals(this.value[i], val, this.dataKey)) {
          selected = true;
          break;
        }
      }
    }
    return selected;
  }

  findOptionIndex(option): number {
    let index: number = -1;
    if (this.suggestions) {
      for (let i = 0; i < this.suggestions.length; i++) {
        if (ObjectUtils.equals(option, this.suggestions[i])) {
          index = i;
          break;
        }
      }
    }

    return index;
  }

  updateFilledState() {
    if (this.multiple) {
      this.filled = (this.value && this.value.length) ||
        (this.multiInputEL && this.multiInputEL.nativeElement && this.multiInputEL.nativeElement.value != '');
    } else {
      this.filled = this.inputEL && this.inputEL.nativeElement && this.inputEL.nativeElement.value != '';
    }
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
        if (event.which === 3) {
          return;
        }

        if (this.inputClick) {
          this.inputClick = false;
        } else {
          this.hide();
        }

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
    this.unbindDocumentClickListener();

    if (this.appendTo) {
      this.el.nativeElement.appendChild(this.panelEL.nativeElement);
    }
  }
}
