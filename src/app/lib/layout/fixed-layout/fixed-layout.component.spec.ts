import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedLayoutComponent } from './fixed-layout.component';

describe('FixedLayoutComponent', () => {
  let component: FixedLayoutComponent;
  let fixture: ComponentFixture<FixedLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
