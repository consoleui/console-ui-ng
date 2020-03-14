import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImgLazyLoadShowcaseComponent } from './img-lazy-load-showcase/img-lazy-load-showcase.component';

const routes: Routes = [
  {path: '', component: ImgLazyLoadShowcaseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImgLazyLoadShowcaseRoutingModule { }
