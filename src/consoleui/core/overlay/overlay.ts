import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, NgZone, Provider } from '@angular/core';
import { OverlayContainer, OVERLAY_CONTAINER_PROVIDER } from './overlay-container';
import { OverlayRef } from './overlay-ref';
import { DomPortalHost } from '../portal/dom-portal-host';
import { OverlayPositionBuilder } from './position/overlay-position-builder';
import { OverlayConfig } from './overlay-config';

let nextUniqueId = 0;

@Injectable()
export class Overlay {

    constructor(
        private overlayContainer: OverlayContainer,
        private postionBuilder: OverlayPositionBuilder,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
        private ngZone: NgZone
    ) {}

    create(overlayConfig: OverlayConfig): OverlayRef {
        return this.createOverlayRef(this.createPaneElement(), overlayConfig);
    }

    position(): OverlayPositionBuilder {
        return this.postionBuilder;
    }

    private createPaneElement(): HTMLElement {
        let pane = document.createElement('div');

        pane.id = `cui-overlay-${nextUniqueId++}`;
        pane.classList.add('cui-overlay-pane');
        this.overlayContainer.getContainerElement().appendChild(pane);

        return pane;
    }

    private createPortalHost(pane: HTMLElement): DomPortalHost {
        return new DomPortalHost(pane, this.componentFactoryResolver, this.appRef, this.injector);
    }

    private createOverlayRef(pane: HTMLElement, overlayConfig: OverlayConfig): OverlayRef {
        let portalHost = this.createPortalHost(pane);
        return new OverlayRef(portalHost, pane, this.ngZone, overlayConfig);
    }
}

export const OVERLAY_PROVIDERS: Provider[] = [
    Overlay,
    OverlayPositionBuilder,
    OVERLAY_CONTAINER_PROVIDER
];
