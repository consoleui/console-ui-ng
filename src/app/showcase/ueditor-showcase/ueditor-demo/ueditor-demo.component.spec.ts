import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UeditorDemoComponent } from './ueditor-demo.component';

describe('UeditorDemoComponent', () => {
  let component: UeditorDemoComponent;
  let fixture: ComponentFixture<UeditorDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UeditorDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UeditorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
