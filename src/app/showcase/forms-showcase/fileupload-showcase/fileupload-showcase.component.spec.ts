import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploadShowcaseComponent } from './fileupload-showcase.component';

describe('FileuploadShowcaseComponent', () => {
  let component: FileuploadShowcaseComponent;
  let fixture: ComponentFixture<FileuploadShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuploadShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploadShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
