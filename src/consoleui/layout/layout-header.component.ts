import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'cui-layout-header',
    template: `
        <ng-content></ng-content>
    `
})

export class LayoutHeaderComponent {
    @HostBinding('class.cui-layout-nz-header') _cuiLayoutHeader = true;
}
