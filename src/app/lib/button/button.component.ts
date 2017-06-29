import { Component, OnInit, Input,
ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'button[cui-button], a[cui-button]',
    templateUrl: './button.component.html'
})

export class CuiButtonComponent implements OnInit {
    private _color: string = 'primary';

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2
    ) { }

    ngOnInit() { }

    @Input()
    get color(): string { return this._color; }
    set color(value: string) { this._updateColor(value); }

    private _updateColor(newColor: string) {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    }

    private _setElementColor(color: string, isAdd: boolean) {
        if (color != null && color !== '') {
        if (isAdd) {
            this._renderer.addClass(this._getHostElement(), `btn-${color}`);
        } else {
            this._renderer.removeClass(this._getHostElement(), `btn-${color}`);
        }
        }
    }

    private _getHostElement() {
        return this._elementRef.nativeElement;
    }
}
