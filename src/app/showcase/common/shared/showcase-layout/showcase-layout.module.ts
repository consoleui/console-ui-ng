import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ConsoleuiModule } from 'consoleui';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseLayoutMainComponent } from './showcase-layout-main/showcase-layout-main.component';
import { ShowcaseLayoutHeaderComponent } from './showcase-layout-header/showcase-layout-header.component';
import { ShowcaseLayoutFooterComponent } from './showcase-layout-footer/showcase-layout-footer.component';
import { ShowcaseLayoutSiderComponent } from './showcase-layout-sider/showcase-layout-sider.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConsoleuiModule,
    NgZorroAntdModule,
  ],
  declarations: [ShowcaseLayoutMainComponent, ShowcaseLayoutHeaderComponent, ShowcaseLayoutFooterComponent, ShowcaseLayoutSiderComponent],
  exports: [ShowcaseLayoutMainComponent]
})
export class ShowcaseLayoutModule { }
