import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import {FormControl} from '@angular/forms'
import { FormsModule } from '@angular/forms';
import { CreatedesignComponent } from './createdesign.component';
import { ImageColorPickerComponent } from '../image-color-picker/image-color-picker.component';
import { DesignUploadComponent } from '../design-upload/design-upload.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,RouterModule, Routes, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';

describe('CreatedesignComponent', () => {
  let component: CreatedesignComponent;
  let fixture: ComponentFixture<CreatedesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedesignComponent, ImageColorPickerComponent, DesignUploadComponent ],
      imports:[
        BrowserModule,
        FormsModule,
        RouterTestingModule,
        RouterModule,
        HttpClientModule
      ],
      providers:[
        FireBasePropertiesService,
        HttpClient
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
