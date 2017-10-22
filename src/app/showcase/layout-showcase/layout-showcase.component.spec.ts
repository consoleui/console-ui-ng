import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutShowcaseComponent } from './layout-showcase.component';

describe('LayoutShowcaseComponent', () => {
  let component: LayoutShowcaseComponent;
  let fixture: ComponentFixture<LayoutShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
