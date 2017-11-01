import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cui-menu-group, cui-menu-item-group, cui-menugroup, cui-menuitemgroup',
  templateUrl: './menu-group.component.html',
  styleUrls: ['./menu-group.component.scss']
})
export class MenuGroupComponent implements OnInit {
  @Input() title: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}
