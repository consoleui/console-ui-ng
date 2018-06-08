import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeditorCustomDemoComponent } from './ckeditor-custom-demo.component';

describe('CkeditorCustomDemoComponent', () => {
  let component: CkeditorCustomDemoComponent;
  let fixture: ComponentFixture<CkeditorCustomDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CkeditorCustomDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CkeditorCustomDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
