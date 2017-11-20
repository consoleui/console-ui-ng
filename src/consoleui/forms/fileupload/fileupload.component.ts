import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'cui-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {
  @Input() name: string;
  @Input() url: string;
  @Input() method: string = 'POST';
  @Input() withCredentials: boolean = true;
  @Input() multiple: boolean;
  @Input() auto: boolean;
  // @Input() type: 'doc' | 'video' | 'image' | 'file';
  @Input() accept: string; // 'image/*'
  @Input() mode: 'advanced' | 'doc' | 'video' | 'image' | 'zip' | 'file' = 'advanced';

  @Input() imageHolder: string;

  @Output() uploadComplete = new EventEmitter();

  public files: File[] = [];
  public progress: number = 0;
  public speed: number = 0;

  msgs;
  img;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  fileSelected(event) {
    let msgs = [];
    if (!this.multiple) {
      this.files = [];
    }

    console.log('fileupload selected event:', event);

    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    for (let file of files) {
      // validate file
      console.log('selected file:', file);
      /*this.readBlobAsDataURL(file, (url) => {
        this.img = url;
      });*/
      if (this.isImage(file)) {
        file.objectURL = this.getSafeUrl(file);
      }

      // file.icon = this.getIcon(file);

      this.files.push(file);
    }

    if (this.hasFiles() && this.auto) {
      this.upload();
    }
  }

  hasFiles(): boolean {
    return this.files && this.files.length > 0;
  }

  upload() {
    this.uploadFile();
  }

  private uploadFile() {
    let msgs = [];
    let xhr = new XMLHttpRequest();
    let formData = new FormData();

    for (let file of this.files) {
      formData.append(this.name, file, file.name);
    }

    let ol = 0;
    let ot = new Date().getTime();
    xhr.upload.addEventListener('progress', (e: ProgressEvent) => {
      if (e.lengthComputable) {
        this.progress = Math.round(e.loaded * 100 / e.total);

        let perLoaded = e.loaded - ol;
        ol = e.loaded;

        let nt = new Date().getTime();
        let perTime = (nt - ot) / 1000;
        ot = nt;

        this.speed = perLoaded / perTime;
      }
    }, false);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        // this.progress = 0;

        if (xhr.status >= 200 && xhr.status < 300) {
          // upload ok
          try {
            let result = JSON.parse(xhr.response);
            console.log('file upload result', result);
            this.msgs = JSON.stringify(result);
            this.uploadComplete.emit(result);
          } catch (e) {

          }
          // console.log('Upload success');
        } else {
          // upload error
          console.error('Upload error');
        }

        // clear
      }
    };

    xhr.open(this.method, this.url, true);
    xhr.withCredentials = this.withCredentials;

    xhr.send(formData);
  }

  /* readBlobAsDataURL(blob, callback) {
    let a = new FileReader();
    a.onload = function(e: Event) {callback((e.target as FileReader).result); };
    a.readAsDataURL(blob);
  } */

  isImage(file: File): boolean {
    return /^image\//.test(file.type);
  }

  getSafeUrl(file: File): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
  }

  getIcon(file: File) {
    // TODO 改成正则匹配表
    const iconMap = {
      // 'file-o': [],
      'zip-o': ['zip', 'rar', 'tar'],
      'excel-o': ['xls', 'xlsx'],
      'image-o': ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
      'pdf-o': ['pdf'],
      'word-o': ['doc', 'docx'],
      'text-o': ['txt', 'md', 'adoc'],
      'audio-o': ['mp3'],
      'vedio-o': ['mp4', 'rm'],
      'code-o': ['html', 'java', 'js'],
    };
    let defaultIcon = 'o';

    let iconMapFlat = {};
    for (let key of Object.keys(iconMap)) {
      iconMap[key].forEach(type => {
        iconMapFlat[type] = key;
      });
    }

    let ext = this.getExpandedName(file).toLowerCase();
    let icon = iconMapFlat[ext] || defaultIcon;
    return icon;
  }

  getExpandedName(file: File | string): string {
    let fileName = '';
    if (file instanceof File) {
      fileName = file.name;
    } else {
      fileName = file;
    }

    if (fileName.includes('\\') || fileName.includes('/')) {
      fileName = fileName.substring(fileName.lastIndexOf('\\') + 1).substring(fileName.lastIndexOf('/') + 1);
    }

    if (fileName && fileName.indexOf('.') > 0) {
      return fileName.substring(fileName.lastIndexOf('.') + 1);
    }
    return null;
  }
}
