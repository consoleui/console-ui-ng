import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-fileupload-simple-demo',
  templateUrl: './fileupload-simple-demo.component.html',
  styleUrls: ['./fileupload-simple-demo.component.scss']
})
export class FileuploadSimpleDemoComponent implements OnInit {

  result;

  constructor() { }

  ngOnInit() {
  }

  onFileUpload(result) {
    this.result = result;
  }
}
