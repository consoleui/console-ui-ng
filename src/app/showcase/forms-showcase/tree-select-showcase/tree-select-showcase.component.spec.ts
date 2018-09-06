import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeSelectShowcaseComponent } from './tree-select-showcase.component';

describe('TreeSelectShowcaseComponent', () => {
  let component: TreeSelectShowcaseComponent;
  let fixture: ComponentFixture<TreeSelectShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeSelectShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeSelectShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
