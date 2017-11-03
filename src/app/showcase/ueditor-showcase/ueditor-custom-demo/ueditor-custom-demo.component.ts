import { UeditorComponent } from 'consoleui';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'cui-ueditor-custom-demo',
  templateUrl: './ueditor-custom-demo.component.html',
  styleUrls: ['./ueditor-custom-demo.component.scss']
})
export class UeditorCustomDemoComponent implements OnInit {

  @ViewChild(UeditorComponent) ueditor: UeditorComponent;
  constructor() { }

  ngOnInit() {
  }

}
