import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeditorFullDemoComponent } from './ckeditor-full-demo.component';

describe('CkeditorFullDemoComponent', () => {
  let component: CkeditorFullDemoComponent;
  let fixture: ComponentFixture<CkeditorFullDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CkeditorFullDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CkeditorFullDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
