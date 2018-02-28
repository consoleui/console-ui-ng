import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router/src/config';
import { RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'ueditor', loadChildren: 'app/showcase/forms-showcase/ueditor-showcase/ueditor-showcase.module#UeditorShowcaseModule' },
      {
        path: 'fileupload',
        loadChildren: 'app/showcase/forms-showcase/fileupload-showcase/fileupload-showcase.module#FileuploadShowcaseModule'
      },
      { path: 'chips', loadChildren: 'app/showcase/forms-showcase/chips-showcase/chips-showcase.module#ChipsShowcaseModule' },
      { path: 'radio', loadChildren: 'app/showcase/forms-showcase/radio-showcase/radio-showcase.module#RadioShowcaseModule' },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: []
})
export class FormsShowcaseModule { }
