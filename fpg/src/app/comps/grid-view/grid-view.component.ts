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
      console.log(base.ListOfDesign);
           
    });

   }
  

  public getRowPackets(numOfCols:number):Array<any>{

    var set = 0,
    pack = [];

    for (var el in this.ListOfDesign) {
        
        
        if(pack[set]===undefined){
          pack[set] = [];
        }
        this.ListOfDesign[el].id = el;
        pack[set].push(this.ListOfDesign[el]);
        set === numOfCols - 1 ? (set = 0) : set++;
   }
    console.log(pack);
    return pack;
  }

  /*
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
   } */

  ngOnInit() {

  }

}
