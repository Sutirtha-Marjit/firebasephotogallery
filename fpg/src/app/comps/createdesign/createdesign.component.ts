import { Component, OnInit,Input, Output} from '@angular/core';
import { DesignItem } from '../../shared/Datatypes';
import {FormControl} from '@angular/forms'
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';

@Component({
  selector: 'app-createdesign',
  templateUrl: './createdesign.component.html',
  styleUrls: ['./createdesign.component.css']
})
export class CreatedesignComponent implements OnInit {

  public designItem:DesignItem;
  public DesignType;
  public firebase:FireBase;
  public tempColorListString:string;
  public imageSelected:boolean = false;
  public imageSelectedLocal:boolean = false;
  public fileInput:HTMLInputElement=null;
  public colorBoxContainer:Element = null;
  public localImageSource:string = '';
  public physicalImagePath = null;
 
  private fileReader:FileReader;

  constructor(private fbps:FireBasePropertiesService) { 
    var base = this;
    this.fileReader = new FileReader();
    this.DesignType = ["Poster","Webapp","App","Brochure","Flyer","Business Identity"];
    this.firebase = fbps.getInstanceOfFireBase();

    this.designItem = {
      heading:'Some heading',
      description:'Some description',
      notes:'',
      colors:['#990022','#005500'],
      type:'Poster',
      tags:[],
      date:new Date(),
      grade:1,
      file:''
    };

    this.tempColorListString = this.designItem.colors.toString();
    this.fileReader.onload = function(e:any){
      base.imageSelectedLocal = true;
      base.localImageSource = e.target.result;
    };
    
  }

  public uploadImage(){
    var base = this;
      setTimeout(function(){
        base.imageSelected = true;
        base.physicalImagePath = "http://www.pangeacc.com/wp-content/uploads/2014/12/focus-1024x672.jpg";
        base.designItem.file = "http://www.pangeacc.com/wp-content/uploads/2014/12/focus-1024x672.jpg";
      },1000);
      
  }

  public cleanLocalImageSelection(){
    this.fileInput.value = "";
    this.localImageSource="";
    this.imageSelectedLocal = false;
  }

  public processImageAndShow(){
      this.fileInput = <HTMLInputElement>document.querySelector('input[type="file"]#file');
      if(this.fileInput.files[0]){
        this.fileReader.readAsDataURL(this.fileInput.files[0]);
      }
  }

  public populateListOfColors(){
      
      
      this.designItem.colors = this.tempColorListString.split(',');
      if(this.colorBoxContainer!==null){
        this.colorBoxContainer.innerHTML = "";
        for(var i=0;i<this.designItem.colors.length;i++){
            var colorBox = document.createElement('span');
            colorBox.className = "color-box";
            colorBox.style.backgroundColor = this.designItem.colors[i];
            this.colorBoxContainer.appendChild(colorBox);
        }
      }
  }

  public postToFireBase(){
    console.log(JSON.stringify(this.designItem));
    var ref = this.firebase.app().database().ref();
    console.log(ref);
  }

  ngOnInit() {
    this.populateListOfColors();
    this.colorBoxContainer = document.querySelector('.color-box-container');
    console.log(this.fileInput);
  }

}
