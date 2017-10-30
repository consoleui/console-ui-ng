import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCropDemoComponent } from './image-crop-demo.component';

describe('ImageCropDemoComponent', () => {
  let component: ImageCropDemoComponent;
  let fixture: ComponentFixture<ImageCropDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCropDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCropDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
