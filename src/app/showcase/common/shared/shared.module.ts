import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from './widget/widget.module';
import { ConsoleuiModule } from 'consoleui';
import { ShowcaseLayoutModule } from './showcase-layout/showcase-layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    ConsoleuiModule,
    ShowcaseLayoutModule,
    WidgetModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    ConsoleuiModule,
    ShowcaseLayoutModule,
    WidgetModule
  ]
})
export class SharedModule { }
