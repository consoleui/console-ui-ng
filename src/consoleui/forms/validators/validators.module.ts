import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenValidatorDirective } from './forbidden-validator.directive';
import { EqualValidatorDirective } from './equal-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ForbiddenValidatorDirective,
    EqualValidatorDirective
  ],
  exports: [
    ForbiddenValidatorDirective,
    EqualValidatorDirective
  ],
})
export class ValidatorsModule { }
