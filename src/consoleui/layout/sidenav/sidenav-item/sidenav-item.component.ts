import { Component, OnInit, Input, Output, EventEmitter, ViewChild, QueryList } from '@angular/core';
import { MenuSubComponent } from '../../../navigation/menu/menu-sub/menu-sub.component';

@Component({
  selector: 'cui-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent implements OnInit {

  @Input() item;
  @Output() itemClick = new EventEmitter();

  @Output() expanded: EventEmitter<any> = new EventEmitter();

  @ViewChild(MenuSubComponent) submenu: MenuSubComponent;


  constructor() { }

  ngOnInit() {
  }

  hasChildren() {
    return this.item && this.item.children && this.item.children.length > 0;
  }

  close() {
    if (this.submenu) {
      this.submenu.close();
    }
  }

  open() {
    if (this.submenu) {
      this.submenu.open();
    }
  }

  onExpanded() {
    this.expanded.emit();
  }
}
