import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CuiCoreModule } from '../core/core.module';
import { InputTextDirective } from './input-text/input-text.directive';
import { CuiTemplateModule } from '../core/template/template.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectComponent } from './select/select.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChipsComponent } from './chips/chips.component';
import { InputSwitchComponent } from './input-switch/input-switch.component';
import { TextareaDirective } from './textarea/textarea.directive';
import { ListboxComponent } from './listbox/listbox.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { PasswordDirective } from './password/password.directive';
import { RadioComponent } from './radio/radio.component';
import { TreeSelectComponent } from './tree-select/tree-select.component';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { WizardComponent } from './wizard/wizard.component';
import { WizardStepComponent } from './wizard/wizard-step/wizard-step.component';
import { ValidatorsModule } from './validators/validators.module';
import { CuiTreeModule } from '../data/tree/tree.module';

@NgModule({
  imports: [
    CommonModule,
    CuiTemplateModule,
    DynamicFormModule,
    ValidatorsModule,
    CuiCoreModule,
    CuiTreeModule
  ],
  declarations: [AutocompleteComponent, InputTextDirective, CheckboxComponent,
    SelectComponent, CalendarComponent, ChipsComponent, InputSwitchComponent, TextareaDirective,
    ListboxComponent, MultiSelectComponent, PasswordDirective, RadioComponent, TreeSelectComponent, WizardComponent, WizardStepComponent],
  exports: [AutocompleteComponent, InputTextDirective, CheckboxComponent,
    SelectComponent, CalendarComponent, ChipsComponent, InputSwitchComponent, TextareaDirective,
    ListboxComponent, MultiSelectComponent, PasswordDirective, RadioComponent, TreeSelectComponent,
    DynamicFormModule,
    ValidatorsModule,
    WizardComponent,
    WizardStepComponent]
})
export class CuiFormsModule { }
