import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CuiCoreModule } from '../core/core.module';
import { CuiTemplateModule } from '../core/template/template.module';
import { SelectComponent } from './select/select.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChipsComponent } from './chips/chips.component';
import { InputSwitchComponent } from './input-switch/input-switch.component';
import { RadioComponent } from './radio/radio.component';
import { TreeSelectComponent } from './tree-select/tree-select.component';
import { WizardComponent } from './wizard/wizard.component';
import { WizardStepComponent } from './wizard/wizard-step/wizard-step.component';
import { ValidatorsModule } from './validators/validators.module';
import { CuiTreeModule } from '../data/tree/tree.module';
import { CuiCKEditorModule } from './ckeditor/ckeditor.module';

@NgModule({
  imports: [
    CommonModule,
    CuiTemplateModule,
    ValidatorsModule,
    CuiCoreModule,
    CuiTreeModule,
    CuiCKEditorModule,
  ],
  declarations: [
    SelectComponent, CalendarComponent, ChipsComponent, InputSwitchComponent,
    RadioComponent, TreeSelectComponent, WizardComponent, WizardStepComponent],
  exports: [
    SelectComponent, CalendarComponent, ChipsComponent, InputSwitchComponent,
    RadioComponent, TreeSelectComponent,
    ValidatorsModule,
    WizardComponent,
    WizardStepComponent,
    CuiCKEditorModule,
  ]
})
export class CuiFormsModule { }
