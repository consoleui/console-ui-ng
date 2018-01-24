import {
  NgModule, Component, Input, Output, AfterViewInit, ElementRef,
  EventEmitter, forwardRef, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioComponent),
  multi: true
};

@Component({
  selector: 'cui-radio, [cui-radio]',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [RADIO_VALUE_ACCESSOR]
})
export class RadioComponent implements ControlValueAccessor, AfterViewInit {

  @Input() value: any;

  @Input() name: string;

  @Input() disabled: boolean;

  @Input() label: string;

  @Input() tabindex: number;

  @Input() inputId: string;

  @Input() style: any;

  @Input() styleClass: string;

  @Output() onClick: EventEmitter<any> = new EventEmitter();

  @ViewChild('rb') inputViewChild: ElementRef;

  public input: HTMLInputElement;


  public checked: boolean;

  public focused: boolean;

  public onModelChange: Function = () => { };

  public onModelTouched: Function = () => { };

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.input = <HTMLInputElement>this.inputViewChild.nativeElement;
  }

  handleClick() {
    if (!this.disabled) {
      this.onClick.emit(null);
      this.select();
    }
  }

  select() {
    if (!this.disabled) {
      this.input.checked = true;
      this.checked = true;
      this.onModelChange(this.value);
    }
  }

  writeValue(value: any): void {
    this.checked = (value == this.value);

    if (this.input) {
      this.input.checked = this.checked;
    }

    this.cd.markForCheck();
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

  onFocus(event) {
    this.focused = true;
  }

  onBlur(event) {
    this.focused = false;
    this.onModelTouched();
  }

  onChange(event) {
    this.select();
  }
}
