import { Component, Input } from '@angular/core';
import { BaseField } from '../base-field';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cui-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {

  @Input() field: BaseField<any>;
  @Input() form: FormGroup;

  get isValid() {
    return this.form.controls[this.field.key].valid;
  }

  constructor() { }

}
