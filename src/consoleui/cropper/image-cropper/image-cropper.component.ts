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

export interface OriginImage {
  natualWidth: number;
  natualHeight: number;
}

@Component({
  selector: 'cui-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss', './cropper.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ImageCropperComponent {
  @Input() imageUrl;
  @Input() viewMode: number = 2;
  @Input() moveable: boolean = true;
  @Input() scalable: boolean = true;
  @Input() zoomable: boolean = true;
  @Input() settings: IImageCropperSetting;
  @Input() cropbox: Cropper.CropBoxData;
  @Input() cropperOptions: Cropper.CropperOptions;
  @ViewChild('image') image: ElementRef;
  @Output() export = new EventEmitter<IImageCropperResult>();
  @Output() ready = new EventEmitter();
  @Output() origin = new EventEmitter(); // Cropper object

  private cropper: Cropper;
  private isLoading = true;
  private imageElement: HTMLImageElement;
  private loadError;

  constructor() { }

  // 计算图片宽高
  // getImgNaturalDimensions(img) {
  //   let nWidth, nHeight;
  //   if (img.naturalWidth) { // 现代浏览器
  //     nWidth = img.naturalWidth;
  //     nHeight = img.naturalHeight;
  //   } else { // IE6/7/8
  //     let image = new Image();
  //     image.src = img.src;
  //     image.addEventListener('onload', () => {
  //       nWidth = image.width;
  //       nHeight = image.height;
  //     });
  //   }
  //   return [nWidth, nHeight];
  // }
  imageLoaded(ev: Event) {
    this.loadError = false;
    let image = ev.target as HTMLImageElement;
    this.imageElement = image;
    image.crossOrigin = 'anonymous';

    if (this.cropper) {
      this.cropper.destroy();
    }
    // debugger;
    image.addEventListener('ready', () => {
      this.ready.emit(true);
      this.isLoading = false;
      if (this.cropbox) {
        this.cropper.setCropBoxData(this.cropbox);
      }
    });
    this.cropper = new Cropper(image, this.cropperOption());
    this.origin.emit(this.cropper);
  }

  read(files) {
    return new Promise((resolve, reject) => {
      if (!files || files.length === 0) {
        resolve();
        return;
      }
      const file = files[0];
      if (/^image\/\w+$/.test(file.type)) {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onabort = reject;
        reader.onload = (e) => {
          console.log(e);
          this.imageUrl = reader.result;
          // this.isLoading = true;
          this.loadError = false;
        };
        reader.readAsDataURL(file);
      } else {
        reject('Please choose an image file.');
      }
    });
  }
  loadImageFile(event) {
    this.loadError = false;
    this.read(event.target.files).then(() => {
      event.target.value = '';
    }).catch((e) => {
      event.target.value = '';
      this.alert(e);
    });
  }
  dragover(e) {
    e.preventDefault();
  }
  drop(e) {
    e.preventDefault();
    this.read(e.dataTransfer.files).catch(this.alert);
  }
  alert(e) {
    window.alert(e && e.message ? e.message : e);
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
      // canvas.toBlob(blob => resolve({ blob }));
    });

    promise.then(res => {
      this.export.emit(Object.assign(data, res));
    });
  }

  private cropperOption(): Cropper.CropperOptions {
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
