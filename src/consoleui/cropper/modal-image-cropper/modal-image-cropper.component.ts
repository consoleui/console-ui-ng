import { Component, Input, Output } from '@angular/core';
import * as Cropper from 'cropperjs';
import { NzModalService } from 'ng-zorro-antd';
@Component({
    selector: 'cui-modal-cropper',
    templateUrl: './modal-image-cropper.component.html',
    styleUrls: ['./modal-image-cropper.component.scss']
})
export class ModalImageCropperComponent {

    private cropper: Cropper;
    imageUrl: any = "";
    @Input() options: any;
    @Input() title: string = '图片裁剪';
    @Input() cropText: string = '裁剪';
    @Input() maskClosable: boolean = false;
    // 上传接口地址
    @Input() uploadUrl;
    // 回传结果中表示期望获取数据的属性名
    @Input() property;
    @Input() modalWidth: number = 740;
    @Input() modalHeight: number = 480;
    // 裁剪后的结果，可以是base64格式的图片数据或者是服务器返回文件路径
    @Output() result: any;
    currentModal;

    constructor(private modalService: NzModalService) { }

    showModalForTemplate(contentTpl, footerTpl) {
        this.currentModal = this.modalService.open({
            title: this.title,
            content: contentTpl,
            footer: footerTpl,
            width: this.modalWidth,
            wrapClassName: 'vertical-center-modal',
            onOk() {
            },
            onCancel() {
                console.log('Click cancel');
            },
            maskClosable: false
        });
        console.log(this.currentModal);
    }

    crop(event) {
        if (this.uploadUrl && this.property) {
            this.cropper.getCroppedCanvas().toBlob(function (blob) {
                let formData = new FormData();
                formData.append('croppedImage', blob);
                // TODO上传服务器代码
              });
        } else {
            let url = this.cropper.getCroppedCanvas({
                maxWidth: 2048,
                maxHeight: 1152,
                fillColor: '#fff',
                imageSmoothingEnabled: false,
                imageSmoothingQuality: 'high',
            }).toDataURL();
            this.result = url;
        }
        setTimeout(() => {
            /* destroy方法可以传入onOk或者onCancel。默认是onCancel */
            this.currentModal.destroy();
            this.currentModal = null;
            this.imageUrl = "";
        }, 500);
    }
    handleOk = (e) => {
        setTimeout(() => {
            /* destroy方法可以传入onOk或者onCancel。默认是onCancel */
            this.currentModal.destroy();
            this.currentModal = null;
            this.imageUrl = "";
        }, 500);
    }
    handleCancel = (e) => {
        setTimeout(() => {
            /* destroy方法可以传入onOk或者onCancel。默认是onCancel */
            this.currentModal.destroy();
            this.currentModal = null;
            this.imageUrl = "";
        }, 500);
    }

    getCropper(event) {
        this.cropper = event;
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
                    // debugger;
                    console.log(e);
                    this.imageUrl = reader.result;
                };
                reader.readAsDataURL(file);
            } else {
                reject('Please choose an image file.');
            }
        });
    }
    selectImage(event) {
        this.read(event.target.files).then(() => {
            event.target.value = '';
        }).catch((e) => {
            event.target.value = '';
        });
    }
}
