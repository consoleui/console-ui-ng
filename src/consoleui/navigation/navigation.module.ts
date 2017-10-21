import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { MenuSubComponent } from './menu/menu-sub/menu-sub.component';
import { MenuGroupComponent } from './menu/menu-group/menu-group.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MenuComponent, MenuItemComponent, MenuSubComponent, MenuGroupComponent],
  exports: [MenuComponent, MenuItemComponent, MenuSubComponent, MenuGroupComponent]
})
export class CuiNavigationModule { }
