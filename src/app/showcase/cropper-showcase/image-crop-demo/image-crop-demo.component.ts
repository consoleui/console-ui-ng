import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cui-image-crop-demo',
  templateUrl: './image-crop-demo.component.html',
  styleUrls: ['./image-crop-demo.component.scss']
})
export class ImageCropDemoComponent implements OnInit {

  URL = window.URL;
  download = document.getElementById('download');
  actions = document.getElementById('actions');
  dataX: number;
  dataY: number;
  dataHeight: number;
  dataWidth: number;
  dataRotate: string;
  dataScaleX: string;
  dataScaleY: string;
  options: any = {
    aspectRatio: 321 / 180,
    preview: '.img-preview',
    ready: (e) => {
      console.log(e.type);
    },
    cropstart: (e) => {
      console.log(e.type, e.detail.action);
    },
    cropmove: (e) => {
      console.log(e.type, e.detail.action);
    },
    cropend: (e) => {
      console.log(e.type, e.detail.action);
    },
    crop: (e) => {
      let data = e.detail;

      console.log(e.type);
      console.log("data", data);
      this.dataX = Math.round(data.x);
      this.dataY = Math.round(data.y);
      this.dataHeight = Math.round(data.height);
      this.dataWidth = Math.round(data.width);
      this.dataRotate = typeof data.rotate !== 'undefined' ? data.rotate : '';
      this.dataScaleX = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
      this.dataScaleY = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
    },
    zoom: function (e) {
      console.log(e.type, e.detail.ratio);
    }
  };
 
  constructor() { }

  ngOnInit() {
  }

}
