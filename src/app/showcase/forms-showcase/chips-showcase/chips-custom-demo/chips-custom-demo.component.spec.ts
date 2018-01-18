import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsCustomDemoComponent } from './chips-custom-demo.component';

describe('ChipsCustomDemoComponent', () => {
  let component: ChipsCustomDemoComponent;
  let fixture: ComponentFixture<ChipsCustomDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsCustomDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsCustomDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
