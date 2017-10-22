import { LayoutComponent } from './layout.component';
import { Component, OnInit, Input, HostBinding, Output, EventEmitter, HostListener, Optional, Host } from '@angular/core';

@Component({
    selector: 'cui-layout-sider',
    template: `
        <ng-content></ng-content>
        <div class="cui-layout-sider-zero-width-trigger" *ngIf="_isZeroTrigger" (click)="toggleCollapse()">
        </div>
        <div class="cui-layout-sider-trigger" *ngIf="_isSiderTrigger" (click)="toggleCollapse()">

        </div>
    `
})

export class LayoutSiderComponent {

    @Input() width = 200;
    @Input() trigger = true;
    @Input() collapsedWidth = 64;
    @Input() @HostBinding('class.cui-layout-sider-collapsed') collapsed = false;

    _collapsable = false;
    @Input() set collapsable(value: boolean | string) {
        if (value === '') {
            this._collapsable = true;
        } else {
            this._collapsable = value as boolean;
        }
    }

    get collapsable() {
        return this._collapsable;
    }

    @Output() collapsedChange = new EventEmitter();
    @HostBinding('class.cui-layout-sider') _cuiLayoutSider = true;

    @HostBinding('class.cui-layout-sider-zero-width')
    get setZeroClass() {
        return this.collapsed && (this.collapsedWidth === 0);
    }

    @HostBinding('style.flex')
    get setFlex() {
        if (this.collapsed) {
            return `0 0 ${this.collapsedWidth}px`;
        } else {
            return `0 0 ${this.width}px`;
        }
    }

    @HostBinding('style.width.px')
    get setWidth() {
        if (this.collapsed) {
            return this.collapsedWidth;
        } else {
            return this.width;
        }
    }

    // @HostListener('window:resize', [ '$event' ])

    get _isZeroTrigger(): boolean {
        return this.collapsable && this.trigger && (this.collapsedWidth === 0);
    }

    get _isSiderTrigger(): boolean {
        return this.collapsable && this.trigger && (this.collapsedWidth !== 0);
    }

    constructor( @Optional() @Host() private layoutComponent: LayoutComponent) {
        if (layoutComponent) {
            layoutComponent.hasSider = true;
        }
    }

    toggleCollapse() {
        this.collapsed = !this.collapsed;
        this.collapsedChange.emit(this.collapsed);
    }
}
