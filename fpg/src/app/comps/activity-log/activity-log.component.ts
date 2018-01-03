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
  private dataRecords=[];
  public tray=[];
  public months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  constructor(private fbps:FireBasePropertiesService) {
    let base = this;
    base.firebase = fbps.getInstanceOfFireBase();
    base.FireBaseDataREF = this.firebase.database().ref(this.fbps.getRefString(1)+'/log');

    base.FireBaseDataREF.once('value').then(function(snapShot){
      base.dataRecast(snapShot.val());
    });

   }

   private dataRecast(rawData:any){
     
     for(var el in rawData){
       this.dataRecords.push(rawData[el]);
     }
     
     this.dataRecords.sort((a,b)=>{
       return b.timestamp-a.timestamp;
     });

     this.pushNext(10);
     //console.log(this.dataRecords);
   }

   public pushNext(n){
     var init = this.tray.length===0 ? 0 : this.tray.length;
     for(var i=init;i<init+n;i++){
       if(this.dataRecords[i]){
       this.tray.push(this.dataRecords[i]);
       }
     }

     console.log(this.tray);
     setTimeout(function(){
       window.scrollTo(0,1000000);
     },200);
   }

   private zeroManageNum(n){
     return n<10 ? '0'+n : ''+n; 
   }

   public getTimeText(stamp){
     var d = new Date(stamp);
     var hrs = d.getHours();
     var timeLevel = hrs > 12 ? 'PM' : 'AM';
     hrs = hrs > 12 ? hrs-12 : hrs; 
     return this.zeroManageNum(hrs)+" : "+this.zeroManageNum(d.getMinutes())+" : "+this.zeroManageNum(d.getSeconds())+" "+timeLevel;
   }


   public getDateText(stamp){
     var d = new Date(stamp);

     return this.zeroManageNum(d.getDate())+" "+this.months[d.getMonth()]+" "+d.getFullYear();
   }

  ngOnInit() {
    this.hc = window['Highcharts'];
    //console.log(this.hc);
  }

}
