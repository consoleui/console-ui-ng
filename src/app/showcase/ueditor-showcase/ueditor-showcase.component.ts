import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-ueditor-showcase',
  templateUrl: './ueditor-showcase.component.html',
  styleUrls: ['./ueditor-showcase.component.scss']
})
export class UeditorShowcaseComponent implements OnInit {

  codes = {};

  introDoc = require('!!raw-loader!./ueditor-intro.adoc');
  apiDoc = require('!!raw-loader!./ueditor-api.adoc');
  constructor() {
    this.initCodes();
  }

  ngOnInit() {
  }

  initCodes() {
    let demos = ['um', 'default', 'custom'];
    // demos = demos.map(it => `data-table-${it}-demo`);
    demos.forEach(demo => {
      let key = demo;
      demo = `ueditor-${demo}-demo`;
      this.codes[key] = [
        {
          file: `${demo}.component.ts`, language: 'typescript',
          code: require(`!!raw-loader!./${demo}/${demo}.component.ts`)
        },
        {
          file: `${demo}.component.html`, language: 'html',
          code: require(`!!raw-loader!./${demo}/${demo}.component.html`)
        },
        {
          file: `${demo}.component.scss`, language: 'css',
          code: require(`!!raw-loader!./${demo}/${demo}.component.scss`)
        }
      ];
    });
  }

}
