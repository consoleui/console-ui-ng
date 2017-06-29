import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavContainerComponent } from './sidenav-container/sidenav-container.component';
import { SidenavComponent } from './sidenav.component';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [SidenavContainerComponent, SidenavComponent, SidenavItemComponent],
  exports: [SidenavComponent]
})
export class SidenavModule { }
