import { ShowcaseLayoutMainComponent } from './common/shared/showcase-layout/showcase-layout-main/showcase-layout-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ShowcaseLayoutMainComponent, children: [
    {path: '', redirectTo: 'showcase/data/data-table', pathMatch: 'full'},
    {path: 'intro', loadChildren: 'app/showcase/intro/intro.module#IntroModule'},
    {path: 'showcase', children: [
      // {path: 'data', loadChildren: 'app/showcase/data-showcase/data-showcase.module#DataShowcaseModule'}
      {path: 'layout', loadChildren: 'app/showcase/layout-showcase/layout-showcase.module#LayoutShowcaseModule'},
      {path: 'data', loadChildren: 'app/showcase/data-showcase/data-showcase.module#DataShowcaseModule'},
      {path: 'cropper', loadChildren: 'app/showcase/cropper-showcase/cropper-showcase.module#CropperShowcaseModule'},
    ]},
  ]}
,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ShowcaseRoutingModule { }

export const routedComponents = [];
