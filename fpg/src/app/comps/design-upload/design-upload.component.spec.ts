import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignUploadComponent } from './design-upload.component';

describe('DesignUploadComponent', () => {
  let component: DesignUploadComponent;
  let fixture: ComponentFixture<DesignUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignUploadComponent ]
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
