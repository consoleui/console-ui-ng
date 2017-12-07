import { FileSelectDirective } from './file-upload/file-select.directive';
import { FileDropDirective } from './file-upload/file-drop.directive';
import { CuiCoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploadComponent } from './fileupload.component';

@NgModule({
  imports: [
    CommonModule,
    CuiCoreModule
  ],
  declarations: [FileuploadComponent, FileDropDirective, FileSelectDirective],
  exports: [FileuploadComponent, FileDropDirective, FileSelectDirective]
})
export class FileuploadModule { }
