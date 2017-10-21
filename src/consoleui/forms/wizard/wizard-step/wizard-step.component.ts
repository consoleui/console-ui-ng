import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cui-wizard-step',
  templateUrl: './wizard-step.component.html',
  styleUrls: ['./wizard-step.component.scss']
})
export class WizardStepComponent implements OnInit {
  @Input() label: string;
  @Input() active: boolean;
  @Input() complete: boolean;
  @Input() setpIndex: number;
  @Input() valid: boolean;

  constructor() { }

  ngOnInit() {
  }

}
