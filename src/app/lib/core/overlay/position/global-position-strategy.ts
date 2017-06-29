import { PositionStrategy } from './position-strategy';
import { element } from 'protractor';

export class GlobalPostionStrategy implements PositionStrategy {

    private _wrapper: HTMLElement;


    apply(element: HTMLElement): Promise<void> {
        if (!this._wrapper) {
            this._wrapper = document.createElement('div');
            this._wrapper.classList.add('cui-global-overlay-wrapper');
            element.parentNode.insertBefore(this._wrapper, element);
            this._wrapper.appendChild(element);
        }

        let style = element.style;
        let parentStyle = (element.parentNode as HTMLElement).style;

        // style.position = ;

        return Promise.resolve(null);
    }

    dispose(): void {
        if (this._wrapper && this._wrapper.parentNode) {
            this._wrapper.parentNode.removeChild(this._wrapper);
            this._wrapper = null;
        }
    }

    top(value: string): this {
        return this;
    }

    left(value: string): this {
        return this;
    }

    bottom(value: string): this {
        return this;
    }

    right(value: string): this {
        return this;
    }

    width(value: string): this {
        return this;
    }

    height(value: string): this {
        return this;
    }

    centerHorizontally(offset = ''): this {
        return this;
    }

    centerVertically(offset = ''): this {
        return this;
    }
}
