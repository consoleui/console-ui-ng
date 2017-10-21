import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { CuiLayerComponent } from '../defs/layer-config';

@Component({
  // selector: 'cui-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent extends CuiLayerComponent implements OnInit, OnDestroy {
  alertText: string;

  private _ok: Subject<any> = new Subject();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._ok.complete();
  }

  onOk(): Observable<any> {
    return this._ok.asObservable();
  }

  ok(event) {
    this._ok.next(null);
  }

}
