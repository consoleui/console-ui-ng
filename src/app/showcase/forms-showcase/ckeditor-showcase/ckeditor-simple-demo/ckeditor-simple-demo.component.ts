import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-ckeditor-simple-demo',
  templateUrl: './ckeditor-simple-demo.component.html',
  styleUrls: ['./ckeditor-simple-demo.component.scss']
})
export class CkeditorSimpleDemoComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }

}
