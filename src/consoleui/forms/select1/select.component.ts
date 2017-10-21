import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'cui-select-d',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  defaultConfig;
  open = false;

  @Input() name: string;
  @Input() selected: any;
  @Input() options: any[];
  @Input() config: {option?: {value?: string, text?: string}};

  @Output() change = new EventEmitter();

  constructor() {
    this.defaultConfig = {
      option: {
        value: 'id',
        text: 'name'
      }
    };
  }

  ngOnInit() {
    this.config = Object.assign({}, this.defaultConfig, this.config);
  }

  // @HostListener('document:mousedown', ['$event'])
  // overlayMouseDown(event: MouseEvent) {
    // console.log(event);
    // his.close();
  // }

  // @HostListener('focus', ['$event'])
  // onFocus(e) {
  //   console.log(e);
  // }

  select(option: any) {
    this.selected = option;
    this.change.emit(option);
    this.close();
  }

  toggle() {
    this.open = !this.open;
  }

  close() {
    this.open = false;
  }

  show() {
    this.open = true;
  }
}
