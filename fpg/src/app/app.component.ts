import { Component , OnInit} from '@angular/core';
import { RouterModule, Routes, RouterOutlet } from '@angular/router';
import {FireBasePropertiesService} from './services/fire-base-properties.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  
  public fireBase:FireBase;
  public fireBaseConfig:FireBaseConfig;
  
  constructor(private fbps:FireBasePropertiesService){
    this.fireBaseConfig = fbps.getFireBaseConfig();
    this.fireBase = fbps.getInstanceOfFireBase();
    this.fireBase.initializeApp(this.fireBaseConfig);
  }

  onActivate(event:any){
    console.log(event);
  }

  ngOnInit() {

  }


}
