import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'cui-menu-sub, cui-sub-menu, cui-submenu',
  templateUrl: './menu-sub.component.html',
  styleUrls: ['./menu-sub.component.scss'],
  providers: [{ provide: MenuItemComponent, useExisting: forwardRef(() => MenuSubComponent) }]
})
export class MenuSubComponent extends MenuItemComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;

  @Output() expanded: EventEmitter<any> = new EventEmitter();

  isOpen: boolean = false;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  open() {
    this.expanded.emit();
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.expanded.emit();
    }
  }

}
