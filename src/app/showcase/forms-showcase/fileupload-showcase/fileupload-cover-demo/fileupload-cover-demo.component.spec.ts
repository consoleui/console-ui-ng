import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploadCoverDemoComponent } from './fileupload-cover-demo.component';

describe('FileuploadCoverDemoComponent', () => {
  let component: FileuploadCoverDemoComponent;
  let fixture: ComponentFixture<FileuploadCoverDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadCoverDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploadCoverDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
