import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedLayoutComponent } from './fixed-layout/fixed-layout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FixedLayoutComponent],
  exports: [FixedLayoutComponent]
})
export class LayoutModule { }
