import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './common/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpModule } from "@angular/http";

import { ShowcaseRoutingModule } from './showcase-routing.module';
import { ShowcaseComponent } from './showcase.component';
import { ConsoleuiModule } from 'consoleui';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    SharedModule,
    ShowcaseRoutingModule,
    ConsoleuiModule.forRoot()
  ],
  declarations: [ShowcaseComponent],
  bootstrap: [ShowcaseComponent]
})
export class ShowcaseModule { }
