import { Component, Input, forwardRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};


@Component({
  selector: 'cui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [CHECKBOX_VALUE_ACCESSOR]
})
export class CheckboxComponent implements ControlValueAccessor {

  @Input() value: any;
  @Input() name: string;
  @Input() disabled: boolean;
  @Input() binary: string;
  @Input() label: string;
  @Input() tabindex: number;
  @Input() inputId: string;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() indeterminate: boolean;

  @Output() change: EventEmitter<any> = new EventEmitter();

  model: any;
  focused: boolean = false;
  @Input() checked: boolean = false;

  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };


  constructor(private cd: ChangeDetectorRef) { }

  // @Override()
  writeValue(model: any) {
    this.model = model;
    this.checked = this.isChecked();
    this.cd.markForCheck();
  }

  // @Override()
  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  // @Override()
  registerOnTouched(fn: Function) {
    this.onModelTouched = fn;
  }

  onClick(event: Event, checkbox, focus: boolean) {
    event.preventDefault();

    if (this.disabled) {
      return;
    }

    this.checked = !this.checked;
    this.updateModel();

    if (focus) {
      checkbox.focus();
    }
  }

  updateModel() {
    if (!this.binary) {
      if (this.checked) {
        this.addValue();
      } else {
        this.removeValue();
      }

      this.onModelChange(this.model);
    } else {
      this.onModelChange(this.checked);
    }

    this.change.emit(this.checked);
  }

  handleChange(event) {
    this.checked = event.target.checked;
    this.updateModel();
  }

  isChecked(): boolean {
    if (this.binary) {
      return this.model;
    } else {
      return this.model && this.model.indexOf(this.value) > -1;
    }
  }

  removeValue() {
    this.model = this.model.filter(val => val !== this.value);
  }

  addValue() {
    if (this.model) {
      this.model = [...this.model, this.value];
    } else {
      this.model = [this.value];
    }
  }

  onFocus(event) {
    this.focused = true;
  }

  onBlur(event) {
    this.focused = false;
    this.onModelTouched();
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
  }
}
