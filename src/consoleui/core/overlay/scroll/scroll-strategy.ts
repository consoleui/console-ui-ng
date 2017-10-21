import { OverlayRef } from '../overlay-ref';

export interface ScrollStrategy {
    enable: () => void;
    disable: () => void;
    attach: (overlayRef: OverlayRef) => void;
}
