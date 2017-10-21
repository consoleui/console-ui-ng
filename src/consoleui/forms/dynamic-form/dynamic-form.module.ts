import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormService } from './dynamic-form.service';
import { FormFieldComponent } from './form-field/form-field.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [DynamicFormComponent, FormFieldComponent],
  exports: [DynamicFormComponent, FormFieldComponent],
  providers: [DynamicFormService]
})
export class DynamicFormModule { }
