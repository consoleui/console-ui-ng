import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Message } from './../message';

@Component({
  selector: 'cui-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() value: Message[];
  @Input() closable: boolean = true;

  @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();

  severityIconMap = {
    'primary': null,
    'secondary': null,
    'success': 'fa-check',
    'danger': 'fa-close',
    'warning': 'fa-warning',
    'info': 'fa-info-circle',
    'light': null,
    'dark': null,
  };

  constructor() { }

  ngOnInit() {
  }

  hasMessages() {
    return this.value && this.value.length > 0 ;
  }

  getSeverityClass() {
    if (this.hasMessages()) {
      return this.value[0].severity;
    }
  }

  getMessageCount() {
    if (this.hasMessages ) {
      return this.value.length;
    } else {
      return 0;
    }
  }

  getIconSize () {
    return this.getMessageCount() > 2 ? 'fa-2x' : 'fa-lg';
  }

  clear(event: Event) {
    this.value = [];
    this.valueChange.emit(this.value);

    event.preventDefault();
  }

  get icon(): string {
    let icon: string = null;
    if (this.hasMessages()) {
      let msg = this.value[0];
      icon = this.severityIconMap[msg.severity] || 'fa-info-circle';
    }
    return icon;
  }
}
