import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableSortDemoComponent } from './data-table-sort-demo.component';

describe('DataTableSortDemoComponent', () => {
  let component: DataTableSortDemoComponent;
  let fixture: ComponentFixture<DataTableSortDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableSortDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableSortDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
