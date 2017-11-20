import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploadMultipleDemoComponent } from './fileupload-multiple-demo.component';

describe('FileuploadMultipleDemoComponent', () => {
  let component: FileuploadMultipleDemoComponent;
  let fixture: ComponentFixture<FileuploadMultipleDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadMultipleDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploadMultipleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
