import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cui-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent implements OnInit {
  subClose = false;

  @Input() item;
  @Output() itemClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  hasChildren() {
    return this.item && this.item.children && this.item.children.length > 0;
  }

  onClick(item) {
    if (this.item === item && this.hasChildren()) {
      this.toggleSub();
    }
    this.itemClick.emit(item);
  }

  toggleSub() {
    this.subClose = !this.subClose;
  }

  closeSub() {
    this.subClose = true;
  }

  openSub() {
    this.subClose = false;
  }
}
