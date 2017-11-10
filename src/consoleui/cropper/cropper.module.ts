import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ModalImageCropperComponent } from './modal-image-cropper/modal-image-cropper.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';

@NgModule({
    imports: [CommonModule, NgZorroAntdModule],
    exports: [ImageCropperComponent, ModalImageCropperComponent],
    declarations: [ImageCropperComponent, ModalImageCropperComponent],
    providers: [],
})
export class CropperModule { }
