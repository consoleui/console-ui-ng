import { Input, Component, OnInit, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';

// import * as asciidoctor from 'asciidoctor.js';
import * as HighLight from 'highlight.js';

/* if (!window['Asciidoctor']) {
  window['Asciidoctor'] = asciidoctor;
}*/

@Component({
  selector: 'cui-asciidoc',
  templateUrl: './asciidoc.component.html',
  styleUrls: ['./asciidoc.component.scss']
})
export class AsciidocComponent implements OnInit, AfterViewInit {

  _parsedHTML = '';
  _el: HTMLElement;

  @Input() set content(value) {
    this._parsedHTML = this.parseContent(value);
  }

  constructor(private _elementRef: ElementRef) {
    this._el = this._elementRef.nativeElement;
  }

  ngAfterViewInit() {
    const pres = this._el.querySelectorAll('pre');
    for (let m = 0; m < pres.length; m++) {
      const codes = pres[m].querySelectorAll('code');
      for (let n = 0; n < codes.length; n++) {
        (<any>HighLight).highlightBlock(codes[n]);
      }
    }
  }

  ngOnInit() {
  }

  parseContent(source) {
    let asciidoctorOptions: any = {};
    asciidoctorOptions.safe = 'secure';     // unsafe, safe, server or secure
    asciidoctorOptions.doctype = 'article'; // book,inline,article
    asciidoctorOptions.attributes = ['showtitle'];
    asciidoctorOptions.header_footer = false;

    let asciidoctor = window['Asciidoctor']();
    let result = asciidoctor.convert(source, asciidoctorOptions);
    return result;
  }
}
