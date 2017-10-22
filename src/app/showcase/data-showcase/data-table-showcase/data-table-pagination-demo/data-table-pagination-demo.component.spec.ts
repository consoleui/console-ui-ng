import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTablePaginationDemoComponent } from './data-table-pagination-demo.component';

describe('DataTablePaginationDemoComponent', () => {
  let component: DataTablePaginationDemoComponent;
  let fixture: ComponentFixture<DataTablePaginationDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTablePaginationDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTablePaginationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
