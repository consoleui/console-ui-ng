import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'cui-layout-footer',
    encapsulation: ViewEncapsulation.None,
    template: `
    <ng-content></ng-content>
  `
})

export class LayoutFooterComponent {
    @HostBinding('class.cui-layout-footer') _cuiLayoutFooter = true;
}
