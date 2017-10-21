import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayerContainer } from './layer-container';
import { CuiLayer } from './layer';
import { OverlayModule } from '../core/overlay/overlay-directives';
import { PortalModule } from '../core/portal/portal-directives';
import { ConfirmComponent } from './confirm/confirm.component';
import { CuiLayerTitle, CuiLayerContent, CuiLayerActions, CuiLayerClose } from './layer-directives';
import { AlertComponent } from './alert/alert.component';
import { MsgComponent } from './msg/msg.component';
import { LayerComponent } from './layer/layer.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
  ],
  declarations: [LayerContainer, CuiLayerTitle, CuiLayerContent, CuiLayerActions, CuiLayerClose,
    ConfirmComponent, AlertComponent, MsgComponent, LayerComponent],
  exports: [LayerContainer, CuiLayerTitle, CuiLayerContent, CuiLayerActions, CuiLayerClose,
    ConfirmComponent, AlertComponent, MsgComponent, LayerComponent],
  providers: [
    CuiLayer
  ],
  entryComponents: [LayerContainer, ConfirmComponent, AlertComponent, MsgComponent]
})
export class CuiLayerModule { }
