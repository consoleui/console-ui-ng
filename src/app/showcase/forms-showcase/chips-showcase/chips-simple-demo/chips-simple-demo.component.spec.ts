import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsSimpleDemoComponent } from './chips-simple-demo.component';

describe('ChipsSimpleDemoComponent', () => {
  let component: ChipsSimpleDemoComponent;
  let fixture: ComponentFixture<ChipsSimpleDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsSimpleDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsSimpleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
