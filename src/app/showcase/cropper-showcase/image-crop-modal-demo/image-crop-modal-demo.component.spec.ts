import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCropModalDemoComponent } from './image-crop-modal-demo.component';

describe('ImageCropModalDemoComponent', () => {
  let component: ImageCropModalDemoComponent;
  let fixture: ComponentFixture<ImageCropModalDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCropModalDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCropModalDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
