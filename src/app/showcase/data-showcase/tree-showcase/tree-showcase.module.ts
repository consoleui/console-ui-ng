import { TreeDataApiMockService } from './tree-data-api-mock.service';
import { SharedModule } from './../../common/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TreeShowcaseComponent } from './tree-showcase.component';
import { TreeDynamicNodeDemoComponent } from './tree-dynamic-node-demo/tree-dynamic-node-demo.component';
import { TreeSingleSelectDemoComponent } from './tree-single-select-demo/tree-single-select-demo.component';
import { TreeMultipleSelectDemoComponent } from './tree-multiple-select-demo/tree-multiple-select-demo.component';
import { TreeCheckboxSelectDemoComponent } from './tree-checkbox-select-demo/tree-checkbox-select-demo.component';
import { TreeInterceptSelectDemoComponent } from './tree-intercept-select-demo/tree-intercept-select-demo.component';

const routes: Routes = [
  { path: '', component: TreeShowcaseComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    TreeShowcaseComponent,
    TreeDynamicNodeDemoComponent,
    TreeSingleSelectDemoComponent,
    TreeMultipleSelectDemoComponent,
    TreeCheckboxSelectDemoComponent,
    TreeInterceptSelectDemoComponent
  ],
  providers: [
    TreeDataApiMockService
  ]
})
export class TreeShowcaseModule { }
