import { Component, OnInit,Input, Output} from '@angular/core';
import { DesignItem, DesignImageUploadPack } from '../../shared/Datatypes';
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
  private FireBaseDataREF:any = null;
 
  private fileReader:FileReader;
  private testDefaultImageSource = "https://cdn.slidesharecdn.com/ss_thumbnails/ebr-issue4-2015-developing-an-operator-iot-ecosystem-170216165602-thumbnail-4.jpg?cb=1487264267";

  constructor(private fbps:FireBasePropertiesService) { 
    var base = this;
    this.firebase = fbps.getInstanceOfFireBase();
    base.FireBaseDataREF = this.firebase.database().ref(this.fbps.getRefString(1)+'/data');
    /*base.FireBaseDataREF.on('value').then(function(snapshot){
      console.log(snapshot.val());
    });*/
    

    this.fileReader = new FileReader();
    this.DesignType = ["Poster","Webapp","App","Brochure","Flyer","Business Identity"];
    

    this.designItem = {
      heading:'Some heading',
      description:'Some description',
      notes:'',
      colors:['#990022','#005500'],
      type:'Poster',
      tags:[],
      date:new Date().getTime(),
      grade:1,
      file:''
    };

    this.tempColorListString = this.designItem.colors.toString();
    this.fileReader.onload = function(e:any){      
      base.updateLocalImageSource(e.target.result);
    };
    
  }

  updateLocalImageSource(source:any){
    this.imageSelectedLocal = true;
    this.localImageSource = source;
  }


  public processImageAndShow(){
     
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
    console.log(this.designItem);  
      
    this.FireBaseDataREF.push(this.designItem).then(function(){
      alert('Your Data Saved');
    })
  }

  onDesignSelectionComplete(pack:DesignImageUploadPack){
    this.imageSelected = true;
    this.physicalImagePath = pack.uploadedMainImageSource;
    this.designItem.file = this.physicalImagePath;
  }

  ngOnInit() {
    this.populateListOfColors();
    this.colorBoxContainer = document.querySelector('.color-box-container');
    
  }

}
