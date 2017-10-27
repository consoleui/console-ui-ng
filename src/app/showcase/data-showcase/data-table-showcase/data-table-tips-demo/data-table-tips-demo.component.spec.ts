import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableTipsDemoComponent } from './data-table-tips-demo.component';

describe('DataTableTipsDemoComponent', () => {
  let component: DataTableTipsDemoComponent;
  let fixture: ComponentFixture<DataTableTipsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableTipsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableTipsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
