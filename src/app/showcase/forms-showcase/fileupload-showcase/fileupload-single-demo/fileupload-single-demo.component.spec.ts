import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploadSingleDemoComponent } from './fileupload-single-demo.component';

describe('FileuploadSingleDemoComponent', () => {
  let component: FileuploadSingleDemoComponent;
  let fixture: ComponentFixture<FileuploadSingleDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadSingleDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploadSingleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
