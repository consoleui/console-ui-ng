import { Directive, Input, TemplateRef, EmbeddedViewRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[cuiTemplateWrapper]'
})
export class CuiTemplateWrapperDirective implements OnInit, OnDestroy {

  @Input() item: any;

  @Input() index: number;

  // @Input('pTemplateWrapper') templateRef: TemplateRef<any>;
  @Input() cuiTemplateWrapper: TemplateRef<any>;

  view: EmbeddedViewRef<any>;

  constructor(public viewContainer: ViewContainerRef) { }

  ngOnInit() {
    this.view = this.viewContainer.createEmbeddedView(this.cuiTemplateWrapper, {
      '\$implicit': this.item,
      'index': this.index
    });
  }

  ngOnDestroy() {
    this.view.destroy();
  }

}
