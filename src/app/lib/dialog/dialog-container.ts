import { Component, ComponentRef, ViewChild, HostBinding } from '@angular/core';
import { TemplatePortal, ComponentPortal, PortalHost, BasePortalHost } from '../core/portal/portal';
import { PortalHostDirective } from '../core/portal/portal-directives';

@Component({
  selector: 'cui-dialog-container',
  template: `<ng-template cuiPortalHost></ng-template>`,
})
export class DialogContainerComponent extends BasePortalHost {
    @HostBinding('class') hostClass = 'cui-dialog-container';

  @ViewChild(PortalHostDirective) portalHost: PortalHostDirective;

  constructor() {
    super()
  }

  attachTemplatePortal(portal: TemplatePortal): Map<string, any> {
    if (this.portalHost.hasAttached()) {
      throw Error('Cui Dialog content aalready attached');
    }

    // this._savePreviouslyFocusedElement();
    return this.portalHost.attachTemplatePortal(portal);
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalHost.hasAttached()) {
      throw Error('Cui Dialog content aalready attached');
    }

    // this._savePreviouslyFocusedElement();
    return this.portalHost.attachComponentPortal(portal);
  }
}

export { DialogContainerComponent as DialogContainer };
