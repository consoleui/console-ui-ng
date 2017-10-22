import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableSelectionDemoComponent } from './data-table-selection-demo.component';

describe('DataTableSelectionDemoComponent', () => {
  let component: DataTableSelectionDemoComponent;
  let fixture: ComponentFixture<DataTableSelectionDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableSelectionDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableSelectionDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
