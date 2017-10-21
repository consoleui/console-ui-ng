import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[cui-layer-title], [cuiLayerTitle]',
    host: {'class': 'cui-layer-title'}
})
export class CuiLayerTitle {}

@Directive({
    selector: '[cui-layer-content], [cuiLayerContent]',
    host: {'class': 'cui-layer-content'}
})
export class CuiLayerContent {}

@Directive({
    selector: '[cui-layer-actions], [cuiLayerActions]',
    host: {'class': 'cui-layer-actions'}
})
export class CuiLayerActions {}

@Directive({
    selector: '[cuiLayerClose]'
})
export class CuiLayerClose {

}
