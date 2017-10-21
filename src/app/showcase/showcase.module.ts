import { ConsoleuiModule } from 'consoleui';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ShowcaseRoutingModule } from './showcase-routing.module';
import { ShowcaseComponent } from './showcase.component';

@NgModule({
  imports: [
    BrowserModule,
    ShowcaseRoutingModule,

    ConsoleuiModule
  ],
  declarations: [ShowcaseComponent],
  bootstrap: [ShowcaseComponent]
})
export class ShowcaseModule { }
