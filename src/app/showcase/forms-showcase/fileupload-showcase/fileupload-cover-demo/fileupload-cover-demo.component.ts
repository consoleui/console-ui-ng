import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-fileupload-cover-demo',
  templateUrl: './fileupload-cover-demo.component.html',
  styleUrls: ['./fileupload-cover-demo.component.scss']
})
export class FileuploadCoverDemoComponent implements OnInit {

  result;

  constructor() { }

  ngOnInit() {
  }

  onFileUpload(result) {
    this.result = result;
  }
}
