import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { CuiLayerComponent } from '../defs/layer-config';

@Component({
  // selector: 'cui-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent extends CuiLayerComponent implements OnInit, OnDestroy {
  confirmText: string;

  // @Output() _ok = new EventEmitter();
  // @Output() _cancel = new EventEmitter();

  private _ok: Subject<any> = new Subject();
  private _cancel: Subject<any> = new Subject();


  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._ok.complete();
    this._cancel.complete();
  }

  onOk(): Observable<any> {
    return this._ok.asObservable();
  }

  onCancel(): Observable<any> {
    return this._cancel.asObservable();
  }

  ok(event) {
    // console.log('ok');
    // this._ok.emit(event);
    this._ok.next(null);
  }

  cancel(event) {
    // console.log('cancel');
    // this._cancel.emit(event);
    this._cancel.next(null);
  }
}
