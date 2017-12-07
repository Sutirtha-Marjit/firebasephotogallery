import { Component, OnInit, OnChanges, ElementRef, Renderer2, AfterViewInit, Input, Output, ViewChild} from '@angular/core';
import { DesignItem, DesignImageUploadPack } from '../../shared/Datatypes';
import { ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms'
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';

@Component({
  selector: 'app-createdesign',
  templateUrl: './createdesign.component.html',
  styleUrls: ['./createdesign.component.css']
})
export class CreatedesignComponent implements OnInit, OnChanges , AfterViewInit {

  public designItem:DesignItem;
  public DesignType;
  public firebase:FireBase;
  public tempColorListString:string;
  public tempTagListString:string;
  public imageSelected:boolean = false;
  public imageSelectedLocal:boolean = false;
  public fileInput:HTMLInputElement=null;
  public colorBoxContainer:Element = null;
  public localImageSource:string = '';
  public physicalImagePath = null;
  public modfPhysicalImagePath=""
  private FireBaseDataREF:any = null;
  
  
 

  private fileReader:FileReader;
  private testDefaultImageSource = "https://cdn.slidesharecdn.com/ss_thumbnails/ebr-issue4-2015-developing-an-operator-iot-ecosystem-170216165602-thumbnail-4.jpg?cb=1487264267";

  
  @Input()designItemToUpDate:DesignItem;
  @Input()UPDATE_MODE:boolean;
  @Input()UPDATE_ID:string;
  @ViewChild('colorBoxContainer') el:ElementRef;


  constructor(private fbps:FireBasePropertiesService, private route: ActivatedRoute,private rd:Renderer2) { 
    var base = this;
    this.firebase = fbps.getInstanceOfFireBase();
    base.FireBaseDataREF = this.firebase.database().ref(this.fbps.getRefString(1)+'/data');
    /*base.FireBaseDataREF.on('value').then(function(snapshot){
      console.log(snapshot.val());
    });*/
    
    

    this.fileReader = new FileReader();
    this.DesignType = ["Poster","Website","App","Brochure","Postcard,Flyer","Logo", "Infographic", "Banner", "Business card", "Card or Invitation", "Stationery", "Facebook Cover" ];
    

    this.designItem = this.fbps.getABlankDesignItem();

    this.tempColorListString = this.designItem.colors.toString();
    this.fileReader.onload = function(e:any){      
      base.updateLocalImageSource(e.target.result);
    };
    
  }

  updateListOfTags(){
    this.designItem.tags=[];
    var tmplist = this.tempTagListString.split(',');
    tmplist.forEach((p)=>{
      
      if(p.charAt(0)!=='#'){
        p = '#'+p;
      }
     
      this.designItem.tags.push(p);
    })

    this.tempTagListString = this.designItem.tags.join(',');
    
  }


  public populateListOfColors(){
     this.designItem.colors = [];
     var isTrueColor,tmplist = this.tempColorListString.split(',');

     tmplist.forEach((p)=>{
       p = p.trim();
       if(p.charAt(0)!=='#'){ p = '#'+p; }

       isTrueColor  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(p);
       if(isTrueColor){
         this.designItem.colors.push(p);
       }
     });

     this.tempColorListString = this.designItem.colors.join(',');
     this.fillColorBoxes();
     
  }

  fillColorBoxes(){

      
      console.log("fillColorBoxes");
      console.log(this.colorBoxContainer);
      if(this.colorBoxContainer!=null){
          this.colorBoxContainer.innerHTML="";
          this.designItem.colors.forEach((crBGcolor)=>{
          var colorbox = document.createElement('span');
          colorbox.className = "color-box";
          colorbox.style.backgroundColor = crBGcolor;
          this.colorBoxContainer.appendChild(colorbox);
        });
      }
      
      
  }

  updateLocalImageSource(source:any){
    this.imageSelectedLocal = true;
    this.localImageSource = source;
  }

  public postToFireBase(){
    if(this.UPDATE_MODE){
      console.log('ready for UPDATE');
      console.log(this.designItem); 
      var updates = {};
      updates[this.UPDATE_ID] = this.designItem; 
      this.FireBaseDataREF.update(updates);
      window.location.href = '#/table-view';
    }else{
      console.log('ready for NEW POST');
      console.log(this.designItem);
      
        this.FireBaseDataREF.push(this.designItem).then(()=>{
        window.location.href = '#/table-view';
      })
    }
     
      
   
  }

  onDesignSelectionComplete(pack:DesignImageUploadPack){
    this.imageSelected = true;
    this.physicalImagePath = pack.uploadedMainImageSource
    this.modfPhysicalImagePath = this.physicalImagePath+'?update='+this.fbps.getCacheClearingRandomNumber();
    this.designItem.file = this.physicalImagePath;
  }

  ngOnChanges(){
      console.log('CREATE WINDOW');
      console.log(this.UPDATE_MODE);
      console.log(this.designItemToUpDate);
      this.designItem = this.designItemToUpDate;
      if(this.designItemToUpDate.tags !== undefined){
        this.tempTagListString = this.designItemToUpDate.tags.join(',');
      }
      if(this.designItemToUpDate.colors !== undefined){
        this.tempColorListString = this.designItemToUpDate.colors.join(',');
      }
      
  }

  ngAfterViewInit(){
    //console.log('ngAfterViewInit');
    //console.log(this.rd);
    if(this.el){
      this.colorBoxContainer = this.el.nativeElement;
    }
    
  }

  ngOnInit() {    
    this.populateListOfColors();
    
    //this.colorBoxContainer = document.querySelector('.color-box-container');
    
  }

}
