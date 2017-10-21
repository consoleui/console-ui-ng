import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cui-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent implements OnInit {
  private _isFold = false;

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
}
