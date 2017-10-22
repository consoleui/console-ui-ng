import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBasicDemoComponent } from './layout-basic-demo.component';

describe('LayoutBasicDemoComponent', () => {
  let component: LayoutBasicDemoComponent;
  let fixture: ComponentFixture<LayoutBasicDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutBasicDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutBasicDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
