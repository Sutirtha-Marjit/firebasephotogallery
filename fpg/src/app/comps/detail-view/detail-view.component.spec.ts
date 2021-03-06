import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import {FormControl} from '@angular/forms'
import { FormsModule } from '@angular/forms';
import { Router,RouterModule, Routes, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DetailViewComponent } from './detail-view.component';
import { CreatedesignComponent } from '../createdesign/createdesign.component';
import { ImageColorPickerComponent } from '../image-color-picker/image-color-picker.component';
import { DesignUploadComponent } from '../design-upload/design-upload.component';

describe('DetailViewComponent', () => {
  let component: DetailViewComponent;
  let fixture: ComponentFixture<DetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailViewComponent,ImageColorPickerComponent, CreatedesignComponent, DesignUploadComponent ],
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
    fixture = TestBed.createComponent(DetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
