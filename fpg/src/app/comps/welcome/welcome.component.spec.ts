import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Welcome imagepath should not be empty',()=>{
      let ex = expect(component.baseImagePath);
      let vol = ex.toBeDefined();
      console.log('DONE DONE DONE DONE');
  });

  it('Welcome imagepath should be image',()=>{
      
      expect(component.baseImagePath).toContain('.jpg');
  });

});
