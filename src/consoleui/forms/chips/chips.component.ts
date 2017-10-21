import {
  Component, ElementRef, Input, Output, EventEmitter, AfterContentInit,
  ContentChild, ContentChildren, QueryList, TemplateRef, IterableDiffers, forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DomHandler } from '../../core/dom/dom-handler';
import { CuiTemplateDirective } from '../../core/template/template.directive';

export const CHIPS_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ChipsComponent),
  multi: true
};

@Component({
  selector: 'cui-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  providers: [CHIPS_VALUE_ACCESSOR]
})
export class ChipsComponent implements AfterContentInit, ControlValueAccessor {

  @Input() style: any;
  @Input() styleClass: string;
  @Input() disabled: boolean;
  @Input() field: string;
  @Input() placeholder: string;
  @Input() max: number;
  @Input() tabindex: number;
  @Input() inputId: string;
  @Input() allowDuplicate: boolean = true;
  @Input() inputStyle: any;
  @Input() inputStyleClass: any;

  @Output() onAdd: EventEmitter<any> = new EventEmitter();
  @Output() onRemove: EventEmitter<any> = new EventEmitter();

  // @ContentChildren(CuiTemplateDirective) templates: QueryList<any>;

  @ContentChild('itemTemplate')
  public itemTemplate: TemplateRef<any>;

  value: any;

  valueChanged: boolean;

  focus: boolean;

  onModelChange: Function = () => { };

  onModelTouched: Function = () => { };


  constructor(public el: ElementRef, public domHandler: DomHandler) { }

  ngAfterContentInit() {
    /* this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'item':
          this.itemTemplate = item.template;
          break;

        default:
          this.itemTemplate = item.template;
          break;
      }
    }); */
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
  }

  resolveFieldData(data: any, field: string): any {
    if (data && field) {
      if (field.indexOf('.') == -1) {
        return data[field];
      } else {
        let fields: string[] = field.split('.');
        let value = data;
        for (let i = 0, len = fields.length; i < len; ++i) {
          value = value[fields[i]];
        }
        return value;
      }
    } else {
      return null;
    }
  }

  onFocus() {
    this.focus = true;
  }

  onBlur() {
    this.focus = false;
    this.onModelTouched();
  }

  removeItem(event: Event, index: number): void {
    if (this.disabled) {
      return;
    }

    let removedItem = this.value[index];
    this.value = this.value.filter((val, i) => i != index);
    this.onModelChange(this.value);
    this.onRemove.emit({
      originalEvent: event,
      value: removedItem
    });
  }

  onKeydown(event: KeyboardEvent, inputEL: HTMLInputElement): void {
    switch (event.which) {
      // backspace
      case 8:
        if (inputEL.value.length === 0 && this.value && this.value.length > 0) {
          this.value = [...this.value];
          let removedItem = this.value.pop();
          this.onModelChange(this.value);
          this.onRemove.emit({
            originalEvent: event,
            value: removedItem
          });
        }
        break;

      // enter
      case 13:
        this.value = this.value || [];
        if (inputEL.value && inputEL.value.trim().length && (!this.max || this.max > this.value.length)) {
          if (this.allowDuplicate || !this.value.includes(inputEL.value)) {
            this.value = [...this.value, inputEL.value];
            this.onModelChange(this.value);
            this.onAdd.emit({
              originalEvent: event,
              value: inputEL.value
            });
          }
        }
        inputEL.value = '';
        event.preventDefault();
        break;

      default:
        if (this.max && this.value && this.max === this.value.length) {
          event.preventDefault();
        }
        break;
    }
  }

  get maxedOut(): boolean {
    return this.max && this.value && this.max === this.value.length;
  }

}
