
import { NgModule, ModuleWithProviders } from '@angular/core';

import { CuiDataTableModule } from './data/data-table/data-table.module';

@NgModule({
    exports: [
        CuiDataTableModule
    ],
})
export class ConsoleuiModule {

    static forRoot(options?: any): ModuleWithProviders {
        return {
            ngModule: ConsoleuiModule,
            providers: [

            ]
        };
    }
}
