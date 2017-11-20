import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-fileupload-showcase',
  templateUrl: './fileupload-showcase.component.html',
  styleUrls: ['./fileupload-showcase.component.scss']
})
export class FileuploadShowcaseComponent implements OnInit {

  codes = {};

  introDoc = require('!!raw-loader!./fileupload-intro.adoc');
  apiDoc = require('!!raw-loader!./fileupload-api.adoc');

  constructor() {
    this.initCodes();
  }

  ngOnInit() {
  }

  initCodes() {
    let demos = ['custom', 'multiple', 'simple', 'single'];
    demos.forEach(demo => {
      let key = demo;
      demo = `fileupload-${demo}-demo`;
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
