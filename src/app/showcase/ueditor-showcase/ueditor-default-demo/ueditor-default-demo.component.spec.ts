import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UeditorDefaultDemoComponent } from './ueditor-default-demo.component';

describe('UeditorDefaultDemoComponent', () => {
  let component: UeditorDefaultDemoComponent;
  let fixture: ComponentFixture<UeditorDefaultDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UeditorDefaultDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UeditorDefaultDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
