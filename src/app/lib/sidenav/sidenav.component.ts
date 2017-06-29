import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'cui-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  private _isOpen = true;
  private _isFold = false;

  @Input() navItems;
  @Input() color = 'light'; // 'light' / 'inverse'
  @Output() itemClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  get isFold() {
    return this._isFold;
  }

  get isOpen() {
    return this._isOpen;
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

  toggle() {
    this._isOpen = !this._isOpen;
  }

  open() {
    this._isOpen = true;
  }

  close() {
    this._isOpen = false;
  }

  onItemClick(item) {
    this.itemClick.emit(item);
  }
}
