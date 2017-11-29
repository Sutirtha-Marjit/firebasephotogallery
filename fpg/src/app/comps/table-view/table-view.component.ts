import { Component, OnInit } from '@angular/core';
import { DesignItem } from '../../shared/Datatypes';
import {FormControl} from '@angular/forms'
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
 
  constructor(private fbps:FireBasePropertiesService) {
    var base = this;
    this.firebase = fbps.getInstanceOfFireBase();
    base.FireBaseDataREF = this.firebase.database().ref(this.fbps.getRefString(1)+'/data');

    base.FireBaseDataREF.once('value').then(function(snapShot){
      base.ListOfDesign = snapShot.val();       
    });

   }

  ngOnInit() {
  }

}
