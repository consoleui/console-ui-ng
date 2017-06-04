import { NgModule } from '@angular/core';

import { ButtonModule } from './button/button.module';

const CONSOLE_UI_MODULES = [
    ButtonModule
];

@NgModule({
    imports: [...CONSOLE_UI_MODULES],
    exports: [...CONSOLE_UI_MODULES]
})
export class ConsoleUIModule { }
