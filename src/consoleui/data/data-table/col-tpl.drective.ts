import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[cuiColTpl]'
})
export class ColTplDirective {
  @Input('cuiColTpl') public cuiColTpl: string;

  constructor(public templateRef: TemplateRef<any>) {

  }

}
