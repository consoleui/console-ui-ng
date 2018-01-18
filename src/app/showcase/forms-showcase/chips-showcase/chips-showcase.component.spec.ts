import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsShowcaseComponent } from './chips-showcase.component';

describe('ChipsShowcaseComponent', () => {
  let component: ChipsShowcaseComponent;
  let fixture: ComponentFixture<ChipsShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
