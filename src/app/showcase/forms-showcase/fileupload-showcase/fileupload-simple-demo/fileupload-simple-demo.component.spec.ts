import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploadSimpleDemoComponent } from './fileupload-simple-demo.component';

describe('FileuploadSimpleDemoComponent', () => {
  let component: FileuploadSimpleDemoComponent;
  let fixture: ComponentFixture<FileuploadSimpleDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadSimpleDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploadSimpleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
