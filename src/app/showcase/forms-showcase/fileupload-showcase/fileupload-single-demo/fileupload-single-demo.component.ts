import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-fileupload-single-demo',
  templateUrl: './fileupload-single-demo.component.html',
  styleUrls: ['./fileupload-single-demo.component.scss']
})
export class FileuploadSingleDemoComponent implements OnInit {

  result;

  constructor() { }

  ngOnInit() {
  }

  onFileUpload(result) {
    this.result = result;
  }
}
