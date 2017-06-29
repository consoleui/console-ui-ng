import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogContainer } from './dialog-container';
import { CuiDialog } from './dialog';
import { OverlayModule } from '../core/overlay/overlay-directives';
import { PortalModule } from '../core/portal/portal-directives';
import { ConfirmComponent } from './confirm/confirm.component';
import { CuiDialogTitle, CuiDialogContent, CuiDialogActions } from './dialog-directives';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
  ],
  declarations: [DialogContainer, CuiDialogTitle, CuiDialogContent, CuiDialogActions, ConfirmComponent],
  exports: [DialogContainer, CuiDialogTitle, CuiDialogContent, CuiDialogActions, ConfirmComponent],
  providers: [
    CuiDialog
  ],
  entryComponents: [DialogContainer, ConfirmComponent]
})
export class DialogModule { }
