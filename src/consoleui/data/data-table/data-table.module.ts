import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuiCoreModule } from '../../core/core.module';
import { DataTableComponent } from './data-table.component';
import { PaginationModule } from '../pagination/pagination.module';
import { ColTplDirective } from './col-tpl.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CuiCoreModule,
    PaginationModule
  ],
  declarations: [DataTableComponent, ColTplDirective],
  exports: [DataTableComponent, ColTplDirective]
})
export class DataTableModule { }
