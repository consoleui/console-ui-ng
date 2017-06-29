import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cui-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.scss']
})
export class TreeSelectComponent implements OnInit {

  defaultOptions;
  open = false;

  @Input() name: string;
  @Input() selected: any;
  @Input() data: any[];
  @Input() options: {item?: {value?: string, text?: string}, treeOptions: any};

  @Output() change = new EventEmitter();

  constructor() {
    this.defaultOptions = {
      item: {
        value: 'id',
        text: 'name'
      },
      treeOptions: {}
    };
  }

  ngOnInit() {
    this.options = Object.assign({}, this.defaultOptions, this.options);
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

  select(item) {
    this.selected = item;
  }
}
