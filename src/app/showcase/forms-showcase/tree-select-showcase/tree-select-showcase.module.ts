import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeSelectShowcaseComponent } from './tree-select-showcase.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../common/shared/shared.module';
import { TreeDataApiMockService } from '../../data-showcase/tree-showcase/tree-data-api-mock.service';

const routes: Routes = [
  { path: '', component: TreeSelectShowcaseComponent}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TreeSelectShowcaseComponent],
  providers: [TreeDataApiMockService]
})
export class TreeSelectShowcaseModule { }
