import { Component, OnInit } from '@angular/core';
import { DesignItem } from '../../shared/Datatypes';
import {FormControl} from '@angular/forms'
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit {

 
  public firebase:FireBase;
  public ListOfDesign:Array<any>=[];
  private FireBaseDataREF:any = null;
 
  constructor(private fbps:FireBasePropertiesService) {
    var base = this;
    this.firebase = fbps.getInstanceOfFireBase();
    base.FireBaseDataREF = this.firebase.database().ref(this.fbps.getRefString(1)+'/data');

    base.FireBaseDataREF.once('value').then(function(snapShot){
      base.ListOfDesign = snapShot.val();       
    });

   }

   public getRowPackets():Array<any>{
     var tempContainer=null,i=0;
     var pack=[];
     
     
      for(var el in this.ListOfDesign){ 
       if(i%3===0){
         if(tempContainer!==null){
           pack.push(tempContainer);
         }
         tempContainer = [];
       }
       this.ListOfDesign[el].id = el;
       tempContainer.push(this.ListOfDesign[el]);
       i++;
     }
    
    return pack;
   }

  ngOnInit() {

  }

}
