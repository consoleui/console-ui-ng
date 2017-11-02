import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UeditorCustomDemoComponent } from './ueditor-custom-demo.component';

describe('UeditorCustomDemoComponent', () => {
  let component: UeditorCustomDemoComponent;
  let fixture: ComponentFixture<UeditorCustomDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UeditorCustomDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UeditorCustomDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
