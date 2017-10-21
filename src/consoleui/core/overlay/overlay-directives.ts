import { Overlay, OVERLAY_PROVIDERS } from './overlay';
import { NgModule } from '@angular/core';
import { PortalModule } from '../portal/portal-directives';

@NgModule({
    imports: [PortalModule],
    exports: [],
    declarations: [],
    providers: [OVERLAY_PROVIDERS]
})
export class OverlayModule {}
