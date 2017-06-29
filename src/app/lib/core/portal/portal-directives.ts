import {
    NgModule,
    ComponentRef,
    Directive,
    TemplateRef,
    ComponentFactoryResolver,
    ViewContainerRef,
    OnDestroy,
    Input,
} from '@angular/core';
import {Portal, TemplatePortal, ComponentPortal, BasePortalHost} from './portal';


@Directive({
  selector: '[cui-portal], [cuiPortal], [portal]',
  exportAs: 'cuiPortal',
})
export class TemplatePortalDirective extends TemplatePortal {
  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}

@Directive({
  selector: '[cuiPortalHost], [portalHost]',
  // inputs: ['portal: cuiPortalHost']
})
export class PortalHostDirective extends BasePortalHost implements OnDestroy {
  /** The attached portal. */
  private _portal: Portal<any>;

  constructor(
      private _componentFactoryResolver: ComponentFactoryResolver,
      private _viewContainerRef: ViewContainerRef) {
    super();
  }

  /** @deprecated */
  @Input('portalHost')
  get _deprecatedPortal() { return this.portal; }
  set _deprecatedPortal(v) { this.portal = v; }

  /** Portal associated with the Portal host. */
  @Input('cuiPortalHost')
  get portal(): Portal<any> {
    return this._portal;
  }

  set portal(portal: Portal<any>) {
    if (this.hasAttached()) {
      super.detach();
    }

    if (portal) {
      super.attach(portal);
    }

    this._portal = portal;
  }

  ngOnDestroy() {
    super.dispose();
    this._portal = null;
  }

  /**
   * Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver.
   *
   * @param portal Portal to be attached to the portal host.
   */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    portal.setAttachedHost(this);

    // If the portal specifies an origin, use that as the logical location of the component
    // in the application tree. Otherwise use the location of this PortalHost.
    let viewContainerRef = portal.viewContainerRef != null ?
        portal.viewContainerRef :
        this._viewContainerRef;

    let componentFactory =
        this._componentFactoryResolver.resolveComponentFactory(portal.component);
    let ref = viewContainerRef.createComponent(
        componentFactory, viewContainerRef.length,
        portal.injector || viewContainerRef.parentInjector);

    super.setDisposeFn(() => ref.destroy());
    this._portal = portal;

    return ref;
  }

  /**
   * Attach the given TemplatePortal to this PortlHost as an embedded View.
   * @param portal Portal to be attached.
   */
  attachTemplatePortal(portal: TemplatePortal): Map<string, any> {
    portal.setAttachedHost(this);

    this._viewContainerRef.createEmbeddedView(portal.templateRef);
    super.setDisposeFn(() => this._viewContainerRef.clear());

    this._portal = portal;

    // TODO(jelbourn): return locals from view
    return new Map<string, any>();
  }
}

@NgModule({
  exports: [TemplatePortalDirective, PortalHostDirective],
  declarations: [TemplatePortalDirective, PortalHostDirective],
})
export class PortalModule {}
