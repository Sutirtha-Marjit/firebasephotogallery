import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router,RouterModule, Routes, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';
import { TableViewComponent } from './table-view.component';

describe('TableViewComponent', () => {
  let component: TableViewComponent;
  let fixture: ComponentFixture<TableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableViewComponent ],
      imports:[
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
    fixture = TestBed.createComponent(TableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
