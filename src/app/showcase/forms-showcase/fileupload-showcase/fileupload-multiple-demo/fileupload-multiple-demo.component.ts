import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-fileupload-multiple-demo',
  templateUrl: './fileupload-multiple-demo.component.html',
  styleUrls: ['./fileupload-multiple-demo.component.scss']
})
export class FileuploadMultipleDemoComponent implements OnInit {

  result;

  constructor() { }

  ngOnInit() {
  }

  onFileUpload(result) {
    this.result = result;
  }
}
