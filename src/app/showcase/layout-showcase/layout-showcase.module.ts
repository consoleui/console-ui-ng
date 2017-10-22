import { LayoutShowcaseRoutingModule } from './layout-showcase-routing.module';
import { SharedModule } from './../common/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutShowcaseComponent } from './layout-showcase.component';
import { LayoutBasicDemoComponent } from './layout-basic-demo/layout-basic-demo.component';

@NgModule({
  imports: [
    SharedModule,
    LayoutShowcaseRoutingModule
  ],
  declarations: [LayoutShowcaseComponent, LayoutBasicDemoComponent]
})
export class LayoutShowcaseModule { }
