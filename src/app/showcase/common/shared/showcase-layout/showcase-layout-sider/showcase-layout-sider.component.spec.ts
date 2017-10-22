import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseLayoutSiderComponent } from './showcase-layout-sider.component';

describe('ShowcaseLayoutSiderComponent', () => {
  let component: ShowcaseLayoutSiderComponent;
  let fixture: ComponentFixture<ShowcaseLayoutSiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcaseLayoutSiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseLayoutSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
