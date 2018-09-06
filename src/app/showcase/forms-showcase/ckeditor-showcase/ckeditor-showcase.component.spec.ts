import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeditorShowcaseComponent } from './ckeditor-showcase.component';

describe('CkeditorShowcaseComponent', () => {
  let component: CkeditorShowcaseComponent;
  let fixture: ComponentFixture<CkeditorShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CkeditorShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CkeditorShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
