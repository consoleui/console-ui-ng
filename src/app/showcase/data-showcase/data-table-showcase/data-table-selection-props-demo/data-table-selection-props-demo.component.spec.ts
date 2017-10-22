import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableSelectionPropsDemoComponent } from './data-table-selection-props-demo.component';

describe('DataTableSelectionPropsDemoComponent', () => {
  let component: DataTableSelectionPropsDemoComponent;
  let fixture: ComponentFixture<DataTableSelectionPropsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableSelectionPropsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableSelectionPropsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
