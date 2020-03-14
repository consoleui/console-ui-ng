import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgLazyLoadShowcaseRoutingModule } from './img-lazy-load-showcase-routing.module';
import { ImgLazyLoadShowcaseComponent } from './img-lazy-load-showcase/img-lazy-load-showcase.component';
import { SharedModule } from '../common/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ImgLazyLoadShowcaseRoutingModule
  ],
  declarations: [ImgLazyLoadShowcaseComponent]
})
export class ImgLazyLoadShowcaseModule { }
