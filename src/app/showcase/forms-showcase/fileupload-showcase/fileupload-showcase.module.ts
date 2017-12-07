import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../common/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploadShowcaseComponent } from './fileupload-showcase.component';
import { FileuploadSimpleDemoComponent } from './fileupload-simple-demo/fileupload-simple-demo.component';
import { FileuploadMultipleDemoComponent } from './fileupload-multiple-demo/fileupload-multiple-demo.component';
import { FileuploadSingleDemoComponent } from './fileupload-single-demo/fileupload-single-demo.component';
import { FileuploadCustomDemoComponent } from './fileupload-custom-demo/fileupload-custom-demo.component';
import { FileuploadCoverDemoComponent } from './fileupload-cover-demo/fileupload-cover-demo.component';

const routes: Routes = [
  { path: '', component: FileuploadShowcaseComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    FileuploadShowcaseComponent,
    FileuploadSimpleDemoComponent,
    FileuploadMultipleDemoComponent,
    FileuploadSingleDemoComponent,
    FileuploadCustomDemoComponent,
    FileuploadCoverDemoComponent
  ]
})
export class FileuploadShowcaseModule { }
