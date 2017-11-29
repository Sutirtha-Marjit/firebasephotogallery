import { Component, OnInit } from '@angular/core';
import { DesignItem } from '../../shared/Datatypes';
import { Location } from '@angular/common';
import {FormControl} from '@angular/forms'
import { Router  } from '@angular/router';
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  public firebase:FireBase;
  public ListOfDesign:Array<any>=[];
  private FireBaseDataREF:any = null;
  private router;
 
  constructor(private fbps:FireBasePropertiesService,_router:Router,_location:Location) {
    var base = this;
    base.router = _router;
    base.firebase = fbps.getInstanceOfFireBase();
    base.FireBaseDataREF = this.firebase.database().ref(this.fbps.getRefString(1)+'/data');
    
    base.FireBaseDataREF.once('value').then(function(snapShot){
      base.ListOfDesign = snapShot.val();
             
    });

    

   }

   openDetailPage(id){
    this.router.navigate(['/detail-view/'+id]); 
   }

   public getRowPackets():Array<any>{
      var pack=[];

      for(var el in this.ListOfDesign){
        this.ListOfDesign[el].id = el;
        if(this.ListOfDesign[el].date){
          this.ListOfDesign[el].date = new Date(this.ListOfDesign[el].date);
        }
        
        pack.push(this.ListOfDesign[el]);
      }

      return pack;
   }

  ngOnInit() {
  }

}
