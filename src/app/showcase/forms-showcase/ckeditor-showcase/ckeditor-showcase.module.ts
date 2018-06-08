import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CkeditorShowcaseComponent } from './ckeditor-showcase.component';
import { CkeditorSimpleDemoComponent } from './ckeditor-simple-demo/ckeditor-simple-demo.component';
import { CkeditorFullDemoComponent } from './ckeditor-full-demo/ckeditor-full-demo.component';
import { CkeditorCustomDemoComponent } from './ckeditor-custom-demo/ckeditor-custom-demo.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../common/shared/shared.module';

const routes: Routes = [
  { path: '', component: CkeditorShowcaseComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    CkeditorShowcaseComponent,
    CkeditorSimpleDemoComponent,
    CkeditorFullDemoComponent,
    CkeditorCustomDemoComponent
  ]
})
export class CkeditorShowcaseModule { }
