import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeSingleSelectDemoComponent } from './tree-single-select-demo.component';

describe('TreeSingleSelectDemoComponent', () => {
  let component: TreeSingleSelectDemoComponent;
  let fixture: ComponentFixture<TreeSingleSelectDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeSingleSelectDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeSingleSelectDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
