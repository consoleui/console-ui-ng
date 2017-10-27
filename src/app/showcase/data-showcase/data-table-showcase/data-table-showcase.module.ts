import { DataTableApiMockService } from './data-table-api-mock.service';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../common/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableShowcaseComponent } from './data-table-showcase.component';
import { DataTableSimpleDemoComponent } from './data-table-simple-demo/data-table-simple-demo.component';
import { DataTableSelectionDemoComponent } from './data-table-selection-demo/data-table-selection-demo.component';
import { DataTableSelectionPropsDemoComponent } from './data-table-selection-props-demo/data-table-selection-props-demo.component';
import { DataTableFilterDemoComponent } from './data-table-filter-demo/data-table-filter-demo.component';
import { DataTableSortDemoComponent } from './data-table-sort-demo/data-table-sort-demo.component';
import { DataTablePaginationDemoComponent } from './data-table-pagination-demo/data-table-pagination-demo.component';
import { DataTableExpandedDemoComponent } from './data-table-expanded-demo/data-table-expanded-demo.component';
import { DataTableSynthesizeDemoComponent } from './data-table-synthesize-demo/data-table-synthesize-demo.component';
import { DataTableTipsDemoComponent } from './data-table-tips-demo/data-table-tips-demo.component';

const routes: Routes = [
  { path: '', component: DataTableShowcaseComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DataTableShowcaseComponent, DataTableSimpleDemoComponent,
    DataTableSelectionDemoComponent, DataTableSelectionPropsDemoComponent,
    DataTableFilterDemoComponent, DataTableSortDemoComponent,
    DataTablePaginationDemoComponent, DataTableExpandedDemoComponent, DataTableSynthesizeDemoComponent, DataTableTipsDemoComponent],
  providers: [DataTableApiMockService]
})
export class DataTableShowcaseModule { }
