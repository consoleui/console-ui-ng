import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeDynamicNodeDemoComponent } from './tree-dynamic-node-demo.component';

describe('TreeDynamicNodeDemoComponent', () => {
  let component: TreeDynamicNodeDemoComponent;
  let fixture: ComponentFixture<TreeDynamicNodeDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeDynamicNodeDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeDynamicNodeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
