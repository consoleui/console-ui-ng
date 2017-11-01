import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';

@NgModule({
    imports: [CommonModule],
    exports: [ImageCropperComponent],
    declarations: [ImageCropperComponent],
    providers: [],
})
export class CropperModule { }
