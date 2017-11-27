import { Component, OnInit } from '@angular/core';
import { DesignItem } from '../../shared/Datatypes';
import {FormControl} from '@angular/forms'

@Component({
  selector: 'app-createdesign',
  templateUrl: './createdesign.component.html',
  styleUrls: ['./createdesign.component.css']
})
export class CreatedesignComponent implements OnInit {

  public designItem:DesignItem;
  public DesignType;
  public test="test"; 
  
  constructor() { 
    this.DesignType = ["Poster","Webapp","App","Brochure","Flyer","Business Identity"];
    this.designItem = {
      heading:'Some heading',
      description:'Some description',
      notes:'',
      colors:['#990022','#ffffff'],
      type:'Poster',
      tags:[],
      date:new Date(),
      grade:1,
      file:''
    };
  }

  ngOnInit() {

  }

}
