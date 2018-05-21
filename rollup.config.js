import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import angular from 'rollup-plugin-angular';
import sass from 'node-sass';
import CleanCSS from 'clean-css';
import { minify as minifyHtml } from 'html-minifier';

const format = process.env.ROLLUP_FORMAT || 'es'

const cssmin = new CleanCSS();
const htmlminOpts = {
    caseSensitive: true,
    collapseWhitespace: true,
    removeComments: true,
};

let globals = {
  '@angular/animations': 'ng.animations',
  '@angular/cdk': 'ng.cdk',
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/compiler': 'ng.compiler',
  '@angular/forms': 'ng.forms',
  '@angular/http': 'ng.http',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
  '@angular/router': 'ng.router',
  'moment': 'moment',
  'moment/locale/zh-cn': null,
  'rxjs/BehaviorSubject': 'Rx',
  'rxjs/Observable': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/Subscription': 'Rx',
  'rxjs/observable/fromPromise': 'Rx.Observable',
  'rxjs/observable/forkJoin': 'Rx.Observable',
  'rxjs/observable/fromEvent': 'Rx.Observable',
  'rxjs/observable/merge': 'Rx.Observable',
  'rxjs/observable/of': 'Rx.Observable',
  'rxjs/operator/auditTime': 'Rx.Observable.prototype',
  'rxjs/operator/catch': 'Rx.Observable.prototype',
  'rxjs/operator/concatAll': 'Rx.Observable.prototype',
  'rxjs/operator/debounceTime': 'Rx.Observable.prototype',
  'rxjs/operator/distinctUntilChanged': 'Rx.Observable.prototype',
  'rxjs/operator/do': 'Rx.Observable.prototype',
  'rxjs/operator/every': 'Rx.Observable.prototype',
  'rxjs/operator/filter': 'Rx.Observable.prototype',
  'rxjs/operator/finally': 'Rx.Observable.prototype',
  'rxjs/operator/first': 'Rx.Observable.prototype',
  'rxjs/operator/last': 'Rx.Observable.prototype',
  'rxjs/operator/map': 'Rx.Observable.prototype',
  'rxjs/operator/pluck': 'Rx.Observable.prototype',
  'rxjs/operator/startWith': 'Rx.Observable.prototype',
  'rxjs/operator/switchMap': 'Rx.Observable.prototype',
  'rxjs/operator/takeUntil': 'Rx.Observable.prototype',
  'rxjs/operator/throttleTime': 'Rx.Observable.prototype',
  'rxjs/operator/mergeAll': 'Rx.Observable.prototype',
  'rxjs/operator/mergeMap': 'Rx.Observable.prototype',
  'rxjs/operator/concatMap': 'Rx.Observable.prototype',
  'rxjs/operator/reduce': 'Rx.Observable.prototype',
  'rxjs/observable/from': 'Rx.Observable',
  'rxjs/util/EmptyError': 'Rx.Util',
  'rxjs/add/operator/map': 'Rx.Observable.prototype',
  'rxjs/add/operator/catch': 'Rx.Observable.prototype',
  'rxjs/add/observable/of': 'Rx.Observable.prototype',
  'rxjs/add/operator/do': 'Rx.Observable.prototype',
  'rxjs/add/operator/delay': 'Rx.Observable.prototype',
  'object-path': 'ObjectPath',
  'lodash': 'lodash',
  'cropperjs': 'Cropper'
}

if (format === 'es') {
  globals = Object.assign(globals, {
    'tslib': 'tslib',
  })
}

let input
let file

switch (format) {
  case 'es':
    input = './publish/src/index.js'
    file = './publish/esm15/index.js'
    break
  case 'umd':
    input = './publish/esm5/index.js'
    file = './publish/bundles/consoleui.umd.js'
    break
  default:
    throw new Error(`format ${format} is not supported`)
}

export default {
  input,
  output: {
    file,
    format,
  },
  exports: 'named',
  name: 'consoleui',
  external: Object.keys(globals),
  globals,
  plugins: [
      replace({ "import * as moment": "import moment" }),
      resolve(),
      angular({
        // additional replace `templateUrl` and `stylesUrls` in every `.js` file
        // default: true
        replace: false, 
        preprocessors: {
          template: template => minifyHtml(template, htmlminOpts),
          style: scss => {
            if(scss) {
              const css = sass.renderSync({ data: scss }).css;
              return cssmin.minify(css).styles;
            } else  {
              return '';
            }
          },
        }
      })
    ],
}
