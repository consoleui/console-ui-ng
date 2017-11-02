import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UeditorShowcaseComponent } from './ueditor-showcase.component';

describe('UeditorShowcaseComponent', () => {
  let component: UeditorShowcaseComponent;
  let fixture: ComponentFixture<UeditorShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UeditorShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UeditorShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
