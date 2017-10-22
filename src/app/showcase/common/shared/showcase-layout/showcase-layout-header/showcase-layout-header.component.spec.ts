import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseLayoutHeaderComponent } from './showcase-layout-header.component';

describe('ShowcaseLayoutHeaderComponent', () => {
  let component: ShowcaseLayoutHeaderComponent;
  let fixture: ComponentFixture<ShowcaseLayoutHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcaseLayoutHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseLayoutHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
