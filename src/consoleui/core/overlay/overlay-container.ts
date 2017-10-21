import { Injectable, Provider, Optional, SkipSelf } from '@angular/core';

@Injectable()
export class OverlayContainer {
    protected _containerElement: HTMLElement;

    getContainerElement(): HTMLElement {
        if (!this._containerElement) {
            this.createContainer();
        }
        return this._containerElement;
    }

    protected createContainer(): void {
        let container = document.createElement('div');
        container.classList.add('cui-overlay-container');

        document.body.appendChild(container);
        this._containerElement = container;
    }

}

export function OVERLAY_CONTAINER_PROVIDER_FACTORY(parentContainer: OverlayContainer) {
  return parentContainer || new OverlayContainer();
}

export const OVERLAY_CONTAINER_PROVIDER: Provider = {
    provide: OverlayContainer,
    deps: [[new Optional(), new SkipSelf(), OverlayContainer]],
    useFactory: OVERLAY_CONTAINER_PROVIDER_FACTORY
};
