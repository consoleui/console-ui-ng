import { NgModule, ModuleWithProviders } from '@angular/core';

const CONSOLE_UI_MODULES = [];

@NgModule({
    imports: [],
    exports: [...CONSOLE_UI_MODULES],
    declarations: [],
    providers: [],
})
export class ConsoleUIModule { }

// @NgModule({
//   imports: CONSOLE_UI_MODULES,
//   exports: CONSOLE_UI_MODULES,
// })
// export class ConsoleUIModule {
//   /** @deprecated */
//   static forRoot(): ModuleWithProviders {
//     return {ngModule: ConsoleUIRootModule};
//   }
// }

export default ConsoleUIModule;