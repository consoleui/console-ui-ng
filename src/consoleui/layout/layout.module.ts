import { LayoutSiderComponent } from './layout-sider.component';
import { LayoutComponent } from './layout.component';
import { LayoutHeaderComponent } from './layout-header.component';
import { LayoutFooterComponent } from './layout-footer.component';
import { LayoutContentComponent } from './layout-content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedLayoutComponent } from './fixed-layout/fixed-layout.component';

const LAYOUT_COMPONENTS = [
  LayoutContentComponent,
  LayoutFooterComponent,
  LayoutHeaderComponent,
  LayoutComponent,
  LayoutSiderComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FixedLayoutComponent, ...LAYOUT_COMPONENTS],
  exports: [FixedLayoutComponent, ...LAYOUT_COMPONENTS]
})
export class LayoutModule { }
