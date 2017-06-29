import { ViewportRuler } from './viewport-ruler';
import { Injectable } from '@angular/core';
import { GlobalPostionStrategy } from './global-position-strategy';

@Injectable()
export class OverlayPositionBuilder {
    // constructor(private _viewportRuler: ViewportRuler) { }

    global(): GlobalPostionStrategy {
        return new GlobalPostionStrategy();
    }

    connectedTo() {}
}
