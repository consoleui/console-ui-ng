import { Message } from './../message';
import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef, AfterViewInit,
   Input, Output, EventEmitter, EmbeddedViewRef } from '@angular/core';

@Component({
  selector: 'cui-growl',
  templateUrl: './growl.component.html',
  styleUrls: ['./growl.component.scss']
})
export class GrowlComponent implements OnInit, AfterViewInit {

  // @Input() value: Message[];
  @Input() closable: boolean = true;

  @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();


  @ViewChild("growlContainer", { read: ViewContainerRef }) growlContainer: ViewContainerRef;
  @ViewChild("growlItemTemplate", { read: TemplateRef }) growlItemTemplate: TemplateRef<any>;

  _value: Message[];

  preventRerender: boolean;

  @Input() set value(val: Message[]) {
    this._value = val;
    if (this.growlContainer) {
      this.handleValueChange();
    }
  }

  get value(): Message[] {
    return this._value;
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() { }

  handleValueChange() {
    if (this.preventRerender) {
      this.preventRerender = false;
      return;
    }

    if (this.value && this.value.length > 0) {
      this.value.forEach(val => {
        this.add(val);
      });
    }
  }

  add(msg: Message) {
    let em: EmbeddedViewRef<any> = this.growlContainer.createEmbeddedView(this.growlItemTemplate, { $implicit: msg });
    setTimeout(() => {
      em.destroy();
    }, 3000);
  }
}
