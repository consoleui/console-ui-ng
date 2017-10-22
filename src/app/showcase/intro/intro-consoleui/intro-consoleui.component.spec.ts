import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroConsoleuiComponent } from './intro-consoleui.component';

describe('IntroConsoleuiComponent', () => {
  let component: IntroConsoleuiComponent;
  let fixture: ComponentFixture<IntroConsoleuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroConsoleuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroConsoleuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
