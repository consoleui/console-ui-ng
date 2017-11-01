import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSubComponent } from './menu-sub.component';

describe('MenuSubComponent', () => {
  let component: MenuSubComponent;
  let fixture: ComponentFixture<MenuSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
