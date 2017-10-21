import { ComponentFactoryResolver, ComponentRef, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { BasePortalHost, ComponentPortal, TemplatePortal } from './portal';

export class DomPortalHost extends BasePortalHost {

    constructor(
            private _hostDomElement: Element,
            private _componentFactoryResolver: ComponentFactoryResolver,
            private _appRef: ApplicationRef,
            private _defaultInjector: Injector) {
        super();
    }

    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        let componentRef: ComponentRef<T>;

        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(
                componentFactory,
                portal.viewContainerRef.length,
                portal.injector || portal.viewContainerRef.parentInjector
            );

            this.setDisposeFn(() => componentRef.destroy());
        } else {
            componentRef = componentFactory.create(portal.injector || this._defaultInjector);
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(() => {
                this._appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        }

        this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));

        return componentRef;
    }

    attachTemplatePortal(portal: TemplatePortal): Map<string, any> {
        let viewContainer = portal.viewContainerRef;
        let viewRef = viewContainer.createEmbeddedView(portal.templateRef);
        viewRef.detectChanges();

        viewRef.rootNodes.forEach(rootNode => this._hostDomElement.appendChild(rootNode));

        this.setDisposeFn((() => {
            let index = viewContainer.indexOf(viewRef);
            if (index !== -1) {
                viewContainer.remove(index);
            }
        }));

        // TODO(jelbourn): Return locals from view.
        return new Map<string, any>();
    }

    /**
     * Clears out a portal from the DOM.
     */
    dispose(): void {
        super.dispose();
        if (this._hostDomElement.parentNode != null) {
            this._hostDomElement.parentNode.removeChild(this._hostDomElement);
        }
    }

    /** Gets the root HTMLElement for an instantiated component. */
    private _getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }
}
