import { NgModule } from '@angular/core';

import { CuiButtonComponent } from './button.component';
import { CuiButtonDirective } from './button.directive';

@NgModule({
    imports: [],
    exports: [
        CuiButtonComponent,
        CuiButtonDirective
    ],
    declarations: [
        CuiButtonComponent,
        CuiButtonDirective
    ],
})
export class ButtonModule { }
