import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperShowcaseComponent } from './cropper-showcase.component';

describe('CropperShowcaseComponent', () => {
  let component: CropperShowcaseComponent;
  let fixture: ComponentFixture<CropperShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropperShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropperShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
