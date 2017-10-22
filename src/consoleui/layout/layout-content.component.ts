import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'cui-layout-content',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `
})

export class LayoutContentComponent {
  @HostBinding('class.cui-layout-content') _cuiLayoutContent = true;
}
