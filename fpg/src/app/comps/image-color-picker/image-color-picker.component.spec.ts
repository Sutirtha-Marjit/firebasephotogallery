import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageColorPickerComponent } from './image-color-picker.component';

describe('ImageColorPickerComponent', () => {
  let component: ImageColorPickerComponent;
  let fixture: ComponentFixture<ImageColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
