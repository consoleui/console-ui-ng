import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgLazyLoadShowcaseComponent } from './img-lazy-load-showcase.component';

describe('ImgLazyLoadShowcaseComponent', () => {
  let component: ImgLazyLoadShowcaseComponent;
  let fixture: ComponentFixture<ImgLazyLoadShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgLazyLoadShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgLazyLoadShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
