import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { CuiCoreModule } from '../core/core.module';
import { TreeSelectComponent } from './tree-select/tree-select.component';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  imports: [
    CommonModule,
    CuiCoreModule,
    TreeModule
  ],
  declarations: [SelectComponent, TreeSelectComponent],
  exports: [SelectComponent, TreeSelectComponent]
})
export class SelectModule { }
