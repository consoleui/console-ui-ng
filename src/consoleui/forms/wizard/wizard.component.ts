import { Component, OnInit, Input, ContentChildren, TemplateRef, QueryList, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { WizardStepComponent } from './wizard-step/wizard-step.component';

@Component({
  selector: 'cui-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, AfterContentInit {
  @Input() direction: string = 'horizontal';  // horizontal | vertical

  @ContentChildren(WizardStepComponent) steps: QueryList<WizardStepComponent>;

  @Output() prevClick = new EventEmitter();
  @Output() nextClick = new EventEmitter();
  @Output() finishClick = new EventEmitter();
  @Output() cancelClick = new EventEmitter();

  // steps: any[];
  activeIndex: number;
  activeStep: WizardStepComponent;

  prevEnabled: boolean;
  nextEnabled: boolean;
  finishEnabled: boolean;
  cancelEnabled: boolean;

  constructor() { }

  ngOnInit() {
    if (!(this.activeIndex > 0)) {
      this.activeIndex = 0;
    }
  }

  ngAfterContentInit() {
    console.log('Wizard inited.');
    this.steps.forEach((it, i) => {
      if (!it.setpIndex) {
        it.setpIndex = i;
      }
    });

    this.refreshActive();
  }

  itemClick(event, item, i) {

  }

  prev() {
    if (this.prevEnabled) {
      this.activeIndex--;
    }

    this.refreshActive();
    this.prevClick.emit(this.activeIndex);
  }

  next() {
    if (this.nextEnabled && this.activeStep.valid) {
      this.activeIndex++;
    }

    this.refreshActive();
    this.nextClick.emit(this.activeIndex);
  }

  finish() {
    if (this.finishEnabled && this.activeStep.valid) {
      console.log("wizard finished");
      this.finishClick.emit();
    }
  }

  cancel() {
    if (this.cancelEnabled) {
      console.log("wizard canceled");
      this.cancelClick.emit();
    }
  }

  private refreshActive() {
    if (!(this.activeIndex > 0)) {
      this.activeIndex = 0;
    }

    this.steps.forEach((it, i) => {
      it.complete = i < this.activeIndex;
      it.active = it.setpIndex == this.activeIndex;
    });

    this.activeStep = this.steps.find(it => it.setpIndex == this.activeIndex);

    this.prevEnabled = this.activeIndex > 0;
    this.nextEnabled = this.activeIndex < this.steps.length - 1;
    this.finishEnabled = this.activeIndex == this.steps.length - 1;
    this.cancelEnabled = true;
  }

}
