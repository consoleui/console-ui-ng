import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableExpandedDemoComponent } from './data-table-expanded-demo.component';

describe('DataTableExpandedDemoComponent', () => {
  let component: DataTableExpandedDemoComponent;
  let fixture: ComponentFixture<DataTableExpandedDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableExpandedDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableExpandedDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
