import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cui-ckeditor-simple-demo',
  templateUrl: './ckeditor-simple-demo.component.html',
  styleUrls: ['./ckeditor-simple-demo.component.scss']
})
export class CkeditorSimpleDemoComponent implements OnInit {
  content = '请输入内容';

  constructor(public readonly sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
