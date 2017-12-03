import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageCleanUpComponent } from './garbage-clean-up.component';

describe('GarbageCleanUpComponent', () => {
  let component: GarbageCleanUpComponent;
  let fixture: ComponentFixture<GarbageCleanUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarbageCleanUpComponent ]
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
