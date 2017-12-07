import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { FileItem } from './file-upload/file-item.class';
import { FileUploader, ParsedResponseHeaders } from './file-upload/file-uploader.class';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

    public uploader: FileUploader; // = new FileUploader({url: URL});
    public results: any[];

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.uploader = new FileUploader({
            url: this.url,
            itemAlias: this.name,
            autoUpload: this.auto,
        });

        // this.uploader.

        this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            // console.log(JSON.parse(response));
        };

        this.uploader.onCompleteAll = () => {
            this.refreshResult();
        };

        if (!this.multiple) {
            this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
                let ofs = this.uploader.queue.filter(it => it != fileItem);
                ofs.forEach(it => {
                    this.uploader.removeFromQueue(it);
                });
            };
        }
    }

    hasFiles() {
        return this.uploader && this.uploader.queue.length > 0;
    }

    hasNotUploadFiles() {
        return this.uploader && this.uploader.getNotUploadedItems().length > 0;
    }

    isImage(file: File): boolean {
        return /^image\//.test(file.type);
    }

    getSafeUrl(file: File): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    }

    removeFromQueue(item: FileItem) {
        this.uploader.removeFromQueue(item);
        this.refreshResult();
    }

    clearQueue() {
        this.uploader.clearQueue();
        this.refreshResult();
    }

    refreshResult() {
        this.results = this.uploader.queue.filter(item => item.isSuccess)
            .map(item => {
                if (item._xhr && item._xhr.response) {
                    try {
                        return JSON.parse(item._xhr.response);
                    } catch (e) {
                        return null;
                    }
                } else {
                    return null;
                }
            }).filter(item => item !== null);

        this.uploadComplete.emit(this.multiple ? this.results : (this.results && this.results.length > 0 ? this.results[0] : undefined));
    }
}
