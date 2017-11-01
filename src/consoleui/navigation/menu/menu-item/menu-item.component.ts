import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cui-menu-item, cui-menuitem',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}
