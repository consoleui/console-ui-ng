import {NgZone} from '@angular/core';
import { PortalHost, Portal } from '../portal/portal';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { GlobalPostionStrategy } from './position/global-position-strategy';
import { PositionStrategy } from './position/position-strategy';

export class OverlayRef implements PortalHost {
    private backdropElement: HTMLElement = null;
    private _backdropClick: Subject<any> = new Subject();
    private attachments = new Subject<void>();
    private detachments = new Subject<void>();

    private positionStrategy: PositionStrategy;

    constructor(
        private portalHost: PortalHost,
        private pane: HTMLElement,
        private ngZone: NgZone
    ) {}

    get overlayElement(): HTMLElement {
        return this.pane;
    }

    attach(portal: Portal<any>): any {
        let attachResult = this.portalHost.attach(portal);

        this.updatePostion();

        this.attachBackdrop();

        this.attachments.next();

        return attachResult;
    }

    detach(): Promise<any> {
        this.detachBackdrop();

        let detachmentResult = this.portalHost.detach();

        this.detachments.next();

        return detachmentResult;
    }

    dispose(): void {
        if (this.positionStrategy) {
            this.positionStrategy.dispose();
        }

        this.detachBackdrop();
        this.portalHost.dispose();
        this.attachments.complete();
        this._backdropClick.complete();
        this.detachments.next();
        this.detachments.complete();
    }

    hasAttached(): boolean {
        return this.portalHost.hasAttached();
    }

    backdropClick(): Observable<void> {
        return this._backdropClick.asObservable();
    }

    updatePostion() {
        // TODO: move to config
        if (!this.positionStrategy) {
            this.positionStrategy = new GlobalPostionStrategy()
        }
        this.positionStrategy.apply(this.pane);
    }

    private attachBackdrop() {
        this.backdropElement = document.createElement('div');
        this.backdropElement.classList.add('cui-overlay-backdrop');
        this.pane.parentElement.insertBefore(this.backdropElement, this.pane);

        this.backdropElement.addEventListener('click', () => {
            this._backdropClick.next(null);
        });
    }

    private detachBackdrop() {
        let backdropToDetach = this.backdropElement;

        if (backdropToDetach) {
            let finishDetach = () => {
                if (backdropToDetach && backdropToDetach.parentNode) {
                    backdropToDetach.parentNode.removeChild(backdropToDetach);
                }

                if (this.backdropElement == backdropToDetach) {
                    this.backdropElement = null;
                }
            };

            // backdropToDetach.classList.remove('cui-overlay-backdrop');
            // backdropToDetach.addEventListener('transitionend', finishDetach);
            finishDetach();
        }
    }
}
