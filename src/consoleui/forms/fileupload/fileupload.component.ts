import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { FileItem } from './file-upload/file-item.class';
import { FileUploader, ParsedResponseHeaders } from './file-upload/file-uploader.class';
import {
    Component, OnInit, Input, Output, EventEmitter, OnChanges,
    SimpleChanges, ViewChild, ViewChildren, ElementRef, QueryList
} from '@angular/core';
import { FileLikeObject } from './file-upload/file-like-object.class';
import { FileType } from './file-upload/file-type.class';
import { FileSize } from './file-upload/file-size.class';
import { FileSelectDirective } from './file-upload/file-select.directive';

export type FileuploadMode = 'advanced' | 'doc' | 'video' | 'image' | 'zip' | 'file';
export interface ErrorMessage {
    code: string;
    message: string;
}

@Component({
    selector: 'cui-fileupload',
    templateUrl: './fileupload.component.html',
    styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit, OnChanges {
    @Input() name: string;
    @Input() url: string;
    @Input() method: string = 'POST';
    @Input() withCredentials: boolean = true;
    @Input() multiple: boolean;
    @Input() auto: boolean;
    // @Input() type: 'doc' | 'video' | 'image' | 'file';
    @Input() accept: string; // 'image/*'
    // @Input()
    _mode: FileuploadMode = 'advanced';
    @Input() maxFileSize: number = 1024 * 1024;
    @Input() imageHolder: string;
    @Input() showErr: boolean = true;

    @Output() uploadComplete = new EventEmitter();
    @Output() error = new EventEmitter();

    @ViewChildren(FileSelectDirective) fileSelectors: QueryList<FileSelectDirective>;

    public uploader: FileUploader; // = new FileUploader({url: URL});
    public results: any[];

    _addingErrors;
    errs;

    _modeMapAccepts = {
        'doc': ".doc, .docx, .ppt, .pptx, .xls, .xlsx, .pdf, .txt",
        'video': "video/\*",
        'image': "image/\*",
        'zip': ".zip",
    };

    @Input()
    set mode(value: FileuploadMode) {
        this._mode = value;

        if (!this.accept && value) {
            this.accept = this._modeMapAccepts[value];
        }
    }
    get mode() {
        return this._mode || 'advanced';
    }

    get allowedFileType() {
        if (!this.accept) {
            return undefined;
        }
        return this.accept.split(/,|，/).map(it => FileType.getMimeClassByType(it));
    }

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.uploader = new FileUploader({
            url: this.url,
            itemAlias: this.name,
            autoUpload: this.auto,
            // allowedFileType: this.allowedFileType,
            accept: this.accept,
            maxFileSize: this.maxFileSize
        });

        // this.uploader.

        this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            // console.log(JSON.parse(response));
        };

        this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any => {
            console.log({ item, response, status, headers })
            return { item, response, status, headers };
        };

        this.uploader.onCompleteAll = () => {
            this.refreshResult();
        };

        this.uploader.onWhenAddingFileFailed = (item: FileLikeObject, filter: any, options: any): any => {
            let err: ErrorMessage;
            switch (filter.name) {
                case 'fileType': {
                    err = { code: filter.name, message: `文件'${item.name}'格式不支持, 允许的格式 ${this.accept}` };
                    break;
                }
                case 'accept': {
                    err = { code: filter.name, message: `文件'${item.name}'格式不支持, 允许的格式 ${this.accept}` };
                    break;
                }
                case 'fileSize': {
                    err = { code: filter.name, message: `文件'${item.name}'大小超出限制, 最大支持 ${FileSize.prettySize(options.maxFileSize, 0)}` };
                    break;
                }
            }
            if (err) {
                this._addingErrors = this._addingErrors ? [...this._addingErrors, err] : [err];
            }
            return { item, filter, options };
        };

        // this.uploader.onAfterAddingAll = (fileItems: any): any => {
        //     if (this._addingErrors) {
        //         this.errs = this._addingErrors;
        //         this.error.emit(this.errs);
        //         this._addingErrors = [];
        //     }
        //     return { fileItems };
        // };

        if (!this.multiple) {
            this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
                let ofs = this.uploader.queue.filter(it => it != fileItem);
                ofs.forEach(it => {
                    this.uploader.removeFromQueue(it);
                });
            };
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['accept'] && this.uploader) {
            // this.uploader.options.allowedFileType = this.allowedFileType;
            this.uploader.options.accept = this.accept;
        }
        if (changes['maxFileSize'] && this.uploader) {
            this.uploader.options.maxFileSize = this.maxFileSize;
        }
    }

    onSelected(files) {
        if (this._addingErrors) {
            this.errs = this._addingErrors;
            this.error.emit(this.errs);
            this._addingErrors = [];
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

    clearQueue(clearFile?) {
        if (clearFile && this.fileSelectors) {
            this.fileSelectors.forEach((it: FileSelectDirective) => {
                it.clear();
            });
        }
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
