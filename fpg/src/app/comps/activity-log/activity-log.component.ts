import { Component, OnInit } from '@angular/core';
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  
  public firebase:FireBase;
  private FireBaseDataREF:any = null;
  private hc:Highcharts=null;
  
  constructor(private fbps:FireBasePropertiesService) {
    let base = this;
    base.firebase = fbps.getInstanceOfFireBase();
    base.FireBaseDataREF = this.firebase.database().ref(this.fbps.getRefString(1)+'/log');

    base.FireBaseDataREF.once('value').then(function(snapShot){
      console.log(snapShot.val());

    });

   }

  ngOnInit() {
    //this.hc = window['Highcharts'];
  }

}
