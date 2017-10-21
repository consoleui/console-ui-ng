import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavContainerComponent } from './sidenav-container/sidenav-container.component';
import { SidenavComponent } from './sidenav.component';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { CuiNavigationModule } from '../../navigation/navigation.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CuiNavigationModule,
  ],
  declarations: [SidenavContainerComponent, SidenavComponent, SidenavItemComponent],
  exports: [SidenavComponent]
})
export class SidenavModule { }
