import { LayoutShowcaseComponent } from './layout-showcase.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LayoutShowcaseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutShowcaseRoutingModule { }

export const routedComponents = [LayoutShowcaseComponent];
