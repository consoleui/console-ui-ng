import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import * as Cropper from "cropperjs";


export interface IImageCropperSetting {
  width: number;
  height: number;
}

export interface IImageCropperResult {
  imageData: Cropper.ImageData;
  cropData: Cropper.CropBoxData;
  blob?: Blob;
  dataUrl?: string;
}

@Component({
  selector: 'cui-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss', './cropper.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ImageCropperComponent {
  @Input() imageUrl;
  @Input() viewMode;
  @Input() moveable: boolean = true;
  @Input() scalable: boolean = true;
  @Input() zoomable: boolean = true;
  @Input() settings: IImageCropperSetting;
  @Input() cropbox: Cropper.CropBoxData;
  @Input() loadImageErrorText: string;
  @Input() cropperOptions: Cropper.CropperOptions;
  @ViewChild('image') image: ElementRef;
  @Output() export = new EventEmitter<IImageCropperResult>();
  @Output() ready = new EventEmitter();
  @Output() origin = new EventEmitter();

  private cropper: Cropper;
  private isLoading = true;
  private imageElement: HTMLImageElement;
  private loadError;

  constructor() { }

  imageLoaded(ev: Event) {
    this.loadError = false;
    let image = ev.target as HTMLImageElement;
    this.imageElement = image;
    image.crossOrigin = 'anonymous';

    image.addEventListener('ready', () => {
      this.ready.emit(true);
      this.isLoading = false;
      if (this.cropbox) {
        this.cropper.setCropBoxData(this.cropbox);
      }
    });

    this.cropper = new Cropper(image, this.cropperOption);
  }

  imageLoadError(event) {
    this.loadError = true;
    this.isLoading = false;
  }

  exportCanvas(base64?) {
    let imageData = this.cropper.getImageData();
    let cropData = this.cropper.getCropBoxData();
    let canvas = this.cropper.getCroppedCanvas();
    let data = {
      imageData,
      cropData,
    };

    let promise = new Promise(resolve => {
      if (base64) {
        return resolve({
          dataUrl: canvas.toDataURL('image/png'),
        });
      }
      canvas.toBlob(blob => resolve({ blob }));
    });

    promise.then(res => {
      this.export.emit(Object.assign(data, res));
      this.origin.emit(this.cropper);
    });
  }

  private get cropperOption(): Cropper.CropperOptions {
    let aspectRatio = NaN;
    if (this.settings) {
      let { width, height } = this.settings;
      aspectRatio = width / height;
    }

    return Object.assign({
      aspectRatio,
      movable: this.moveable,
      scalable: this.scalable,
      zoomable: this.zoomable,
      viewMode: this.viewMode,
    }, this.cropperOptions);
  }


}
