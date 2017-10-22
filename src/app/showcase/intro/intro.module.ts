import { routedComponents, IntroRoutingModule } from './intro-routing.module';
import { SharedModule } from './../common/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    SharedModule,
    IntroRoutingModule
  ],
  declarations: [...routedComponents]
})
export class IntroModule { }
