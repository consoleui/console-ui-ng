import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UeditorComponent } from './ueditor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UeditorComponent],
  exports: [UeditorComponent]
})
export class CuiUeditorModule { }
