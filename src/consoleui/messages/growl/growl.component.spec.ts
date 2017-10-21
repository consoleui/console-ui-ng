import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowlComponent } from './growl.component';

describe('GrowlComponent', () => {
  let component: GrowlComponent;
  let fixture: ComponentFixture<GrowlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
