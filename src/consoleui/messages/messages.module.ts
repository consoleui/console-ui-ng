import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { GrowlComponent } from './growl/growl.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AlertComponent, GrowlComponent],
  exports: [AlertComponent, GrowlComponent]
})
export class CuiMessagesModule { }
