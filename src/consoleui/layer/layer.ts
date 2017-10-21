import { Injectable, ComponentFactoryResolver, ApplicationRef, ComponentRef, Injector, TemplateRef } from '@angular/core';
import { LayerContainer } from './layer-container';
import { ComponentPortal, TemplatePortal } from '../core/portal/portal';
import { DomPortalHost } from '../core/portal/dom-portal-host';
import { Overlay } from '../core/overlay/overlay';
import { OverlayRef } from '../core/overlay/overlay-ref';
import { LayerConfig, CuiLayerComponent } from './defs/layer-config';
import { ComponentType } from '../core/portal/component-type';
import { CuiLayerRef } from './layer-ref';
import { ConfirmComponent } from './confirm/confirm.component';
import { AlertComponent } from './alert/alert.component';
import { MsgComponent } from './msg/msg.component';

@Injectable()
export class CuiLayer {
    defaultConfig: LayerConfig;

    constructor(
        private overlay: Overlay,
        private injector: Injector
    ) {
        // 初始化
        this.defaultConfig = {
            title: '',
            content: '',
            shade: true,
            shadeClose: true
        };
    }

    open<T>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: LayerConfig): CuiLayerRef<T> {
        // console.log('layer loading');
        // 加载配置
        config = this.applyConfigDefaults(config);

        // 创建遮罩层
        let overlayRef = this.createOverlay(config);
        // 加载layer容器
        let layerContainer = this.attachLayerContainer(overlayRef);
        // 加载layer内容
        let layerRef = this.attachLayerContent(componentOrTemplateRef, layerContainer, overlayRef, config);

        return layerRef;
    }

    alert<T>(content: string, ok?: () => void): CuiLayerRef<AlertComponent> {
        // console.log('confirm:' + content);
        let layerRef = this.open(AlertComponent, { shadeClose: false });
        let alertInstance = layerRef.compenentInstance;

        alertInstance.alertText = content;

        alertInstance.onOk().subscribe(() => {
            if (ok) { ok(); }
            layerRef.close();
        });

        return layerRef;
    }

    confirm<T>(content: string, ok?: () => void, cancel?: () => void): CuiLayerRef<ConfirmComponent> {
        // console.log('confirm:' + content);
        let layerRef = this.open(ConfirmComponent, { shadeClose: false });
        let confirmInstance = layerRef.compenentInstance;

        confirmInstance.confirmText = content;

        confirmInstance.onOk().subscribe(() => {
            if (ok) { ok(); }
            layerRef.close();
        });

        confirmInstance.onCancel().subscribe(() => {
            if (cancel) { cancel(); }
            layerRef.close();
        });

        return layerRef;
    }

    msg<T>(msg: string, time: number = 3000): CuiLayerRef<MsgComponent> {
        // console.log('confirm:' + content);
        let layerRef = this.open(MsgComponent, { shade: false });
        let msgInstance = layerRef.compenentInstance;

        msgInstance.msg = msg;

        if (time > 0) {
            setTimeout(() => {
                layerRef.close();
            }, time);
        }

        return layerRef;
    }


    private applyConfigDefaults(config: LayerConfig): LayerConfig {
        return Object.assign(this.defaultConfig, config);
    }

    private createOverlay(config: LayerConfig): OverlayRef {
        // config
        return this.overlay.create(config);
    }

    private attachLayerContainer(overlay: OverlayRef): LayerContainer {
        let viewContainer = null;
        let containerPortal = new ComponentPortal(LayerContainer, viewContainer);

        let containerRef: ComponentRef<LayerContainer> = overlay.attach(containerPortal);

        return containerRef.instance;
    }

    private attachLayerContent<T>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        layerContainer: LayerContainer,
        overlayRef: OverlayRef,
        config: LayerConfig): CuiLayerRef<T> {

        let layerRef = new CuiLayerRef<T>(overlayRef, layerContainer);

        if (config.shadeClose) {
            overlayRef.backdropClick().subscribe(() => {
                if (!layerRef.disableClose) {
                    layerRef.close();
                }
            });
        }

        // TODO: injector for data

        if (componentOrTemplateRef instanceof TemplateRef) {
            layerContainer.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, null));
        } else { // 没有办法判断是否是 Angular 的 Component， 只能先确定其他类型
            let contentRef = layerContainer.attachComponentPortal(
                new ComponentPortal(componentOrTemplateRef, null, this.injector));
            layerRef.compenentInstance = contentRef.instance;

            if (layerRef.compenentInstance instanceof CuiLayerComponent) {
                layerRef.compenentInstance.layerRef = layerRef;
            }
        }

        // updateSize and updatePosition

        return layerRef;
    }
}
