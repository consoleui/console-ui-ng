import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { CuiCoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CuiCoreModule,
  ],
  declarations: [SelectComponent],
  exports: [SelectComponent]
})
export class SelectModule { }
