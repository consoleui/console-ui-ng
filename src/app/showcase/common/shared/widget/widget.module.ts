import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBoxComponent } from './code-box/code-box.component';
import { HighlightComponent } from './highlight/highlight.component';
import { MarkdownComponent } from './markdown/markdown.component';
import { AsciidocComponent } from './asciidoc/asciidoc.component';

const WIDGETS = [
  CodeBoxComponent,
  HighlightComponent,
  MarkdownComponent,
  AsciidocComponent
];

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  declarations: [...WIDGETS],
  exports: [...WIDGETS]
})
export class WidgetModule { }
