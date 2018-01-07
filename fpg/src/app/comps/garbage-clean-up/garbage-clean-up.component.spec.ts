import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import {FormControl} from '@angular/forms'
import { FormsModule } from '@angular/forms';
import { Router,RouterModule, Routes, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CreatedesignComponent } from '../createdesign/createdesign.component';
import { ImageColorPickerComponent } from '../image-color-picker/image-color-picker.component';
import { DesignUploadComponent } from '../design-upload/design-upload.component';
import { GarbageCleanUpComponent } from './garbage-clean-up.component';

describe('GarbageCleanUpComponent', () => {
  let component: GarbageCleanUpComponent;
  let fixture: ComponentFixture<GarbageCleanUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarbageCleanUpComponent ],
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
    fixture = TestBed.createComponent(GarbageCleanUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
