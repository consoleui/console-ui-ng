import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsShowcaseComponent } from './chips-showcase.component';
import { SharedModule } from '../../common/shared/shared.module';
import { ChipsSimpleDemoComponent } from './chips-simple-demo/chips-simple-demo.component';
import { ChipsCustomDemoComponent } from './chips-custom-demo/chips-custom-demo.component';

const routes: Routes = [
  { path: '', component: ChipsShowcaseComponent}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ChipsShowcaseComponent, ChipsSimpleDemoComponent, ChipsCustomDemoComponent]
})
export class ChipsShowcaseModule { }
