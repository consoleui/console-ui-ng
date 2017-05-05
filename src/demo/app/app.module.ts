import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import { FooModule } from '../../lib/app/foo/foo.module';
import { ConsoleUIModule } from 'consoleui';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    ConsoleUIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
