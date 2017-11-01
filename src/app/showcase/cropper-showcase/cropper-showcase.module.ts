import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../common/shared/shared.module';
import { CuiCoreModule } from './../../../consoleui/core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropperShowcaseComponent } from './cropper-showcase.component';
import { ImageCropDemoComponent } from './image-crop-demo/image-crop-demo.component';

const routes: Routes = [
  { path: '', component: CropperShowcaseComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CropperShowcaseComponent, ImageCropDemoComponent]
})
export class CropperShowcaseModule { }
