import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsciidocComponent } from './asciidoc.component';

describe('AsciidocComponent', () => {
  let component: AsciidocComponent;
  let fixture: ComponentFixture<AsciidocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsciidocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsciidocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
