import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseField } from './../base-field';
import { DynamicFormService } from './../dynamic-form.service';

@Component({
  selector: 'cui-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: BaseField<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private dfs: DynamicFormService) { }

  ngOnInit() {
    console.log(this.fields);
    this.form = this.dfs.toFormGroup(this.fields);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }

}
