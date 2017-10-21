import { Component, OnInit, Input, ViewChildren, QueryList, AfterViewInit, ContentChildren, AfterContentInit } from '@angular/core';
import { MenuSubComponent } from './menu-sub/menu-sub.component';
import { MenuItemComponent } from './menu-item/menu-item.component';

export type MenuDirection = 'horizontal' | 'vertical';
// If MenuDirection is 'horizontal', MenuMode only 'tiered' and 'mega' are available.
export type MenuMode = 'tiered' | 'mega' | 'inline' | 'slide' | 'plain';
export type MenuTheme = 'light' | 'dark';

@Component({
  selector: 'cui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit, AfterContentInit {

  @Input() theme: MenuTheme = 'light';
  @Input() direction: MenuDirection = 'horizontal';
  @Input() mode: MenuMode = 'tiered';

  @ContentChildren(MenuItemComponent) subMenus: QueryList<MenuItemComponent>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log(this.subMenus);
  }

  ngAfterContentInit() {
    // console.log(this.subMenus);
  }
}
