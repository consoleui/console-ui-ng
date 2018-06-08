import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-ckeditor-full-demo',
  templateUrl: './ckeditor-full-demo.component.html',
  styleUrls: ['./ckeditor-full-demo.component.scss']
})
export class CkeditorFullDemoComponent implements OnInit {
  content = '请输入内容';
  constructor() { }

  ngOnInit() {
  }

}
