import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import {FormControl} from '@angular/forms'
import { FormsModule } from '@angular/forms';
import { ImageColorPickerComponent } from '../image-color-picker/image-color-picker.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,RouterModule, Routes, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';

import { DesignUploadComponent } from './design-upload.component';

describe('DesignUploadComponent', () => {
  let component: DesignUploadComponent;
  let fixture: ComponentFixture<DesignUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignUploadComponent ],
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
    fixture = TestBed.createComponent(DesignUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
