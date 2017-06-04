import { Directive } from '@angular/core';

@Directive({ 
    selector: 'button[cui-button], a[cui-button]',
    host: {'class': 'btn cui-button'}
})
export class CuiButtonDirective {
    constructor() { }
}