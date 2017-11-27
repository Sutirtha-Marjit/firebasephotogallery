import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedesignComponent } from './createdesign.component';

describe('CreatedesignComponent', () => {
  let component: CreatedesignComponent;
  let fixture: ComponentFixture<CreatedesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedesignComponent ]
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
