import { Injectable, ComponentFactoryResolver, ApplicationRef, ComponentRef, Injector, TemplateRef } from '@angular/core';
import { DialogContainer } from './dialog-container';
import { ComponentPortal, TemplatePortal } from '../core/portal/portal';
import { DomPortalHost } from '../core/portal/dom-portal-host';
import { Overlay } from '../core/overlay/overlay';
import { OverlayRef } from '../core/overlay/overlay-ref';
import { DialogConfig } from './defs/dialog-config';
import { ComponentType } from '../core/portal/component-type';
import { CuiDialogRef } from './dialog-ref';
import { ConfirmComponent } from './confirm/confirm.component';

@Injectable()
export class CuiDialog {
    defaultConfig: DialogConfig;

    constructor(
        private overlay: Overlay,
        private injector: Injector
    ) {
        // 初始化
        this.defaultConfig = {
            title: '',
            content: '',
            shadeClose: true
        };
    }

    open<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
            config?: DialogConfig): CuiDialogRef<T> {
        // console.log('dialog loading');
        // 加载配置
        config = this.applyConfigDefaults(config);

        // 创建遮罩层
        let overlayRef = this.createOverlay(config);
        // 加载dialog容器
        let dialogContainer = this.attachDialogContainer(overlayRef);
        // 加载dialog内容
        let dialogRef = this.attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);

        return dialogRef;
    }

    confirm<T>(content: string, ok?: () => void, cancel?: () => void): CuiDialogRef<ConfirmComponent> {
        // console.log('confirm:' + content);
        let dialogRef = this.open(ConfirmComponent, {shadeClose: false});
        let confirmInstance = dialogRef.compenentInstance;

        confirmInstance.confirmText = content;

        confirmInstance.onOk().subscribe(() => {
            if (ok) { ok(); }
            dialogRef.close();
        });

        confirmInstance.onCancel().subscribe(() => {
            if (cancel) { cancel(); }
            dialogRef.close();
        });

        return dialogRef;
    }

    private applyConfigDefaults(config: DialogConfig): DialogConfig {
        return Object.assign(this.defaultConfig, config);
    }

    private createOverlay(config: DialogConfig): OverlayRef {
        // config
        return this.overlay.create();
    }

    private attachDialogContainer(overlay: OverlayRef): DialogContainer {
        let viewContainer = null;
        let containerPortal = new ComponentPortal(DialogContainer, viewContainer);

        let containerRef: ComponentRef<DialogContainer> = overlay.attach(containerPortal);

        return containerRef.instance;
    }

    private attachDialogContent<T> (
            componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
            dialogContainer: DialogContainer,
            overlayRef: OverlayRef,
            config: DialogConfig): CuiDialogRef<T> {

        let dialogRef = new CuiDialogRef<T>(overlayRef, dialogContainer);

        if (config.shadeClose) {
            overlayRef.backdropClick().subscribe(() => {
                if (!dialogRef.disableClose) {
                    dialogRef.close();
                }
            });
        }

        // TODO: injector for data

        if (componentOrTemplateRef instanceof TemplateRef) {
            dialogContainer.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, null));
        } else { // 没有办法判断是否是 Angular 的 Component， 只能先确定其他类型
            let contentRef = dialogContainer.attachComponentPortal(
                new ComponentPortal(componentOrTemplateRef, null, this.injector));
            dialogRef.compenentInstance = contentRef.instance;
        }

        // updateSize and updatePosition

        return dialogRef;
    }
}
