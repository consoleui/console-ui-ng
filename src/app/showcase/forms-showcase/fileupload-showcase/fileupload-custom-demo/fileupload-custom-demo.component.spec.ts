import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploadCustomDemoComponent } from './fileupload-custom-demo.component';

describe('FileuploadCustomDemoComponent', () => {
  let component: FileuploadCustomDemoComponent;
  let fixture: ComponentFixture<FileuploadCustomDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadCustomDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploadCustomDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
