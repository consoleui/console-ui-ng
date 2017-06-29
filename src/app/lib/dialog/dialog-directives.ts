import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[cui-dialog-title], [cuiDialogTitle]',
    host: {'class': 'cui-dialog-title'}
})
export class CuiDialogTitle {}

@Directive({
    selector: '[cui-dialog-content], [cuiDialogContent]',
    host: {'class': 'cui-dialog-content'}
})
export class CuiDialogContent {}

@Directive({
    selector: '[cui-dialog-actions], [cuiDialogActions]',
    host: {'class': 'cui-dialog-actions'}
})
export class CuiDialogActions {}

