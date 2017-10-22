import { Input, Component, OnInit, ViewEncapsulation, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'cui-code-box',
  templateUrl: './code-box.component.html',
  styleUrls: ['./code-box.component.scss']
})
export class CodeBoxComponent implements OnInit {

  _code: { code: string, language: string } | { file: string, code: string, language: string }[];
  _copied: boolean = false;
  _isFile: boolean;

  @Input() title: string;
  @Input() expanded: boolean = false;

  @Input() set code(value: string | { code: string, language: string } | { file: string, code: string, language: string }[]) {
    if ('string' === typeof value) {
      this._code = { code: value, language: 'javascript' };
      this._isFile = false;
    } else if (Array.isArray(value)) {
      this._code = value;
      this._isFile = true;
    } else {
      this._code = value;
      this._isFile = false;
    }
  }

  get code() {
    return this._code;
  }

  constructor( @Inject(DOCUMENT) private dom: Document, private _el: ElementRef) { }

  ngOnInit() {
  }

  copyCode(code) {
    this.copy(code).then(() => {
      this._copied = true;
      setTimeout(() => {
        this._copied = false;
      }, 1000);
    });
  }

  copy(value: string): Promise<string> {

    const promise = new Promise<string>(
      (resolve, reject): void => {
        let copyTextArea = null as HTMLTextAreaElement;
        try {
          copyTextArea = this.dom.createElement('textarea');
          copyTextArea.style.height = '0px';
          copyTextArea.style.opacity = '0';
          copyTextArea.style.width = '0px';
          this.dom.body.appendChild(copyTextArea);
          copyTextArea.value = value;
          copyTextArea.select();
          this.dom.execCommand('copy');
          resolve(value);
        } finally {
          if (copyTextArea && copyTextArea.parentNode) {
            copyTextArea.parentNode.removeChild(copyTextArea);
          }
        }
      }
    );

    return (promise);

  }

}
