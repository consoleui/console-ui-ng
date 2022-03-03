import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cui-ckeditor-custom-demo',
  templateUrl: './ckeditor-custom-demo.component.html',
  styleUrls: ['./ckeditor-custom-demo.component.scss']
})
export class CkeditorCustomDemoComponent implements OnInit {
  content = '请输入内容';
  config = {
    toolbar_full: [
      ['Source', '-', 'Save', 'NewPage', 'Preview', '-', 'Templates'],
      ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Print', 'SpellChecker', 'Scayt'],
      ['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat'],
      ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
      '/',
      ['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'],
      ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'],
      ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
      ['Link', 'Unlink', 'Anchor'],
      ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'],
      '/',
      ['Styles', 'Format', 'Font', 'FontSize'],
      ['TextColor', 'BGColor']
    ],
    toolbar_basic: [
      ['NewPage', 'Preview', '-', 'Undo', 'Redo'],
      ['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'],
      ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'],
      ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
      ['TextColor', 'BGColor']
    ],
    toolbar: 'basic',
    // toolbarCanCollapse: true
  };
  constructor(public readonly sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
