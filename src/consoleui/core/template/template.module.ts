import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuiTemplateWrapperDirective } from './template-wrapper.directive';
import { CuiTemplateDirective } from './template.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CuiTemplateWrapperDirective, CuiTemplateDirective],
  exports: [CuiTemplateWrapperDirective, CuiTemplateDirective],
})
export class CuiTemplateModule { }
