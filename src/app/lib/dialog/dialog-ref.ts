import { OverlayRef } from '../core/overlay/overlay-ref';
import { DialogContainer } from './dialog-container';

export class CuiDialogRef<T> {
    compenentInstance: T;
    disableClose = false;

    private result: any;

    constructor(
        private overlayRef: OverlayRef,
        private dialogContainer: DialogContainer
    ) {

    }

    close(dialogReult?: any): void {
        this.result = dialogReult;
        // this.compenentInstance.
        this.overlayRef.dispose();
    }
}
