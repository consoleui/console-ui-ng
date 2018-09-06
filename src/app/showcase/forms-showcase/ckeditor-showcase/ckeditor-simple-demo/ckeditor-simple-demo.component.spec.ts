import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeditorSimpleDemoComponent } from './ckeditor-simple-demo.component';

describe('CkeditorSimpleDemoComponent', () => {
  let component: CkeditorSimpleDemoComponent;
  let fixture: ComponentFixture<CkeditorSimpleDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CkeditorSimpleDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CkeditorSimpleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
