import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeInterceptSelectDemoComponent } from './tree-intercept-select-demo.component';

describe('TreeInterceptSelectDemoComponent', () => {
  let component: TreeInterceptSelectDemoComponent;
  let fixture: ComponentFixture<TreeInterceptSelectDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeInterceptSelectDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeInterceptSelectDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
