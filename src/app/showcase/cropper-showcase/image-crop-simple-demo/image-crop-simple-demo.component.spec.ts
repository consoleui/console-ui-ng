import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCropSimpleDemoComponent } from './image-crop-simple-demo.component';

describe('ImageCropSimpleDemoComponent', () => {
  let component: ImageCropSimpleDemoComponent;
  let fixture: ComponentFixture<ImageCropSimpleDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCropSimpleDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCropSimpleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
