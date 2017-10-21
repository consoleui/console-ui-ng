import { Component, OnInit, Output, EventEmitter, Input, ViewChildren, QueryList } from '@angular/core';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { SidebarNavComponent } from '../sidebar-nav/sidebar-nav.component';

@Component({
  selector: 'cui-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  private _isFold = false;

  @Input() navItems;
  @Input() color = 'light'; // 'light' / 'inverse'
  @Output() itemClick = new EventEmitter();

  @ViewChildren(SidenavItemComponent) submenus: QueryList<SidenavItemComponent>;

  constructor() { }

  ngOnInit() {
  }

  get isFold() {
    return this._isFold;
  }

  toggleFold() {
    this._isFold = !this._isFold;
  }

  fold() {
    this._isFold = true;
  }

  unfold() {
    this._isFold = false;
  }

  onItemClick(item) {
    this.itemClick.emit(item);
  }

  onExpanded(submenu) {
    if (this.submenus) {
      this.submenus.filter(it => it != submenu).forEach(it => it.close());
    }
  }
}
