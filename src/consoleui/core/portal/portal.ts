import {
    ComponentRef,
    ViewContainerRef,
    ElementRef,
    Injector,
} from '@angular/core';
import { ComponentType } from './component-type';
import { TemplateRef } from '@angular/core';

export abstract class Portal<T> {
    private _attachedHost: PortalHost;

    constructor() {
    }

    attach(host: PortalHost): T {
        if (host == null) {
            throw Error('PortalHost cannot be null');
        }

        if (host.hasAttached()) {
            throw Error('PortalHost has been attached');
        }

        this._attachedHost = host;
        return <T> host.attach(this);
    }

    detach(): void {
        let host = this._attachedHost;
        if (host == null) {
            throw Error('There is no portal has been attached');
        }

        this._attachedHost = null;
        return host.detach();
    }

    get isAttached(): boolean {
        return this._attachedHost != null;
    }

    setAttachedHost (host: PortalHost) {
        this._attachedHost = host;
    }
}

export class ComponentPortal<T> extends Portal<ComponentRef<T>> {
    component: ComponentType<T>;
    viewContainerRef: ViewContainerRef;
    injector: Injector;

    constructor(
            component: ComponentType<T>,
            viewContainerRef: ViewContainerRef = null,
            injector: Injector = null) {
        super();
        this.component = component;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
    }
}

export class TemplatePortal extends Portal<Map<string, any>> {
    templateRef: TemplateRef<any>;
    viewContainerRef: ViewContainerRef;
    locals: Map<string, any> = new Map<string, any>();

    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
        super();
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
    }

    get origin(): ElementRef {
        return this.templateRef.elementRef;
    }

    attach(host: PortalHost, locals?: Map<string, any>): Map<string, any> {
        this.locals = locals == null ? new Map<string, any>() : locals;
        return super.attach(host);
    }

    detach(): void {
        this.locals = new Map<string, any>();
        return super.detach();
    }
}

export interface PortalHost {
    attach(portal: Portal<any>): any;

    detach(): any;

    dispose(): void;

    hasAttached(): boolean;
}

export abstract class BasePortalHost implements PortalHost {
    private _attachedPortal: Portal<any>;
    private _disposeFn: () => void;
    private _isDisposed: Boolean = false;

    hasAttached(): boolean {
        return !!this._attachedPortal;
    }

    attach(portal: Portal<any>): any {
        if (!portal) {
            throw Error('Portal cannot be null');
        }

        if (this.hasAttached()) {
            throw Error('Portal already attached');
        }

        if (this._isDisposed) {
            throw Error('Portal Host already disposed');
        }

        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        } else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }

        throw Error('unkown Portal type:' + typeof portal);
    }

    abstract attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;

    abstract attachTemplatePortal(portal: TemplatePortal): Map<string, any>;

    detach(): void {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
            this._attachedPortal = null;
        }

        this._invokeDisposeFn();
    }

    dispose() {
        if (this.hasAttached()) {
            this.detach();
        }

        this._invokeDisposeFn();
        this._isDisposed = true;
    }

    setDisposeFn(fn: () => void) {
        this._disposeFn = fn;
    }

    private _invokeDisposeFn() {
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = null;
        }
    }
}
