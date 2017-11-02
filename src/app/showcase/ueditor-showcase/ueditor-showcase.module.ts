import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../common/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UeditorShowcaseComponent } from './ueditor-showcase.component';
import { UeditorDemoComponent } from './ueditor-demo/ueditor-demo.component';
import { UeditorDefaultDemoComponent } from './ueditor-default-demo/ueditor-default-demo.component';
import { UeditorUmDemoComponent } from './ueditor-um-demo/ueditor-um-demo.component';
import { UeditorCustomDemoComponent } from './ueditor-custom-demo/ueditor-custom-demo.component';

const routes: Routes = [
  { path: '', component: UeditorShowcaseComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    UeditorShowcaseComponent,
    UeditorDemoComponent,
    UeditorDefaultDemoComponent,
    UeditorUmDemoComponent,
    UeditorCustomDemoComponent]
})
export class UeditorShowcaseModule { }
