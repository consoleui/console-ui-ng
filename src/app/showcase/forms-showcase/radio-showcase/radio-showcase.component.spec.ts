import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioShowcaseComponent } from './radio-showcase.component';

describe('RadioShowcaseComponent', () => {
  let component: RadioShowcaseComponent;
  let fixture: ComponentFixture<RadioShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
