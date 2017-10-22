import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableSimpleDemoComponent } from './data-table-simple-demo.component';

describe('DataTableSimpleDemoComponent', () => {
  let component: DataTableSimpleDemoComponent;
  let fixture: ComponentFixture<DataTableSimpleDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableSimpleDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableSimpleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
