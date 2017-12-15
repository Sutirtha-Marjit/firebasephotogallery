import { Component, OnInit, OnChanges, DoCheck, ElementRef, Renderer2, AfterViewInit, Input, Output, ViewChild} from '@angular/core';
import { DesignItem, DesignImageUploadPack, SingleLogRow } from '../../shared/Datatypes';
import { ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms'
import {FireBasePropertiesService} from '../../services/fire-base-properties.service';

@Component({
  selector: 'app-createdesign',
  templateUrl: './createdesign.component.html',
  styleUrls: ['./createdesign.component.css']
})
export class CreatedesignComponent implements OnInit, OnChanges , AfterViewInit, DoCheck {

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
  public colorPickerOpen = false;
  private FireBaseDataREF:any = null;
  private FireBaseDesignUpdateLogREF:any = null;
  
  
 
  public testColorPath = "assets/desert.jpg";
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
    base.FireBaseDesignUpdateLogREF = this.firebase.database().ref(this.fbps.getRefString(1)+'/log');
    

    this.fileReader = new FileReader();
    this.DesignType = ["Poster","Website","App","Brochure","Postcard,Flyer","Logo", "Infographic", "Banner", "Business card", "Card or Invitation", "Stationery", "Facebook Cover" ];   

    this.designItem = this.fbps.getABlankDesignItem();
    this.tempColorListString = this.designItem.colors.toString();
    this.fileReader.onload = function(e:any){      
      base.updateLocalImageSource(e.target.result);
    };
    
  }

  injectSelectedColors(selectedColorList:Array<string>){
    console.log(selectedColorList);
    if(this.designItem.colors===undefined){
      this.designItem.colors = [];
    }
    
    this.designItem.colors = this.designItem.colors.concat(selectedColorList);
    this.colorPickerOpen = false;
    this.tempColorListString = this.designItem.colors.join(',');
  }

  openColorPicker(){
    this.colorPickerOpen = true;
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
    
    let crlog:SingleLogRow = {desc:'',id:'',timestamp:(new Date()).getTime(),operation:''};

    if(this.UPDATE_MODE){
      var updates = {};
      this.designItem.date = ((new Date()).getTime())+'';
      updates[this.UPDATE_ID] = this.designItem; 
      this.FireBaseDataREF.update(updates);
      crlog.operation = 'UPDATE';
      crlog.id = this.UPDATE_ID;
      window.location.href = '#/table-view';
    }else{
        crlog.operation = 'CREATE';
        this.FireBaseDataREF.push(this.designItem).then(()=>{
        window.location.href = '#/table-view';
      })
    }
     
     this.FireBaseDesignUpdateLogREF.push(crlog).then(()=>{
       console.log('log data pushed');
     });
      
   
  }

  onDesignSelectionComplete(pack:DesignImageUploadPack){ 
    
    this.imageSelected = true;
    this.physicalImagePath = pack.uploadedMainImageSource
    this.modfPhysicalImagePath = this.physicalImagePath+'?update='+this.fbps.getCacheClearingRandomNumber();
    this.designItem.file = this.physicalImagePath;
    let crlog:SingleLogRow = {desc:'image uploaded at '+this.physicalImagePath,id:'',timestamp:(new Date()).getTime(),operation:'UPLOAD'};
    this.FireBaseDesignUpdateLogREF.push(crlog).then(()=>{
       console.log('log data pushed');
     }); 
  }

  ngOnChanges(){
      console.log('ngOnChanges');
      this.designItem = this.designItemToUpDate;
      if(this.designItemToUpDate.tags !== undefined){
        this.tempTagListString = this.designItemToUpDate.tags.join(',');
      }
      if(this.designItemToUpDate.colors !== undefined){
        this.tempColorListString = this.designItemToUpDate.colors.join(',');
      }
      
  }

  ngDoCheck(){
    // console.log('ngDoCheck');
  }

  ngAfterViewInit(){
    console.log('ngAfterViewInit');
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
