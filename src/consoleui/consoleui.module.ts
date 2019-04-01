import { CropperModule } from './cropper/cropper.module';
import { CuiMessagesModule } from './messages/messages.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuiCoreModule } from './core/core.module';
import { PaginationModule } from './data/pagination/pagination.module';
import { DataTableModule } from './data/data-table/data-table.module';
import { LayoutModule } from './layout/layout.module';
import { SidenavModule } from './layout/sidenav/sidenav.module';
import { FileuploadModule } from './forms/fileupload/fileupload.module';
import { SidebarNavModule } from './layout/sidebar-nav/sidebar-nav.module';
import { CuiFormsModule } from './forms/forms.module';
import { CuiLayerModule } from './layer/layer.module';
import { CuiNavigationModule } from './navigation/navigation.module';
import { CuiUeditorModule } from './forms/ueditor/ueditor.module';
import { CuiTreeModule } from './data/tree/tree.module';
import { CuiRootConfig, CUI_ROOT_CONFIG } from './consoleui-config';

const CUI_MODULES = [
  CuiCoreModule,
  LayoutModule,
  PaginationModule,
  DataTableModule,
  SidenavModule,
  FileuploadModule,
  SidebarNavModule,
  CuiFormsModule,
  CuiLayerModule,
  CuiNavigationModule,
  CuiUeditorModule,
  CuiTreeModule,
  CuiMessagesModule,
  CropperModule
];

@NgModule({
  imports: [
    CommonModule,
    ...CUI_MODULES
  ],
  exports: [
    ...CUI_MODULES
  ],
})
export class ConsoleuiModule {

    static forRoot(options?: CuiRootConfig): ModuleWithProviders {
        return {
            ngModule: ConsoleuiModule,
            providers: [
              { provide: CUI_ROOT_CONFIG, useValue: options },
            ]
        };
    }
}

export * from './core/core.module';
export * from './layer';
export * from './data';
export * from './navigation';
// export * from './forms/dynamic-form';
export * from './forms/validators';
export * from './messages';
export * from './forms/ueditor';
export * from './forms/fileupload';

