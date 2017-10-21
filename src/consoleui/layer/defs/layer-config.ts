import { CuiLayerRef } from '../layer-ref';
import { OverlayConfig } from '../../core/overlay/overlay-config';

export interface LayerConfig extends OverlayConfig {
    title?: string;
    content?: string | any;
    shade?: boolean;
    shadeClose?: boolean;
}

export class CuiLayerComponent {
    layerRef: CuiLayerRef<any>;

    close() {
        if (this.layerRef) {
            this.layerRef.close();
        }
    };
}
