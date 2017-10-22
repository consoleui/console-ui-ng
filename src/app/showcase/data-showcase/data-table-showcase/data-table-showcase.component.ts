import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-data-table-showcase',
  templateUrl: './data-table-showcase.component.html',
  styleUrls: ['./data-table-showcase.component.scss']
})
export class DataTableShowcaseComponent implements OnInit {

  codes = {};

  introDoc = require('!!raw-loader!./data-table-intro.adoc');
  apiDoc = require('!!raw-loader!./data-table-api.adoc');

  constructor() {
    this.initCodes();
  }

  ngOnInit() {
  }

  initCodes() {
    let demos = ['expanded', 'filter', 'pagination', 'selection', 'selection-props', 'simple', 'sort', 'synthesize'];
    // demos = demos.map(it => `data-table-${it}-demo`);
    demos.forEach(demo => {
      let key = demo;
      demo = `data-table-${demo}-demo`;
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
