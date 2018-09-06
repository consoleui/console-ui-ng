import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-ckeditor-showcase',
  templateUrl: './ckeditor-showcase.component.html',
  styleUrls: ['./ckeditor-showcase.component.scss']
})
export class CkeditorShowcaseComponent implements OnInit {

  codes = {};

  introDoc = require('!!raw-loader!./ckeditor-intro.adoc');
  apiDoc = require('!!raw-loader!./ckeditor-api.adoc');
  constructor() {
    this.initCodes();
  }

  ngOnInit() {
  }

  initCodes() {
    let demos = ['full', 'simple', 'custom'];
    // demos = demos.map(it => `data-table-${it}-demo`);
    demos.forEach(demo => {
      let key = demo;
      demo = `ckeditor-${demo}-demo`;
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
