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

  private idToRequest:string;
  public firebase:FireBase;
  private FireBaseDataREF:any = null;
  private ObjectOfDesign = {};
  private currentDesignItem:any;

  constructor(private route: ActivatedRoute,private fbps:FireBasePropertiesService) { 
    var base = this;
    base.firebase = fbps.getInstanceOfFireBase();
    base.FireBaseDataREF = this.firebase.database().ref(this.fbps.getRefString(1)+'/data');
    

  }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.idToRequest = params['id'];
      this.FireBaseDataREF.once('value').then((snapShot)=>{
      this.ObjectOfDesign = snapShot.val();
      console.log(this.ObjectOfDesign[this.idToRequest]);       
    });
      
      
    })
  }

}
