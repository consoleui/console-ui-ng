import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cui-ckeditor-full-demo',
  templateUrl: './ckeditor-full-demo.component.html',
  styleUrls: ['./ckeditor-full-demo.component.scss']
})
export class CkeditorFullDemoComponent implements OnInit {
  content = '请输入内容';
  constructor(public readonly sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
