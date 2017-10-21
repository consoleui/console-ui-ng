import {
  NgModule, Component, ElementRef, Input, Output, EventEmitter, AfterContentInit,
  ContentChildren, QueryList, TemplateRef, IterableDiffers, forwardRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectItem } from './select-item';
import { DomHandler } from '../../core/dom/dom-handler';
import { CuiTemplateDirective } from '../../core/template/template.directive';
import { ObjectUtils } from '../../core/utils/object-utils';

export const LISTBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ListboxComponent),
  multi: true
};

@Component({
  selector: 'cui-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.scss'],
  providers: [LISTBOX_VALUE_ACCESSOR]
})
export class ListboxComponent implements AfterContentInit, ControlValueAccessor {

  @Input() options: SelectItem[];

  @Input() multiple: boolean;

  @Input() style: any;

  @Input() styleClass: string;

  @Input() disabled: boolean;

  @Input() checkbox: boolean = false;

  @Input() filter: boolean = false;

  @Input() metaKeySelection: boolean = true;

  @Input() dataKey: string;

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  @Output() onDblClick: EventEmitter<any> = new EventEmitter();

  @ContentChildren(CuiTemplateDirective) templates: QueryList<any>;

  public itemTemplate: TemplateRef<any>;

  public filterValue: string;

  public visibleOptions: SelectItem[];

  public filtered: boolean;

  public value: any;

  public checkboxClick: boolean;

  public optionTouched: boolean;

  public onModelChange: Function = () => { };

  public onModelTouched: Function = () => { };

  constructor(public el: ElementRef, public domHandler: DomHandler) { }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'item':
          this.itemTemplate = item.template;
          break;

        default:
          this.itemTemplate = item.template;
          break;
      }
    });
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

  onOptionClick(event, option) {
    if (this.disabled) {
      return;
    }

    if (!this.checkboxClick) {
      if (this.multiple) {
        this.onOptionClickMultiple(event, option);
      } else {
        this.onOptionClickSingle(event, option);
      }
    } else {
      this.checkboxClick = false;
    }

    this.optionTouched = false;
  }

  onOptionTouchEnd(event, option) {
    if (this.disabled) {
      return;
    }

    this.optionTouched = true;
  }

  onOptionClickSingle(event, option) {
    let selected = this.isSelected(option);
    let valueChanged = false;
    let metaSelection = this.optionTouched ? false : this.metaKeySelection;

    if (metaSelection) {
      let metaKey = (event.metaKey || event.ctrlKey);

      if (selected) {
        if (metaKey) {
          this.value = null;
          valueChanged = true;
        }
      } else {
        this.value = option.value;
        valueChanged = true;
      }
    } else {
      this.value = selected ? null : option.value;
      valueChanged = true;
    }

    if (valueChanged) {
      this.onModelChange(this.value);
      this.onChange.emit({
        originalEvent: event,
        value: this.value
      });
    }
  }

  onOptionClickMultiple(event, option) {
    let selected = this.isSelected(option);
    let valueChanged = false;
    let metaSelection = this.optionTouched ? false : this.metaKeySelection;

    if (metaSelection) {
      let metaKey = (event.metaKey || event.ctrlKey);

      if (selected) {
        if (metaKey) {
          this.removeOption(option);
        } else {
          this.value = [option.value];
        }
        valueChanged = true;
      } else {
        this.value = (metaKey) ? this.value || [] : [];
        this.value = [...this.value, option.value];
        valueChanged = true;
      }
    } else {
      if (selected) {
        this.removeOption(option);
      } else {
        this.value = [...this.value || [], option.value];
      }

      valueChanged = true;
    }

    if (valueChanged) {
      this.onModelChange(this.value);
      this.onChange.emit({
        originalEvent: event,
        value: this.value
      });
    }
  }

  removeOption(option: any): void {
    this.value = this.value.filter(val => !ObjectUtils.equals(val, option.value, this.dataKey));
  }

  isSelected(option: SelectItem) {
    let selected = false;

    if (this.multiple) {
      if (this.value) {
        for (let val of this.value) {
          if (ObjectUtils.equals(val, option.value, this.dataKey)) {
            selected = true;
            break;
          }
        }
      }
    } else {
      selected = ObjectUtils.equals(this.value, option.value, this.dataKey);
    }

    return selected;
  }

  get allChecked(): boolean {
    if (this.filterValue && this.filterValue.trim().length) {
      return this.allFilteredSelected();
    } else {
      return this.value && this.options && (this.value.length == this.options.length);
    }
  }

  allFilteredSelected(): boolean {
    let allSelected: boolean;
    if (this.value && this.visibleOptions && this.visibleOptions.length) {
      allSelected = true;
      for (let opt of this.visibleOptions) {
        let selected: boolean;
        for (let val of this.value) {
          if (ObjectUtils.equals(val, opt.value, this.dataKey)) {
            selected = true;
          }
        }

        if (!selected) {
          allSelected = false;
          break;
        }
      }
    }

    return allSelected;
  }

  onFilter(event) {
    this.filterValue = event.target.value.trim().toLowerCase();
    this.visibleOptions = [];
    for (let i = 0; i < this.options.length; i++) {
      let option = this.options[i];
      if (option.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1) {
        this.visibleOptions.push(option);
      }
    }
    this.filtered = true;
  }

  toggleAll(event, checkbox) {
    if (this.disabled || (this.filterValue && this.filterValue.trim().length &&
      (!this.visibleOptions || this.visibleOptions.length === 0))) {
      return;
    }

    if (checkbox.checked) {
      this.value = [];
    } else {
      let opts = (this.visibleOptions && this.visibleOptions.length) ? this.visibleOptions : this.options;
      if (opts) {
        this.value = [];
        for (let i = 0; i < opts.length; i++) {
          this.value.push(opts[i].value);
        }
      }
    }
    checkbox.checked = !checkbox.checked;
    this.onModelChange(this.value);
    this.onChange.emit({ originalEvent: event, value: this.value });
  }

  isItemVisible(option: SelectItem): boolean {
    if (this.filterValue && this.filterValue.trim().length) {
      for (let i = 0; i < this.visibleOptions.length; i++) {
        if (this.visibleOptions[i].value == option.value) {
          return true;
        }
      }
    } else {
      return true;
    }
  }

  onDoubleClick(event: Event, option: SelectItem): any {
    if (this.disabled) {
      return;
    }

    this.onDblClick.emit({
      originalEvent: event,
      value: this.value
    })
  }

  onCheckboxClick(event: Event, option: SelectItem) {
    if (this.disabled) {
      return;
    }

    this.checkboxClick = true;
    let selected = this.isSelected(option);

    if (selected) {
      this.removeOption(option);
    } else {
      this.value = this.value ? this.value : [];
      this.value = [...this.value, option.value];
    }

    this.onModelChange(this.value);
    this.onChange.emit({
      originalEvent: event,
      value: this.value
    });
  }
}
