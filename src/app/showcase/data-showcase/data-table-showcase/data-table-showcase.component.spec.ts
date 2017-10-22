import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableShowcaseComponent } from './data-table-showcase.component';

describe('DataTableShowcaseComponent', () => {
  let component: DataTableShowcaseComponent;
  let fixture: ComponentFixture<DataTableShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
