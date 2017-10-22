import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';

import * as HighLight from 'highlight.js';

@Component({
  selector: 'cui-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit, AfterViewInit {
  _code;

  @ViewChild('code') codeElement: ElementRef;
  @Input() language: string;

  @Input() set code(value) {
    this._code = value;
  }

  get code() {
    return this._code || '';
  }

  constructor() { }

  ngAfterViewInit() {
    (<any>HighLight).highlightBlock(this.codeElement.nativeElement);
  }

  ngOnInit() {
  }

}
