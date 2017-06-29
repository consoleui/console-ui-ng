import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[pmsColTpl]'
})
export class ColTplDirective {
  @Input('pmsColTpl') public pmsColTpl: string;

  constructor(public templateRef: TemplateRef<any>) {

  }

}
