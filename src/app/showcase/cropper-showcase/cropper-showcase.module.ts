import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../common/shared/shared.module';
import { CuiCoreModule } from './../../../consoleui/core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropperShowcaseComponent } from './cropper-showcase.component';
import { ImageCropModalDemoComponent } from './image-crop-modal-demo/image-crop-modal-demo.component';
import { ImageCropSimpleDemoComponent } from './image-crop-simple-demo/image-crop-simple-demo.component';

const routes: Routes = [
  { path: '', component: CropperShowcaseComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CropperShowcaseComponent,  ImageCropModalDemoComponent, ImageCropSimpleDemoComponent]
})
export class CropperShowcaseModule { }
