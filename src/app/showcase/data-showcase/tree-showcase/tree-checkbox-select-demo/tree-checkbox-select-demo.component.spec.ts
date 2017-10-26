import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCheckboxSelectDemoComponent } from './tree-checkbox-select-demo.component';

describe('TreeCheckboxSelectDemoComponent', () => {
  let component: TreeCheckboxSelectDemoComponent;
  let fixture: ComponentFixture<TreeCheckboxSelectDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeCheckboxSelectDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeCheckboxSelectDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
