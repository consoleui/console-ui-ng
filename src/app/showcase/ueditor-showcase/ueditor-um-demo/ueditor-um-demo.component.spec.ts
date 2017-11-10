import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UeditorUmDemoComponent } from './ueditor-um-demo.component';

describe('UeditorUmDemoComponent', () => {
  let component: UeditorUmDemoComponent;
  let fixture: ComponentFixture<UeditorUmDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UeditorUmDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UeditorUmDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
