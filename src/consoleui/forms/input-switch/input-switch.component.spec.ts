import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSwitchComponent } from './input-switch.component';

describe('InputSwitchComponent', () => {
  let component: InputSwitchComponent;
  let fixture: ComponentFixture<InputSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
