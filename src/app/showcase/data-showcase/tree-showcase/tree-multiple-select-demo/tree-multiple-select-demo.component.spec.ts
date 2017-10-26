import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeMultipleSelectDemoComponent } from './tree-multiple-select-demo.component';

describe('TreeMultipleSelectDemoComponent', () => {
  let component: TreeMultipleSelectDemoComponent;
  let fixture: ComponentFixture<TreeMultipleSelectDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeMultipleSelectDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeMultipleSelectDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
