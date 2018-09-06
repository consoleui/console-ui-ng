import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioShowcaseComponent } from './radio-showcase.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../common/shared/shared.module';

const routes: Routes = [
  { path: '', component: RadioShowcaseComponent}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [RadioShowcaseComponent]
})
export class RadioShowcaseModule { }
