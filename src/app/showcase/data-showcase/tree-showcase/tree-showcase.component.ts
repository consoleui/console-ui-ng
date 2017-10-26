import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-tree-showcase',
  templateUrl: './tree-showcase.component.html',
  styleUrls: ['./tree-showcase.component.scss']
})
export class TreeShowcaseComponent implements OnInit {

  codes = {};

  introDoc = require('!!raw-loader!./tree-intro.adoc');
  apiDoc = require('!!raw-loader!./tree-api.adoc');

  constructor() {
    this.initCodes();
  }

  ngOnInit() {
  }

  initCodes() {
    let demos = ['checkbox-select', 'dynamic-node', 'intercept-select', 'multiple-select', 'single-select'];
    demos.forEach(demo => {
      let key = demo;
      demo = `tree-${demo}-demo`;
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
