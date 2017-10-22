import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableSynthesizeDemoComponent } from './data-table-synthesize-demo.component';

describe('DataTableSynthesizeDemoComponent', () => {
  let component: DataTableSynthesizeDemoComponent;
  let fixture: ComponentFixture<DataTableSynthesizeDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableSynthesizeDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableSynthesizeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
