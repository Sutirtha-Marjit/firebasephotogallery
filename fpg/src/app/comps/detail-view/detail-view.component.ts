import { Component, OnInit } from '@angular/core';
import { DesignItem } from '../../shared/Datatypes';
import { ActivatedRoute } from '@angular/router';
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {

  private idToRequest:string='';
  public firebase:FireBase;
  private FireBaseDataREF:any = null;
  private ObjectOfDesign = {};
  public currentDesignItem:DesignItem=null;
  public teststr='OK';
  
  constructor(private route: ActivatedRoute,private fbps:FireBasePropertiesService) { 
    var base = this;
    base.currentDesignItem = this.fbps.getABlankDesignItem();
    base.firebase = fbps.getInstanceOfFireBase();
    base.FireBaseDataREF = this.firebase.database().ref(this.fbps.getRefString(1)+'/data');
    

  }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.idToRequest = params['id'];
      this.FireBaseDataREF.once('value').then((snapShot)=>{
      this.ObjectOfDesign = snapShot.val();
      //console.log(this.ObjectOfDesign[this.idToRequest]); 
      this.currentDesignItem = this.ObjectOfDesign[this.idToRequest];
      console.log('DESIGN ITEM:');
      console.log(this.currentDesignItem);
      this.teststr = 'GREAT';
    });
      
      
    })
  }

}
