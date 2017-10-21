import { OverlayRef } from '../core/overlay/overlay-ref';
import { LayerContainer } from './layer-container';

export class CuiLayerRef<T> {
    compenentInstance: T;
    disableClose = false;

    private result: any;

    constructor(
        private overlayRef: OverlayRef,
        private LayerContainer: LayerContainer
    ) {

    }

    close(layerReult?: any): void {
        this.result = layerReult;
        // this.compenentInstance.
        this.overlayRef.dispose();
    }
}
